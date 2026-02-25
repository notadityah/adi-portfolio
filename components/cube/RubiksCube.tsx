"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
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
    <group position={[x * SPACING, y * SPACING, z * SPACING]}>
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
    </group>
  );
}

function CubeGroup() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x += delta * 0.1;
  });

  const cubies: { x: number; y: number; z: number }[] = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) cubies.push({ x, y, z });

  return (
    <group ref={groupRef}>
      {cubies.map(({ x, y, z }) => (
        <Cubie key={`${x},${y},${z}`} x={x} y={y} z={z} />
      ))}
    </group>
  );
}

export default function RubiksCube() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

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
      {!isTouch && (
        <OrbitControls enableZoom={false} enablePan={false} />
      )}
    </Canvas>
  );
}
