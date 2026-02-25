interface SectionLabelProps {
  children: React.ReactNode;
  border?: boolean;
  right?: React.ReactNode;
}

export default function SectionLabel({
  children,
  border = false,
  right,
}: SectionLabelProps) {
  return (
    <div className={`flex items-baseline justify-between ${border ? "border-b border-white/10 pb-4" : ""}`}>
      <p className="text-xs font-medium uppercase tracking-widest text-white">
        {children}
      </p>
      {right}
    </div>
  );
}
