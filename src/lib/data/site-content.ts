// src/lib/data/site-content.ts

export const site = {
  name: 'Astro Starter',
  url: 'https://example.com',
  description: 'A modern Astro starter template.',
  author: 'Your Name',
  email: 'your.email@example.com',
  telephone: '+1 234 567 890',
  address: {
    street: '123 Main St',
    locality: 'Anytown',
    country: 'USA',
  },
  social: {
    twitter: '@yourhandle',
    instagram: 'https://www.instagram.com/yourhandle',
    youtube: 'https://www.youtube.com/yourhandle',
  },
  themeColor: '#1e293b', // slate-800
  keywords: ['astro', 'starter', 'template'],
  priceRange: '$$',
  colors: {
    primary: 'indigo-600',
    primaryHover: 'indigo-500',
    secondary: 'red-600',
    secondaryHover: 'red-500',
    accent: 'blue-600',
    background: 'gray-900',
    text: 'white',
    selectionBg: 'blue-500',
  },
}

export const home = {
  hero: {
    title: 'Astro Starter',
    subtitle: 'Welcome to your new Astro site. Start building something amazing!',
    cta: {
      text: 'Get Started',
      url: '#about',
    },
  },
  about: {
    title: 'About This Project',
    text: [
      'This is a starter template for Astro, a modern static site generator. It includes a basic setup with Tailwind CSS, TypeScript, and some common components.',
      'The goal is to provide a solid foundation for building fast, content-focused websites. You can easily customize it to fit your needs.',
    ],
  },
  contact: {
    title: 'Get in Touch',
    subtitle: "Have a question or want to work together? I'd love to hear from you.",
    contactInfo: [
      {
        label: 'Phone / WhatsApp',
        value: site.telephone,
        icon: '📞',
      },
      {
        label: 'Email',
        value: site.email,
        icon: '✉️',
      },
    ],
    cta: {
      text: 'Send a Message',
      url: `mailto:${site.email}`,
      title: 'Send an email',
    },
  },
}

export const siteContent = {
  site,
  home,
  footer: {
    copyright: `© ${new Date().getFullYear()} ${site.name}. All rights reserved.`,
  },
}
