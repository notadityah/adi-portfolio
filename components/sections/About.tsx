// import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

const SHOW_IMAGE = false;
// const IMAGE_SRC = "/adi.jpg";

export default function About() {
  return (
    <SectionWrapper id="about" className="border-t border-white/10">
      <div className={`grid items-center gap-16 ${SHOW_IMAGE ? "md:grid-cols-2" : ""}`}>
        <div>
          <SectionLabel>About Me</SectionLabel>
          <p className="mt-4 leading-relaxed text-white">
            I am a Software & Data Engineer focused on building scalable systems
            where robust data infrastructure meets modern user experiences.
            <br />
            <br />
            With 4+ years at Accenture, I specialized in high-stakes data
            engineering, architecting end-to-end ETL pipelines and ensuring the
            integrity of massive enterprise data warehouses. I&apos;ve
            transitioned that &ldquo;big data&rdquo; discipline into the modern
            stack, building everything from AI-powered computer vision apps to
            interactive, creative web interfaces with the belief that great
            software is only as good as the data powering it.
          </p>
        </div>

        {/* Uncomment when image is ready:
        {SHOW_IMAGE && (
          <div className="flex justify-center md:justify-end">
            <div className="relative border border-white p-2">
              <Image
                src={IMAGE_SRC}
                alt="Adi"
                width={1933}
                height={2175}
                sizes="(max-width: 768px) 80vw, 360px"
                className="h-auto w-full max-w-[360px] object-cover"
                priority
              />
            </div>
          </div>
        )} */}
      </div>
    </SectionWrapper>
  );
}
