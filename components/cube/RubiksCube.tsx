"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Vector3, Quaternion } from "three";
import type { Group } from "three";

const SPACING = 1;
const CUBIE_SIZE = 0.95;
const STICKER_SIZE = 0.85;
const STICKER_OFFSET = 0.481;

const FACE_COLORS: Record<string, string> = {
  top: "#ffffff",
  bottom: "#ffd500",
  front: "#009b48",
  back: "#0045ad",
  left: "#ff5900",
  right: "#b90000",
};

const BODY_COLOR = "#262626";

/* ── Move types & sequences ─────────────────────────────────────── */

interface Move {
  axis: "x" | "y" | "z";
  layer: -1 | 0 | 1;
  angle: number;
}

// Visually interesting 10-move scramble touching all faces
const SCRAMBLE: Move[] = [
  { axis: "y", layer: 1, angle: -Math.PI / 2 },
  { axis: "x", layer: 1, angle: -Math.PI / 2 },
  { axis: "z", layer: 1, angle: -Math.PI / 2 },
  { axis: "y", layer: -1, angle: Math.PI / 2 },
  { axis: "x", layer: -1, angle: Math.PI / 2 },
  { axis: "z", layer: -1, angle: Math.PI / 2 },
  { axis: "y", layer: 1, angle: -Math.PI / 2 },
  { axis: "x", layer: 1, angle: -Math.PI / 2 },
  { axis: "z", layer: 1, angle: -Math.PI / 2 },
  { axis: "y", layer: -1, angle: Math.PI / 2 },
];

// Reverse the scramble to solve — no algorithm needed
const SOLVE: Move[] = [...SCRAMBLE]
  .reverse()
  .map((m) => ({ ...m, angle: -m.angle }));

/* ── Animation constants ─────────────────────────────────────────── */

const MOVE_DURATION = 0.3;
const PAUSE_DURATION = 1.5;

const AXIS_INDEX: Record<string, number> = { x: 0, y: 1, z: 2 };
const AXIS_VEC: Record<string, Vector3> = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
};

const _q = new Quaternion();

type Phase = "scrambling" | "paused_scrambled" | "solving" | "paused_solved";

/* ── Helpers ─────────────────────────────────────────────────────── */

// Rotate a grid coordinate ±90° around an axis using exact integer math
function rotatePosition(
  pos: [number, number, number],
  axis: "x" | "y" | "z",
  angle: number,
): [number, number, number] {
  const [x, y, z] = pos;
  const dir = angle > 0 ? 1 : -1;
  switch (axis) {
    case "x":
      return [x, -dir * z, dir * y];
    case "y":
      return [dir * z, y, -dir * x];
    case "z":
      return [-dir * y, dir * x, z];
  }
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/* ── Scene components ────────────────────────────────────────────── */

interface StickerProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

function Sticker({ position, rotation, color }: StickerProps) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[STICKER_SIZE, STICKER_SIZE]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cubie({ x, y, z }: { x: number; y: number; z: number }) {
  const stickers: StickerProps[] = [];

  if (y === 1)
    stickers.push({
      position: [0, STICKER_OFFSET, 0],
      rotation: [-Math.PI / 2, 0, 0],
      color: FACE_COLORS.top,
    });
  if (y === -1)
    stickers.push({
      position: [0, -STICKER_OFFSET, 0],
      rotation: [Math.PI / 2, 0, 0],
      color: FACE_COLORS.bottom,
    });
  if (z === 1)
    stickers.push({
      position: [0, 0, STICKER_OFFSET],
      rotation: [0, 0, 0],
      color: FACE_COLORS.front,
    });
  if (z === -1)
    stickers.push({
      position: [0, 0, -STICKER_OFFSET],
      rotation: [0, Math.PI, 0],
      color: FACE_COLORS.back,
    });
  if (x === 1)
    stickers.push({
      position: [STICKER_OFFSET, 0, 0],
      rotation: [0, Math.PI / 2, 0],
      color: FACE_COLORS.right,
    });
  if (x === -1)
    stickers.push({
      position: [-STICKER_OFFSET, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
      color: FACE_COLORS.left,
    });

  return (
    <>
      <RoundedBox
        args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]}
        radius={0.06}
        smoothness={4}
      >
        <meshStandardMaterial color={BODY_COLOR} />
      </RoundedBox>
      {stickers.map((s, i) => (
        <Sticker key={i} {...s} />
      ))}
    </>
  );
}

