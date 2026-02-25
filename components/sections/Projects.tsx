import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ExternalLink from "@/components/ui/ExternalLink";

const projects = [
  {
    title: "BirdDex",
    description:
      "Pokédex-like collection app for common Australian birds. Uses a YOLO-trained computer vision model to detect birds in photographs and add them to a user\u2019s collection.",
    stack: [
      "Vue.js",
      "Tailwind CSS",
      "YOLO",
      "AWS API Gateway",
      "Lambda",
      "S3",
      "Aurora DSQL",
    ],
    year: "2026",
    github: "https://github.com/notadityah/birddex",
    website: "https://birddex.fun",
  },
  {
    title: "JobDetective",
    description:
      "Tool to help young Australian job seekers detect and avoid job scams through AI-powered analysis, real-time statistics, and educational resources.",
    stack: [
      "Vue.js",
      "Bootstrap",
      "GenAI",
      "Img-to-Text",
      "AWS API Gateway",
      "Lambda",
      "Aurora RDS",
    ],
    year: "2025",
    github: "https://github.com/notadityah/JobDetective",
    website: null,
  },
  {
    title: "ProjectDemeter",
    description:
      "Nutrition education platform empowering communities with accessible health resources. Features a GenAI meal plan generator, map integration, and mail API.",
    stack: [
      "Vue.js",
      "GenAI",
      "Mapbox Integration",
      "SendGrid Integration",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
    ],
    year: "2025",
    github: "https://github.com/notadityah/ProjectDemeter",
    website: null,
  },
  {
    title: "FreshMate",
    description:
      "Android meal planning app with pantry management powered by on-device object detection (TFLite) and a built-in budget calculator.",
    stack: ["Kotlin", "TFLite", "Firebase Auth", "Firestore"],
    year: "2025",
    github: "https://github.com/notadityah/freshmate",
    website: null,
  },
];

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="border-t border-white/10">
      <SectionLabel border>Projects</SectionLabel>

      <div className="divide-y divide-white/10">
        {projects.map((proj) => (
          <div key={proj.title} className="py-6 sm:py-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                {proj.title}
              </h3>
              <span className="text-sm text-white/70">{proj.year}</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white">
              {proj.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {proj.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-6">
              <ExternalLink href={proj.github}>View more &rarr;</ExternalLink>
              {proj.website && (
                <ExternalLink href={proj.website}>
                  Live site &rarr;
                </ExternalLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
