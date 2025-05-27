# Juan Hurtado - Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing my professional experience, skills, and contact information.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Theme toggle with system preference support
- **Interactive Timeline**: Animated work experience timeline
- **Contact Form**: Email contact form integration using Resend
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript support
- **Modular Architecture**: Component-based structure for easy maintenance

## 🛠️ Tech Stack

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Email**: Resend
- **Deployment**: Static Export

## 📦 Project Structure

```bash
├── app/
│   ├── api/
│   │   └── send/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── contact.tsx
│   │   ├── education.tsx
│   │   ├── hero.tsx
│   │   ├── skills.tsx
│   │   └── work-experience.tsx
│   ├── ui/
│   └── contact-form.tsx
├── lib/
│   ├── data/
│   │   ├── education.ts
│   │   ├── skills.ts
│   │   └── work-experience.ts
│   ├── types/
│   │   └── index.ts
│   └── utils.ts
└── public/
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Skpow1234/Portfolio.github.io
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_verified_email
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

## 🎨 Customization

1. **Personal Information**: Update the content in `lib/data/` directory
2. **Styling**: Modify `tailwind.config.ts` and `app/globals.css`
3. **Components**: Customize components in the `components/` directory
4. **Email**: Update email templates in `app/api/send/route.ts`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

Feel free to reach out if you have any questions or just want to connect:

- GitHub: [@Skpow1234](https://github.com/Skpow1234)
- LinkedIn: [Juan Felipe H](https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/)
- Location: Cali, Colombia
