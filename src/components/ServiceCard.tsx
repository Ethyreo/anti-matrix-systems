import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <Card className="panel-edge group relative flex h-full flex-col overflow-hidden border-border bg-card/80 card-hover">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-[var(--data-soft)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <CardContent className="relative z-10 flex flex-1 flex-col p-6">
        <div className="mb-5 flex h-14 w-14 items-center justify-center border border-border bg-background/60 text-primary transition-all duration-500 group-hover:border-primary group-hover:text-[var(--data)]">
          {icon}
        </div>
        <h3 className="mb-3 font-display text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
