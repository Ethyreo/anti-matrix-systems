import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <Card className="bg-card border-border card-hover group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 relative z-10">
        <div className="mb-4 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
