import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ExternalLink from "@/components/ui/ExternalLink";

const projects = [
  {
    title: "BirdTag",
    description:
      "A bird detection and tagging system using Amazon AWS for bird observation and identification.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "YOLO",
      "CloudFront",
      "Cognito",
      "IAM",
      "ECR",
      "S3",
      "Lambda",
      "DynamoDB",
      "DynamoDB Streams",
      "API Gateway",
      "SNS",
      "CloudWatch",
    ],
    year: "2025",
    github: "https://github.com/notadityah/BirdTag",
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
  },
  {
    title: "FreshMate",
    description:
      "Android meal planning app with pantry management powered by on-device object detection (TFLite) and a built-in budget calculator.",
    stack: ["Kotlin", "TFLite", "Firebase Auth", "Firestore"],
    year: "2025",
    github: "https://github.com/notadityah/freshmate",
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
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
