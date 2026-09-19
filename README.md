# Juan Hurtado - Portfolio

A modern, responsive portfolio built with Next.js, TypeScript, and Tailwind CSS — featuring work experience, selected projects, bilingual content (EN/ES), and a contact form.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Customization](#customization)
- [Contact](#contact)

## Features

- **Responsive layout** for mobile and desktop
- **Rootprint-inspired UI** — light canvas, Geist Mono, hairline borders, flat panels
- **Featured work** case-study cards for selected GitHub projects
- **Work experience** with expandable role details
- **Bilingual** English / Spanish (`/en`, `/es`)
- **Contact form** with validation and email delivery
- **Lazy-loaded** chatbot and coding terminal for a lighter first paint

## Tech Stack

- **Framework**: Next.js 16.3.5
- **Language**: TypeScript 5.9
- **Runtime UI**: React 19
- **Styling**: Tailwind CSS 4
- **Package manager**: pnpm
- **UI primitives**: Radix UI / shadcn-style components
- **Icons**: Lucide React (+ local brand SVGs)
- **Validation**: Zod 4
- **Deployment**: Vercel / Next.js runtime

## Project Structure

App code lives in `Portfolio-next/`:

```bash
Portfolio-next/
├── app/
│   ├── api/
│   │   ├── chatbot/
│   │   ├── leetcode-stats/
│   │   └── send/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   ├── ui/
│   ├── header.tsx
│   ├── mobile-menu.tsx
│   └── ...
├── hooks/
├── lib/
│   ├── data/
│   ├── i18n/
│   └── validation/
├── proxy.ts
├── package.json
└── pnpm-lock.yaml
```

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/installation) 10+

```bash
npm install -g pnpm@latest
# or: corepack enable && corepack prepare pnpm@latest --activate
```

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/Skpow1234/Portfolio.github.io
cd Portfolio.github.io/Portfolio-next
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

4. **Build for production**

```bash
pnpm build
pnpm start
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Next.js dev server |
| `pnpm dev:clean` | Delete `.next` then start dev |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm test` | Run Jest smoke tests |
| `pnpm lint` | Run ESLint |

## Customization

1. **Personal / project data**: `lib/data/` (repositories, experience, education)
2. **Styling**: `app/globals.css` (Tailwind v4 theme tokens)
3. **Components**: `components/`
4. **Translations**: `lib/i18n/en.ts` and `lib/i18n/es.ts`
5. **Locale routing**: `app/[locale]/` and `proxy.ts`

## Contact

- GitHub: [@Skpow1234](https://github.com/Skpow1234)
- LinkedIn: [Juan Felipe H](https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/)
- Location: Cali, Colombia
