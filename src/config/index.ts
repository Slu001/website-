import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Sanuth — My Personal Site",
  author: "Sanuth",
  description: "Welcome to my personal site. Leave a review and let me know what you think!",
  lang: "en",
  siteLogo: "",
  navLinks: [],
  socialLinks: [
    { text: "Twitter", href: "https://twitter.com" },
    { text: "LinkedIn", href: "https://linkedin.com" },
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://yoursite.vercel.app",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Sanuth",
    specialty: "Just vibing & building cool stuff",
    summary: "Hey! I'm Sanuth. This is my little corner of the internet. Feel free to look around and leave me a review below 👇",
    email: "your@email.com",
  },
  experience: [],
  projects: [],
  about: {
    description: `Hey I'm Sanuth! This is my personal site where friends can check out what I'm up to and leave reviews.`,
    image: "",
  },
};