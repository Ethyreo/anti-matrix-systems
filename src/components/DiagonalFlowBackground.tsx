interface DiagonalFlowBackgroundProps {
  reverse?: boolean;
}

const DiagonalFlowBackground = ({ reverse = false }: DiagonalFlowBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className={`${reverse ? 'diagonal-flow-pattern-reverse' : 'diagonal-flow-pattern'} absolute inset-0`} 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.85) 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.85) 85%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default DiagonalFlowBackground;
