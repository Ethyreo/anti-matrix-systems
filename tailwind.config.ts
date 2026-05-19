import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--bg-surface)",
        ring: "var(--signal)",
        background: "var(--bg-void)",
        foreground: "var(--fg-primary)",
        primary: {
          DEFAULT: "var(--signal)",
          foreground: "var(--bg-void)",
        },
        secondary: {
          DEFAULT: "var(--bg-raised)",
          foreground: "var(--fg-primary)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "var(--fg-primary)",
        },
        muted: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--fg-muted)",
        },
        accent: {
          DEFAULT: "var(--signal)",
          foreground: "var(--bg-void)",
        },
        popover: {
          DEFAULT: "var(--bg-overlay)",
          foreground: "var(--fg-primary)",
        },
        card: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--fg-primary)",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        'gradient-cyber': 'var(--gradient-cyber)',
        'gradient-amber': 'var(--gradient-amber)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
