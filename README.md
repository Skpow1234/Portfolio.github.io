# Juan Hurtado - Portfolio - Ejemplo Santiago

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing my professional experience, skills, and contact information.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Contact](#contact)

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Theme toggle with system preference support
- **Interactive Timeline**: Animated work experience timeline
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript support
- **Modular Architecture**: Component-based structure for easy maintenance
- **Internationalization**: English and Spanish language support
- **GitHub Integration**: Real-time GitHub stats and repository showcase

## Tech Stack

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Static Export

## Project Structure

```bash
├── app/
│   ├── api/
│   │   └── github-stats/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── about-me.tsx
│   │   ├── contact.tsx
│   │   ├── education.tsx
│   │   ├── github-stats.tsx
│   │   ├── hero.tsx
│   │   ├── repositories.tsx
│   │   ├── skills.tsx
│   │   └── work-experience.tsx
│   ├── ui/
│   ├── contact-form.tsx
│   ├── header.tsx
│   ├── mobile-menu.tsx
│   ├── mode-toggle.tsx
│   └── theme-provider.tsx
├── hooks/
│   ├── use-github-stats.ts
│   ├── use-locale.ts
│   ├── use-scroll-progress.ts
│   ├── use-smooth-scroll.ts
│   └── use-toast.ts
├── lib/
│   ├── config/
│   ├── data/
│   │   ├── education.ts
│   │   ├── github-stats.ts
│   │   ├── repositories.ts
│   │   ├── skills.ts
│   │   └── work-experience.ts
│   ├── i18n.ts
│   ├── rate-limit.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils.ts
│   └── validation/
│       └── contact.ts
└── public/
```

## Getting Started

1.**Clone the repository**

```bash
git clone https://github.com/Skpow1234/Portfolio.github.io
```

2.**Install dependencies**

```bash
npm install
```

3.**Run the development server**

```bash
npm run dev
```

4.**Build for production**

```bash
npm run build
```

## Customization

1. **Personal Information**: Update the content in `lib/data/` directory
2. **Styling**: Modify `tailwind.config.ts` and `app/globals.css`
3. **Components**: Customize components in the `components/` directory
4. **Translations**: Modify `lib/i18n.ts` for language content
5. **GitHub Integration**: Update GitHub username in `lib/data/github-stats.ts`

## Contact

Feel free to reach out if you have any questions or just want to connect:

- GitHub: [@Skpow1234](https://github.com/Skpow1234)
- LinkedIn: [Juan Felipe H](https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/)
- Location: Cali, Colombia
