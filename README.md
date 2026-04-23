# XENØr Protocol Landing Site

A production-ready crypto landing page for the XENØr protocol stack, featuring a pixel-faithful design inspired by modern crypto projects.

## Features

- ⚡ **Next.js 15** with App Router and TypeScript
- 🎨 **Tailwind CSS 4** for utility-first styling
- 🎬 **Framer Motion** for smooth animations
- 🔤 **Space Grotesk & Space Mono** fonts
- 🎯 **Fully responsive design**
- ♿ **Accessible components**
- 🚀 **Production-ready**

## Project Structure

```
xenor-site/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles & design tokens
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── About.tsx
│   ├── Features.tsx
│   ├── HowToBuy.tsx
│   ├── Contract.tsx
│   ├── Tokenomics.tsx
│   ├── Roadmap.tsx
│   ├── Security.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── CopyButton.tsx
│       ├── SectionLabel.tsx
│       └── GlitchText.tsx
├── lib/
│   └── constants.ts        # All content & configuration
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Design System

### Colors

- **Background**: `#050508` (near-black)
- **Surface**: `#0d0d12` (card backgrounds)
- **Accent**: `#00e5ff` (cyan glow)
- **Secondary**: `#7c5cfc` (purple)
- **Text**: `#eef0f8` (light)
- **Muted**: `#5a6580` (secondary text)

### Typography

- **Headings**: Space Grotesk (700-900 weight)
- **Body**: Space Grotesk (400 weight, 16px)
- **Code**: Space Mono (13-14px)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### Build

```bash
npm run build
npm start
```

## Technology Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 11.x |
| Icons | Lucide React | latest |
| Deploy | Vercel | — |

## Customization

### Content

All content is centralized in `lib/constants.ts`. Edit this file to customize:
- Navigation items
- Hero section text
- Features
- Tokenomics
- Roadmap
- Security information
- Footer links

### Styling

Global styles and design tokens are defined in:
- `app/globals.css` - CSS custom properties and utilities
- `tailwind.config.ts` - Tailwind theme configuration

### Components

All components are built from scratch using Tailwind CSS utility classes (no UI libraries).

## Deployment

This project is optimized for deployment on **Vercel**:

```bash
vercel deploy
```

Or push to GitHub and connect to Vercel for automatic deployments.

## License

MIT
