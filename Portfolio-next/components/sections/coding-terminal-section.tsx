"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CodingTerminal } from '@/components/coding-terminal';
import { useLocaleContext } from '@/components/locale-provider';
import { getTranslation } from '@/lib/i18n';
import { Code2, Terminal, Play } from 'lucide-react';

export function CodingTerminalSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="coding-terminal" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="h-8 w-8 text-muted-foreground" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {currentLocale === 'en' ? 'Interactive Code Terminal' : 'Terminal de Código Interactivo'}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentLocale === 'en' 
              ? 'Explore my code samples and see them run in real-time. Switch between different languages and frameworks.'
              : 'Explora mis muestras de código y ve cómo se ejecutan en tiempo real. Cambia entre diferentes lenguajes y frameworks.'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CodingTerminal 
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            className="shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>Real-time execution</span>
            </div>
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>Multiple languages</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span>Copy & download code</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
