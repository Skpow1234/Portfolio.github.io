"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, Square, Copy, Download, Maximize2, Minimize2, Info, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CodeSample } from '@/components/coding-terminal-samples';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

interface CodingTerminalProps {
  className?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function CodingTerminal({
  className = '',
  isFullscreen = false,
  onToggleFullscreen
}: CodingTerminalProps) {
  const [currentSample, setCurrentSample] = useState(0);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [samples, setSamples] = useState<CodeSample[]>([]);
  const [samplesLoading, setSamplesLoading] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const sample = samples[currentSample];

  const createLineId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: createLineId(),
      type,
      content,
      timestamp: new Date(),
    };
    setLines(prev => [...prev, newLine]);
  };

  const typeText = async (text: string, type: TerminalLine['type'] = 'output') => {
    setIsTyping(true);
    const lineId = createLineId();
    const timestamp = new Date();
    const chunkSize = 4;

    setLines(prev => [...prev, { id: lineId, type, content: '', timestamp }]);

    for (let i = chunkSize; i <= text.length + chunkSize; i += chunkSize) {
      const currentText = text.slice(0, Math.min(i, text.length));
      setLines(prev => prev.map(line => (
        line.id === lineId ? { ...line, content: currentText } : line
      )));

      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }

      if (currentText.length === text.length) break;
      await new Promise(resolve => setTimeout(resolve, 12));
    }

    setIsTyping(false);
  };

  const runCode = async () => {
    if (isRunning || !sample) return;

    setIsRunning(true);
    setLines([]);

    // Get appropriate command and file extension for each language
    const getCommandAndExtension = (language: string) => {
      switch (language) {
        case 'go':
          return { command: 'go run', extension: 'go' };
        case 'cpp':
          return { command: 'g++ -std=c++17 -O2 -pthread', extension: 'cpp' };
        case 'java':
          return { command: 'mvn spring-boot:run', extension: 'java' };
        case 'python':
          return { command: 'python', extension: 'py' };
        case 'sql':
          return { command: 'psql -d portfolio_analytics -f', extension: 'sql' };
        case 'typescript':
          return { command: 'npm run dev', extension: 'tsx' };
        case 'csharp':
          return { command: 'dotnet run', extension: 'cs' };
        default:
          return { command: 'run', extension: 'txt' };
      }
    };

    const { command, extension } = getCommandAndExtension(sample.language);
    const fileName = sample.title.toLowerCase().replace(/\s+/g, '-');

    // Add command line
    if (sample.language === 'cpp') {
      addLine('command', `$ ${command} ${fileName}.${extension} -o ${fileName}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      addLine('command', `$ ./${fileName}`);
    } else if (sample.language === 'sql') {
      addLine('command', `$ ${command} ${fileName}.${extension}`);
    } else {
      addLine('command', `$ ${command} ${fileName}.${extension}`);
    }

    // Simulate compilation/running
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add output
    await typeText(sample.output, 'output');

    setIsRunning(false);
  };

  const copyCode = () => {
    if (!sample) return;

    navigator.clipboard.writeText(sample.code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const downloadCode = () => {
    if (!sample) return;

    const blob = new Blob([sample.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Get appropriate file extension
    const getFileExtension = (language: string) => {
      switch (language) {
        case 'go': return 'go';
        case 'cpp': return 'cpp';
        case 'java': return 'java';
        case 'python': return 'py';
        case 'sql': return 'sql';
        case 'typescript': return 'tsx';
        case 'csharp': return 'cs';
        default: return 'txt';
      }
    };

    a.download = `${sample.title.toLowerCase().replace(/\s+/g, '-')}.${getFileExtension(sample.language)}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearTerminal = () => {
    setLines([]);
  };

  useEffect(() => {
    let cancelled = false;

    import('@/components/coding-terminal-samples')
      .then(({ CODE_SAMPLES }) => {
        if (cancelled) return;

        setSamples(CODE_SAMPLES);
        setSamplesLoading(false);
      })
      .catch(() => {
        if (cancelled) return;

        setSamplesLoading(false);
        toast({
          title: "Samples unavailable",
          description: "Code samples could not be loaded.",
          variant: "destructive",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [toast]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <Card className={`${isFullscreen ? 'fixed inset-4 z-50 flex flex-col' : ''} ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b bg-muted/50 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Terminal className="h-5 w-5 flex-shrink-0" />
          <span className="font-semibold text-sm sm:text-base">Interactive Terminal</span>
          <Badge variant="secondary" className="text-xs">
            {samplesLoading ? 'Loading' : sample?.language ?? 'Sample'}
          </Badge>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!samples.length) return;

              setCurrentSample((prev) => (prev + 1) % samples.length);
              setLines([]);
            }}
            disabled={samplesLoading || samples.length < 2 || isRunning || isTyping}
            className="flex-1 sm:flex-none text-xs sm:text-sm"
          >
            Switch Sample
          </Button>
          {onToggleFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFullscreen}
              className="flex-shrink-0"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row ${isFullscreen ? 'flex-1 overflow-hidden' : 'h-[500px] sm:h-[600px] lg:h-96'}`}>
        {/* Code Editor */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r flex flex-col min-h-0">
          <div className="p-3 sm:p-4 border-b bg-muted/30 flex-shrink-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm sm:text-base truncate flex-1">
                {sample?.title ?? 'Loading sample...'}
              </h3>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  disabled={!sample}
                  className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3"
                  aria-label="Copy code"
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Copy</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCode}
                  disabled={!sample}
                  className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3"
                  aria-label="Download code"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Download</span>
                </Button>
              </div>
            </div>
            {/* Code Description */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
              <p className="leading-relaxed">{sample?.description ?? 'Loading code sample...'}</p>
            </div>
          </div>
          <div className="flex-1 p-3 sm:p-4 overflow-auto min-h-0">
            <pre className="text-xs sm:text-sm font-mono leading-relaxed">
              <code className={`language-${sample?.language ?? 'text'}`}>
                {sample?.code ?? ''}
              </code>
            </pre>
          </div>
        </div>

        {/* Terminal */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-3 sm:p-4 border-b bg-muted/30 flex-shrink-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-sm sm:text-base">Terminal Output</h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runCode}
                  disabled={isRunning || isTyping || !sample}
                  className="h-8 sm:h-9 text-xs sm:text-sm"
                >
                  {isRunning ? <Square className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />}
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearTerminal}
                  className="h-8 sm:h-9 text-xs sm:text-sm"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div
            ref={terminalRef}
            className="flex-1 p-3 sm:p-4 bg-black text-green-400 font-mono text-xs sm:text-sm overflow-auto min-h-0"
          >
            <AnimatePresence>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-1 whitespace-pre-wrap break-words ${
                    line.type === 'command' ? 'text-blue-400' :
                    line.type === 'error' ? 'text-red-400' :
                    line.type === 'info' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}
                >
                  {line.type === 'command' && <span className="text-white">$ </span>}
                  {line.content}
                </motion.div>
              ))}
            </AnimatePresence>
            {lines.length === 0 && !isRunning && (
              <div className="text-muted-foreground text-xs sm:text-sm opacity-50">
                {samplesLoading ? 'Loading code samples...' : 'Click "Run" to execute the code sample...'}
              </div>
            )}
            {isTyping && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-3 sm:h-4 bg-green-400 ml-1"
              />
            )}
          </div>
          {/* Output Explanation */}
          {sample && lines.length > 0 && !isRunning && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 sm:p-4 border-t bg-muted/30 flex-shrink-0"
            >
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Lightbulb className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-yellow-500" />
                <p className="leading-relaxed"><span className="font-medium text-foreground">What this means: </span>{sample.outputExplanation}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}
