import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

const experiences = [
  {
    role: "Application Developer",
    company: "Accenture",
    period: "2020 - 2024",
    description:
      "Developed 15+ end-to-end ETL pipelines and automated complex workflows, saving 480 manual hours annually. Led technical risk assessments and cross-team deployments within a 12 team Agile/DevOps project to ensure high system availability.",
  },
  {
    role: "Application Development Associate",
    company: "Accenture",
    period: "2019 - 2020",
    description:
      "Ensured the integrity of a massive enterprise data warehouse for a global telecommunications client. Performed end-to-end root cause analysis across HANA layers and S/4HANA sources to resolve critical data discrepancies.",
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionLabel border>Work Experience</SectionLabel>

      <div className="divide-y divide-white/10">
        {experiences.map((exp) => (
          <div key={exp.role} className="py-6 sm:py-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-semibold text-white sm:text-3xl lg:text-4xl">
                {exp.role}
              </h3>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span>{exp.company}</span>
                <span className="text-white/30">|</span>
                <span>{exp.period}</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white sm:mt-6">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
