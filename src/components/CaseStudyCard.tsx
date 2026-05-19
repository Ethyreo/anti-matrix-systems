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
        <Card className="panel-edge group relative h-full cursor-pointer overflow-hidden border-border bg-card/80 card-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--data-soft)] via-transparent to-[var(--signal-soft)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <CardHeader className="relative z-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-primary">Case file</p>
            <CardTitle className="font-display text-2xl transition-colors duration-300 group-hover:text-primary">{title}</CardTitle>
            <CardDescription className="leading-relaxed text-muted-foreground">{preview}</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <Button variant="ghost" className="group/btn h-auto p-0 text-primary hover:bg-transparent hover:text-primary/80">
              Read Full Story
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-border bg-card animate-scale-in">
        <DialogHeader>
          <DialogTitle className="mb-4 font-display text-3xl">{title}</DialogTitle>
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
            <h4 className="text-lg font-semibold mb-2 text-[var(--data)]">The Impact</h4>
            <DialogDescription className="text-muted-foreground leading-relaxed">{impact}</DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyCard;
