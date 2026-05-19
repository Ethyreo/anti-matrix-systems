import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ResourceCardProps {
  title: string;
  onClick?: () => void;
}

const ResourceCard = ({ title, onClick }: ResourceCardProps) => {
  // Determine metadata based on title matching
  const t = title.toLowerCase();
  const readTime = t.includes("hiring") || t.includes("frameworks") 
    ? "6 MIN READ" 
    : t.includes("reporting") || t.includes("investment") 
      ? "8 MIN READ" 
      : "5 MIN READ";

  return (
    <Card 
      onClick={onClick}
      className="panel-edge group relative h-full cursor-pointer overflow-hidden border-border bg-card/80 card-hover transition-all duration-300 hover:border-primary/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--pulse-soft)] via-transparent to-[var(--signal-soft)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <CardHeader className="relative z-10">
        <div className="mb-3 flex h-12 w-12 items-center justify-center border border-border bg-background/60 text-[var(--data)] transition-all duration-500 group-hover:border-primary group-hover:text-primary">
          <FileText size={24} />
        </div>
        <CardTitle className="font-display text-xl leading-tight transition-colors duration-300 group-hover:text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary/80 transition-colors duration-300 group-hover:text-primary">
          {readTime} // OPEN MANUAL
        </p>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
