import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Sanuth — My Personal Site",
  author: "Sanuth",
  description: "Welcome to my personal site. Leave a review and let me know what you think!",
  lang: "en",
  siteLogo: "/alejandro-small.jpg",
  siteLogo: "",
  navLinks: [],
  socialLinks: [
    { text: "Twitter", href: "https://twitter.com" },
    { text: "LinkedIn", href: "https://linkedin.com" },
  ],
  socialLinks: [
    { text: "Twitter", href: "https://twitter.com" },
    { text: "LinkedIn", href: "https://linkedin.com" },
    { text: "Github", href: "https://github.com" },
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
  experience: [
    {
      company: "Your School / Work",
      position: "Student / whatever you do",
      startDate: "2020",
      endDate: "Now",
      summary: ["Add something about yourself here!"],
    },
  ],
  projects: [
    {
      name: "This Website",
      summary: "Built my own personal site from scratch. Pretty cool right?",
      linkPreview: "/",
      linkSource: "https://github.com",
      image: "/spotifu.png",
    },
  ],
  about: {
    description: `
      Hey I'm Sanuth! This is my personal site where friends can check out what I'm up to and leave reviews.
      
      Feel free to drop a comment below — I'd love to hear what you think!
    `,
    image: "/alejandro-big.jpg",
  },
};