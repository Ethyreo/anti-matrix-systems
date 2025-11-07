import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  preview: string;
  challenge: string;
  approach: string;
  system: string;
  impact: string;
}

const CaseStudyCard = ({ title, preview, challenge, approach, system, impact }: CaseStudyCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card border-border card-hover cursor-pointer group">
          <CardHeader>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{preview}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80">
              Read Full Story
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">The Challenge</h4>
            <DialogDescription className="text-muted-foreground leading-relaxed">{challenge}</DialogDescription>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">The Approach</h4>
            <DialogDescription className="text-muted-foreground leading-relaxed">{approach}</DialogDescription>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">The System Built</h4>
            <DialogDescription className="text-muted-foreground leading-relaxed">{system}</DialogDescription>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-secondary">The Impact</h4>
            <DialogDescription className="text-muted-foreground leading-relaxed">{impact}</DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyCard;
