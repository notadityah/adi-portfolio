import SectionWrapper from "@/components/ui/SectionWrapper";
import ExternalLink from "@/components/ui/ExternalLink";

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/hariharanaditya/" },
  { name: "GitHub", href: "https://github.com/notadityah" },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Let&apos;s build the next big thing.
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white">
          I am currently open to new opportunities and would love to hear how I
          can contribute to your team.
        </p>

        {/* Uncomment when resume is ready:
        <a
          href="/resume.pdf"
          download
          className="mt-8 inline-block border border-white px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
        >
          Download Resume
        </a>
        */}

        <div className="mt-12 flex flex-col items-center gap-6">
          <a
            href="mailto:imadityahariharan@gmail.com"
            className="text-base text-white underline underline-offset-4 transition hover:text-white"
          >
            imadityahariharan@gmail.com
          </a>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <ExternalLink
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-white transition hover:text-white"
              >
                {link.name}
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
