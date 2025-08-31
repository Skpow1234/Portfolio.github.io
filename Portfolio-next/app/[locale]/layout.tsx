import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Juan Hurtado - Portfolio",
  description: "Senior Software Engineer Portfolio",
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  return (
    <div lang={locale}>
      {children}
    </div>
  );
}


