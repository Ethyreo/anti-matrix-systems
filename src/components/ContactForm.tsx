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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-muted border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-[1.02]"
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-muted border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-[1.02]"
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <Textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={6}
          className="bg-muted border-border text-foreground placeholder:text-muted-foreground resize-none transition-all duration-300 focus:scale-[1.02]"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
