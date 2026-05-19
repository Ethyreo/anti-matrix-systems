import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="panel-edge surface-grid mx-auto max-w-2xl space-y-6 border border-border p-5 shadow-2xl md:p-8">
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-4 flex flex-col space-y-2 text-left">
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Name</label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="min-h-12 border-border bg-background/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="mb-4 flex flex-col space-y-2 text-left">
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="min-h-12 border-border bg-background/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="mb-6 flex flex-col space-y-2 text-left">
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">What needs structure?</label>
          <Textarea
            id="message"
            placeholder="Tell me where growth feels chaotic: hiring, reporting, fundraising, workflows, AI stack, or team alignment."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="resize-none border-border bg-background/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="min-h-12 w-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        Send Diagnostic Request
      </Button>
    </form>
  );
};

export default ContactForm;