/* ── Initial cubie grid ──────────────────────────────────────────── */

const INIT_CUBIES: { x: number; y: number; z: number }[] = [];
for (let x = -1; x <= 1; x++)
  for (let y = -1; y <= 1; y++)
    for (let z = -1; z <= 1; z++) INIT_CUBIES.push({ x, y, z });

/* ── Animated cube group ─────────────────────────────────────────── */

function CubeGroup() {
  const groupRef = useRef<Group>(null);
  const cubieRefs = useRef<(Group | null)[]>(new Array(27).fill(null));

  // Logical grid positions (integers) — used to identify which layer a cubie is in
  const logicalPos = useRef<[number, number, number][]>(
    INIT_CUBIES.map(({ x, y, z }) => [x, y, z]),
  );

  const anim = useRef({
    phase: "paused_solved" as Phase,
    moveIndex: 0,
    progress: 0,
    easedProgress: 0,
    pauseTimer: 0,
  });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const s = anim.current;
    const pos = logicalPos.current;

    // Continuous idle spin (runs in all phases)
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x += delta * 0.1;

    /* ── Pause phases: countdown then transition ── */
    if (s.phase === "paused_solved" || s.phase === "paused_scrambled") {
      s.pauseTimer += delta;
      if (s.pauseTimer >= PAUSE_DURATION) {
        s.pauseTimer = 0;
        s.moveIndex = 0;
        s.progress = 0;
        s.easedProgress = 0;
        s.phase = s.phase === "paused_solved" ? "scrambling" : "solving";
      }
      return;
    }

    /* ── Active phases: animate move sequence ── */
    const moves = s.phase === "scrambling" ? SCRAMBLE : SOLVE;

    if (s.moveIndex >= moves.length) {
      // After a full solve, force-reset to perfect solved state to prevent drift
      if (s.phase === "solving") {
        for (let i = 0; i < 27; i++) {
          const ref = cubieRefs.current[i];
          if (!ref) continue;
          const { x, y, z } = INIT_CUBIES[i];
          ref.position.set(x * SPACING, y * SPACING, z * SPACING);
          ref.quaternion.identity();
        }
        logicalPos.current = INIT_CUBIES.map(({ x, y, z }) => [x, y, z]);
      }
      s.phase = s.phase === "scrambling" ? "paused_scrambled" : "paused_solved";
      s.pauseTimer = 0;
      return;
    }

    const move = moves[s.moveIndex];
    const ai = AXIS_INDEX[move.axis];
    const av = AXIS_VEC[move.axis];

    // Advance eased progress
    const prevEased = s.easedProgress;
    s.progress = Math.min(s.progress + delta / MOVE_DURATION, 1);
    s.easedProgress = smoothstep(s.progress);
    const da = move.angle * (s.easedProgress - prevEased);

    // Apply incremental rotation to all cubies in this layer
    _q.setFromAxisAngle(av, da);
    for (let i = 0; i < 27; i++) {
      if (Math.round(pos[i][ai]) !== move.layer) continue;
      const ref = cubieRefs.current[i];
      if (!ref) continue;
      ref.position.applyAxisAngle(av, da);
      ref.quaternion.premultiply(_q);
    }

    // Move complete — snap positions and advance
    if (s.progress >= 1) {
      for (let i = 0; i < 27; i++) {
        if (Math.round(pos[i][ai]) !== move.layer) continue;
        const ref = cubieRefs.current[i];
        if (ref) {
          ref.position.x = Math.round(ref.position.x / SPACING) * SPACING;
          ref.position.y = Math.round(ref.position.y / SPACING) * SPACING;
          ref.position.z = Math.round(ref.position.z / SPACING) * SPACING;
        }
        pos[i] = rotatePosition(pos[i], move.axis, move.angle);
      }
      s.moveIndex++;
      s.progress = 0;
      s.easedProgress = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {INIT_CUBIES.map(({ x, y, z }, i) => (
        <group
          key={`${x},${y},${z}`}
          ref={(el) => {
            cubieRefs.current[i] = el;
          }}
          position={[x * SPACING, y * SPACING, z * SPACING]}
        >
          <Cubie x={x} y={y} z={z} />
        </group>
      ))}
    </group>
  );
}

/* ── Canvas wrapper ──────────────────────────────────────────────── */

export default function RubiksCube() {
  return (
    <Canvas
      camera={{ position: [5, 4, 5], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 8, 5]} intensity={2} />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} />
      <CubeGroup />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
