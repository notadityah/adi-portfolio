"use client";

import dynamic from "next/dynamic";

const RubiksCube = dynamic(() => import("@/components/cube/RubiksCube"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <div className="mx-auto h-64 w-64 sm:h-72 sm:w-72 cursor-pointer">
        <RubiksCube />
      </div>
      <h1 className="mt-8 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl">
        Hi, I&apos;m Adi.
        <br />I solve problems.
      </h1>
      {/* <p className="mt-6 max-w-md text-base leading-relaxed text-white">
        Engineering high-integrity data systems and modern digital experiences
        with an enterprise-grade focus on scale and reliability.
      </p> */}
      <div className="absolute bottom-10">
        <span className="text-lg text-white">&darr;</span>
      </div>
    </section>
  );
}
