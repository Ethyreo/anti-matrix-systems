interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep = ({ number, title, description, isLast }: ProcessStepProps) => {
  return (
    <div className="relative group">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center border border-primary bg-card font-mono text-sm font-semibold text-primary transition-all duration-300 group-hover:bg-[var(--signal-soft)] group-hover:shadow-lg group-hover:shadow-primary/20">
            {number}
          </div>
        </div>
        <div className="flex-1 pb-12">
          <h3 className="mb-2 font-display text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute bottom-0 left-6 top-12 w-px bg-border transition-colors duration-300 group-hover:bg-primary/60" />
      )}
    </div>
  );
};

export default ProcessStep;
