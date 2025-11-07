interface DiagonalFlowBackgroundProps {
  reverse?: boolean;
}

const DiagonalFlowBackground = ({ reverse = false }: DiagonalFlowBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`${reverse ? 'diagonal-flow-pattern-reverse' : 'diagonal-flow-pattern'} absolute inset-0`} />
    </div>
  );
};

export default DiagonalFlowBackground;
