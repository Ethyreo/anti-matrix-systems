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
          <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary flex items-center justify-center text-primary font-bold group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
            {number}
          </div>
        </div>
        <div className="flex-1 pb-12">
          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border group-hover:bg-primary/50 transition-colors duration-300" />
      )}
    </div>
  );
};

export default ProcessStep;
