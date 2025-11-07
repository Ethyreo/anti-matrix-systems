interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep = ({ number, title, description, isLast }: ProcessStepProps) => {
  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary flex items-center justify-center text-primary font-bold">
            {number}
          </div>
        </div>
        <div className="flex-1 pb-12">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
      )}
    </div>
  );
};

export default ProcessStep;
