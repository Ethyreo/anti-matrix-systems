import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ResourceCardProps {
  title: string;
}

const ResourceCard = ({ title }: ResourceCardProps) => {
  return (
    <Card className="bg-card border-border card-hover group cursor-pointer overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <div className="mb-2 text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <FileText size={32} />
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
