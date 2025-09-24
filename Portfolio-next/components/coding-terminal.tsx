"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, Square, Copy, Download, Maximize2, Minimize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const CODE_SAMPLES = [
  {
    title: "Go Microservice",
    language: "go",
    code: `package main

import (
    "context"
    "fmt"
    "log"
    "net/http"
    "time"
    
    "github.com/gin-gonic/gin"
    "go.uber.org/zap"
)

type UserService struct {
    logger *zap.Logger
    db     *Database
}

func (s *UserService) GetUser(c *gin.Context) {
    userID := c.Param("id")
    
    user, err := s.db.GetUserByID(userID)
    if err != nil {
        s.logger.Error("Failed to get user", 
            zap.String("userID", userID),
            zap.Error(err))
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }
    
    c.JSON(http.StatusOK, user)
}

func main() {
    logger, _ := zap.NewProduction()
    defer logger.Sync()
    
    r := gin.Default()
    userService := &UserService{
        logger: logger,
        db:     NewDatabase(),
    }
    
    r.GET("/users/:id", userService.GetUser)
    
    log.Fatal(r.Run(":8080"))
}`,
    output: `$ go run main.go
[GIN-debug] Listening and serving HTTP on :8080
[GIN] 2024/01/15 - 10:30:45 | 200 |     1.234ms | GET      "/users/123"
[GIN] 2024/01/15 - 10:30:46 | 200 |     0.856ms | GET      "/users/456"`
  },
  {
    title: "React Component",
    language: "typescript",
    code: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  userId, 
  onUpdate 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        setUser(userData);
        onUpdate?.(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, onUpdate]);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{user?.name}</h2>
        <p className="text-muted-foreground">{user?.email}</p>
      </Card>
    </motion.div>
  );
};`,
    output: `$ npm run dev
> portfolio@0.1.0 dev
> next dev

✓ Ready in 2.3s
✓ Compiled /components/UserProfile in 1.2s
✓ Compiled /pages/users/[id] in 0.8s
✓ Ready on http://localhost:3000`
  },
  {
    title: "C# API Controller",
    language: "csharp",
    code: `using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ILogger<ProjectsController> _logger;
        private readonly IProjectService _projectService;

        public ProjectsController(
            ILogger<ProjectsController> logger,
            IProjectService projectService)
        {
            _logger = logger;
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects(
            [FromQuery] ProjectFilterDto filter)
        {
            try
            {
                var projects = await _projectService.GetProjectsAsync(filter);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving projects");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(
            [FromBody] CreateProjectDto createProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var project = await _projectService.CreateProjectAsync(createProjectDto);
                return CreatedAtAction(nameof(GetProject), 
                    new { id = project.Id }, project);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}`,
    output: `$ dotnet run
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request starting HTTP/1.1 GET https://localhost:5001/api/projects`
  }
];

export function CodingTerminal({ 
  className = '', 
  isFullscreen = false, 
  onToggleFullscreen 
}: CodingTerminalProps) {
  const [currentSample, setCurrentSample] = useState(0);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setLines(prev => [...prev, newLine]);
  };

  const typeText = async (text: string, type: TerminalLine['type'] = 'output') => {
    setIsTyping(true);
    let currentText = '';
    
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      addLine(type, currentText);
      
      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
      
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    setIsTyping(false);
  };

  const runCode = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setLines([]);
    
    const sample = CODE_SAMPLES[currentSample];
    
    // Add command line
    addLine('command', `$ ${sample.language === 'go' ? 'go run' : sample.language === 'typescript' ? 'npm run dev' : 'dotnet run'} ${sample.title.toLowerCase().replace(/\s+/g, '-')}.${sample.language === 'go' ? 'go' : sample.language === 'typescript' ? 'tsx' : 'cs'}`);
    
    // Simulate compilation/running
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add output
    await typeText(sample.output, 'output');
    
    setIsRunning(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_SAMPLES[currentSample].code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const downloadCode = () => {
    const sample = CODE_SAMPLES[currentSample];
    const blob = new Blob([sample.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sample.title.toLowerCase().replace(/\s+/g, '-')}.${sample.language === 'go' ? 'go' : sample.language === 'typescript' ? 'tsx' : 'cs'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearTerminal = () => {
    setLines([]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          <span className="font-semibold">Interactive Terminal</span>
          <Badge variant="secondary">{CODE_SAMPLES[currentSample].language}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSample((prev) => (prev + 1) % CODE_SAMPLES.length)}
          >
            Switch Sample
          </Button>
          {onToggleFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      <div className="flex h-96">
        {/* Code Editor */}
        <div className="flex-1 border-r">
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{CODE_SAMPLES[currentSample].title}</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 h-full overflow-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code className={`language-${CODE_SAMPLES[currentSample].language}`}>
                {CODE_SAMPLES[currentSample].code}
              </code>
            </pre>
          </div>
        </div>

        {/* Terminal */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Terminal Output</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runCode}
                  disabled={isRunning || isTyping}
                >
                  {isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
                <Button variant="outline" size="sm" onClick={clearTerminal}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div 
            ref={terminalRef}
            className="flex-1 p-4 bg-black text-green-400 font-mono text-sm overflow-auto"
          >
            <AnimatePresence>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-1 ${
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
            {isTyping && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-green-400 ml-1"
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
