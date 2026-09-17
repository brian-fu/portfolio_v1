export type Link = { label: string; href: string };

export type Project = {
  name: string;
  mark: string;
  href: string;
  summary: string;
  description: string;
  tech: string;
};

export const email = "b6fu@uwaterloo.ca";

export const social = {
  email: `mailto:${email}`,
  linkedin: "https://www.linkedin.com/in/brianfu-/",
  github: "https://github.com/brian-fu",
  x: "https://x.com/brifu_",
};

export const school = {
  logo: "/logos/university-of-waterloo.jpg",
  label: "university of waterloo",
  href: "https://uwaterloo.ca",
};

export const experience: { role: string; joiner: string; logo: string; org: Link }[] = [
  {
    role: "software engineer intern",
    joiner: "at",
    logo: "/logos/shopify.jpg",
    org: { label: "shopify", href: "https://www.shopify.com" },
  },
  {
    role: "full-stack developer intern",
    joiner: "at",
    logo: "/logos/wsib_innovation_lab_logo.jpg",
    org: {
      label: "wsib innovation lab",
      href: "https://www.linkedin.com/company/wsib-innovation-lab/",
    },
  },
  {
    role: "project developer",
    joiner: "for",
    logo: "/logos/blueprint.jpg",
    org: { label: "uw blueprint", href: "https://uwblueprint.org" },
  },
  {
    role: "software engineer intern",
    joiner: "at",
    logo: "/logos/wsib.jpg",
    org: { label: "wsib", href: "https://www.wsib.ca" },
  },
];

export const projects: Project[] = [
  {
    name: "adbrain",
    mark: "ab",
    href: "#",
    summary: "ai-powered ad generator",
    description:
      "ad generator that turns a short product description into a promotional video.",
    tech: "typescript, python, aws s3, supabase",
  },
  {
    name: "watopoly",
    mark: "w",
    href: "#",
    summary: "waterloo themed monopoly game",
    description:
      "a text-based monopoly variant set on the university of waterloo campus written in c++20.",
    tech: "c++20",
  },
];

// Extra context for the chatbot beyond what's listed above. Keep it factual.
export const about =
  "open to software engineering internship opportunities. the best way to reach me is email.";

// Suggested questions shown in the chat widget before the first message.
export const chatExamples = [
  "where have you worked?",
  "what opportunities are you currently seeking?",
  "how do i reach you?",
];

// Swap `src: null` for an image path (e.g. "/gallery/01.jpg") to replace the placeholder square.
export const gallery: { src: string | null; alt: string }[] = Array.from(
  { length: 10 },
  (_, i) => ({
    src: null,
    alt: `photo ${i + 1}`,
  }),
);
