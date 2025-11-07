import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ResourceCardProps {
  title: string;
}

const ResourceCard = ({ title }: ResourceCardProps) => {
  return (
    <Card className="bg-card border-border card-hover group cursor-pointer">
      <CardHeader>
        <div className="mb-2 text-secondary group-hover:scale-110 transition-transform duration-300">
          <FileText size={32} />
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
