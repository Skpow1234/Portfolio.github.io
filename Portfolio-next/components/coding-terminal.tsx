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
    title: "C++ Performance Engine",
    language: "cpp",
    code: `#include <iostream>
#include <vector>
#include <memory>
#include <thread>
#include <chrono>
#include <algorithm>
#include <mutex>

class TaskScheduler {
private:
    std::vector<std::thread> workers_;
    std::mutex queue_mutex_;
    std::vector<std::function<void()>> task_queue_;
    bool running_;

public:
    TaskScheduler(size_t num_workers = std::thread::hardware_concurrency())
        : running_(true) {
        for (size_t i = 0; i < num_workers; ++i) {
            workers_.emplace_back([this] { worker_loop(); });
        }
    }

    ~TaskScheduler() {
        shutdown();
    }

    template<typename F>
    void submit(F&& task) {
        std::lock_guard<std::mutex> lock(queue_mutex_);
        task_queue_.emplace_back(std::forward<F>(task));
    }

    void shutdown() {
        running_ = false;
        for (auto& worker : workers_) {
            if (worker.joinable()) {
                worker.join();
            }
        }
    }

private:
    void worker_loop() {
        while (running_) {
            std::function<void()> task;
            {
                std::lock_guard<std::mutex> lock(queue_mutex_);
                if (!task_queue_.empty()) {
                    task = std::move(task_queue_.back());
                    task_queue_.pop_back();
                }
            }
            if (task) {
                task();
            } else {
                std::this_thread::sleep_for(std::chrono::milliseconds(1));
            }
        }
    }
};

int main() {
    TaskScheduler scheduler(4);
    
    // Submit some tasks
    for (int i = 0; i < 10; ++i) {
        scheduler.submit([i] {
            std::cout << "Task " << i << " executed on thread " 
                      << std::this_thread::get_id() << std::endl;
        });
    }
    
    std::this_thread::sleep_for(std::chrono::seconds(2));
    return 0;
}`,
    output: `$ g++ -std=c++17 -O2 -pthread scheduler.cpp -o scheduler
$ ./scheduler
Task 0 executed on thread 140123456789248
Task 1 executed on thread 140123456789248
Task 2 executed on thread 140123456789248
Task 3 executed on thread 140123456789248
Task 4 executed on thread 140123456789248
Task 5 executed on thread 140123456789248
Task 6 executed on thread 140123456789248
Task 7 executed on thread 140123456789248
Task 8 executed on thread 140123456789248
Task 9 executed on thread 140123456789248`
  },
  {
    title: "Java Spring Boot API",
    language: "java",
    code: `package com.juanhurtado.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.concurrent.CompletableFuture;
import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@Validated
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private CacheService cacheService;

    @GetMapping
    @Cacheable(value = "projects", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public ResponseEntity<Page<ProjectDto>> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String technology,
            Pageable pageable) {
        
        try {
            Page<ProjectDto> projects = projectService.findProjects(
                pageable, technology);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<ProjectDto>> getProjectById(
            @PathVariable @Valid Long id) {
        
        return CompletableFuture.supplyAsync(() -> {
            try {
                ProjectDto project = projectService.findById(id);
                return ResponseEntity.ok(project);
            } catch (ProjectNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        });
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(
            @RequestBody @Valid CreateProjectRequest request) {
        
        ProjectDto createdProject = projectService.createProject(request);
        cacheService.evictCache("projects");
        
        return ResponseEntity.status(201).body(createdProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable Long id,
            @RequestBody @Valid UpdateProjectRequest request) {
        
        try {
            ProjectDto updatedProject = projectService.updateProject(id, request);
            cacheService.evictCache("projects");
            return ResponseEntity.ok(updatedProject);
        } catch (ProjectNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}`,
    output: `$ mvn spring-boot:run
  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

2024-01-15 10:30:45.123  INFO 12345 --- [           main] c.j.p.PortfolioApplication               : Starting PortfolioApplication
2024-01-15 10:30:45.456  INFO 12345 --- [           main] c.j.p.PortfolioApplication               : Started PortfolioApplication in 2.334 seconds`
  },
  {
    title: "Python Data Pipeline",
    language: "python",
    code: `import asyncio
import aiohttp
import pandas as pd
import numpy as np
from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta
import logging
from concurrent.futures import ThreadPoolExecutor
import json

@dataclass
class DataPoint:
    timestamp: datetime
    value: float
    source: str
    metadata: Dict[str, str]

class DataPipeline:
    def __init__(self, max_workers: int = 10):
        self.max_workers = max_workers
        self.logger = logging.getLogger(__name__)
        self.session: Optional[aiohttp.ClientSession] = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_data_async(self, url: str) -> List[DataPoint]:
        """Fetch data from API endpoint asynchronously"""
        try:
            async with self.session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    return self._parse_data_points(data)
                else:
                    self.logger.error(f"Failed to fetch data: {response.status}")
                    return []
        except Exception as e:
            self.logger.error(f"Error fetching data from {url}: {e}")
            return []
    
    def _parse_data_points(self, raw_data: List[Dict]) -> List[DataPoint]:
        """Parse raw API data into DataPoint objects"""
        data_points = []
        for item in raw_data:
            try:
                dp = DataPoint(
                    timestamp=datetime.fromisoformat(item['timestamp']),
                    value=float(item['value']),
                    source=item.get('source', 'unknown'),
                    metadata=item.get('metadata', {})
                )
                data_points.append(dp)
            except (KeyError, ValueError) as e:
                self.logger.warning(f"Skipping invalid data point: {e}")
        return data_points
    
    async def process_data_batch(self, urls: List[str]) -> pd.DataFrame:
        """Process multiple data sources concurrently"""
        tasks = [self.fetch_data_async(url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        all_data_points = []
        for result in results:
            if isinstance(result, list):
                all_data_points.extend(result)
            else:
                self.logger.error(f"Task failed: {result}")
        
        return self._create_dataframe(all_data_points)
    
    def _create_dataframe(self, data_points: List[DataPoint]) -> pd.DataFrame:
        """Convert DataPoints to pandas DataFrame"""
        df = pd.DataFrame([
            {
                'timestamp': dp.timestamp,
                'value': dp.value,
                'source': dp.source,
                **dp.metadata
            }
            for dp in data_points
        ])
        
        # Add derived columns
        df['hour'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.day_name()
        df['value_normalized'] = (df['value'] - df['value'].mean()) / df['value'].std()
        
        return df
    
    def analyze_data(self, df: pd.DataFrame) -> Dict:
        """Perform statistical analysis on the data"""
        analysis = {
            'total_records': len(df),
            'date_range': {
                'start': df['timestamp'].min(),
                'end': df['timestamp'].max()
            },
            'sources': df['source'].value_counts().to_dict(),
            'statistics': {
                'mean': df['value'].mean(),
                'median': df['value'].median(),
                'std': df['value'].std(),
                'min': df['value'].min(),
                'max': df['value'].max()
            },
            'hourly_distribution': df.groupby('hour')['value'].mean().to_dict()
        }
        return analysis

async def main():
    urls = [
        'https://api.example.com/sensors/temperature',
        'https://api.example.com/sensors/humidity',
        'https://api.example.com/sensors/pressure'
    ]
    
    async with DataPipeline() as pipeline:
        df = await pipeline.process_data_batch(urls)
        analysis = pipeline.analyze_data(df)
        
        print(f"Processed {analysis['total_records']} records")
        print(f"Date range: {analysis['date_range']['start']} to {analysis['date_range']['end']}")
        print(f"Sources: {analysis['sources']}")

if __name__ == "__main__":
    asyncio.run(main())`,
    output: `$ python data_pipeline.py
INFO:__main__:Starting data pipeline...
INFO:__main__:Fetching data from 3 sources...
INFO:__main__:Processing 1,247 data points...
INFO:__main__:Analysis complete
Processed 1247 records
Date range: 2024-01-15 00:00:00 to 2024-01-15 23:59:59
Sources: {'temperature': 415, 'humidity': 416, 'pressure': 416}`
  },
  {
    title: "SQL Analytics Queries",
    language: "sql",
    code: `-- Advanced SQL Analytics for Portfolio Analytics
-- Performance optimization and complex data analysis

-- 1. User Engagement Analysis with Window Functions
WITH user_engagement AS (
    SELECT 
        user_id,
        DATE(created_at) as visit_date,
        COUNT(*) as daily_visits,
        SUM(session_duration) as total_duration,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) as visit_rank,
        LAG(created_at) OVER (PARTITION BY user_id ORDER BY created_at) as prev_visit
    FROM user_sessions 
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY user_id, DATE(created_at)
),
engagement_metrics AS (
    SELECT 
        user_id,
        COUNT(DISTINCT visit_date) as active_days,
        AVG(daily_visits) as avg_daily_visits,
        SUM(total_duration) as total_time_spent,
        AVG(EXTRACT(EPOCH FROM (created_at - prev_visit))/3600) as avg_hours_between_visits
    FROM user_engagement
    GROUP BY user_id
)

-- 2. Portfolio Section Performance Analysis
SELECT 
    s.section_name,
    COUNT(DISTINCT vs.user_id) as unique_visitors,
    COUNT(vs.id) as total_views,
    AVG(vs.time_spent) as avg_time_spent,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY vs.time_spent) as median_time_spent,
    COUNT(CASE WHEN vs.interaction_count > 0 THEN 1 END) as interactive_views,
    ROUND(
        COUNT(CASE WHEN vs.interaction_count > 0 THEN 1 END) * 100.0 / COUNT(vs.id), 2
    ) as interaction_rate
FROM portfolio_sections s
LEFT JOIN section_views vs ON s.id = vs.section_id
WHERE vs.created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY s.section_name, s.display_order
ORDER BY s.display_order;

-- 3. Technology Interest Analysis
WITH technology_interest AS (
    SELECT 
        user_id,
        CASE 
            WHEN section_name IN ('coding-terminal', 'repositories') THEN 'Development'
            WHEN section_name IN ('experience', 'skills') THEN 'Professional'
            WHEN section_name IN ('github-stats', 'about') THEN 'Personal'
            ELSE 'Other'
        END as interest_category,
        SUM(time_spent) as category_time,
        COUNT(*) as category_views
    FROM section_views sv
    JOIN portfolio_sections ps ON sv.section_id = ps.id
    WHERE sv.created_at >= CURRENT_DATE - INTERVAL '14 days'
    GROUP BY user_id, interest_category
),
user_interest_scores AS (
    SELECT 
        user_id,
        MAX(CASE WHEN interest_category = 'Development' THEN category_time END) as dev_time,
        MAX(CASE WHEN interest_category = 'Professional' THEN category_time END) as prof_time,
        MAX(CASE WHEN interest_category = 'Personal' THEN category_time END) as personal_time
    FROM technology_interest
    GROUP BY user_id
)

-- 4. Contact Form Conversion Analysis
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_visits,
    COUNT(CASE WHEN section_name = 'contact' THEN 1 END) as contact_page_views,
    COUNT(CASE WHEN form_submitted = true THEN 1 END) as form_submissions,
    ROUND(
        COUNT(CASE WHEN form_submitted = true THEN 1 END) * 100.0 / 
        COUNT(CASE WHEN section_name = 'contact' THEN 1 END), 2
    ) as conversion_rate,
    AVG(CASE WHEN form_submitted = true THEN time_to_submit END) as avg_time_to_submit
FROM user_sessions us
LEFT JOIN section_views sv ON us.id = sv.session_id
LEFT JOIN contact_submissions cs ON us.user_id = cs.user_id
WHERE us.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 5. Performance Optimization Query
-- Index recommendations and query optimization
EXPLAIN (ANALYZE, BUFFERS) 
SELECT 
    ps.section_name,
    COUNT(sv.id) as view_count,
    AVG(sv.time_spent) as avg_time
FROM portfolio_sections ps
INNER JOIN section_views sv ON ps.id = sv.section_id
WHERE sv.created_at BETWEEN '2024-01-01' AND '2024-01-31'
    AND sv.time_spent > 5  -- Only meaningful interactions
GROUP BY ps.section_name
HAVING COUNT(sv.id) > 10   -- Only popular sections
ORDER BY view_count DESC;`,
    output: `$ psql -d portfolio_analytics -f analytics_queries.sql
-- User Engagement Analysis
 user_id | active_days | avg_daily_visits | total_time_spent | avg_hours_between_visits
---------+-------------+------------------+------------------+-------------------------
    1001 |          15 |              2.3 |           1847.5 |                    12.4
    1002 |           8 |              1.8 |            923.2 |                    18.7
    1003 |          22 |              3.1 |           2156.8 |                     8.2

-- Portfolio Section Performance
    section_name    | unique_visitors | total_views | avg_time_spent | interaction_rate
--------------------+-----------------+-------------+----------------+------------------
 hero               |             156 |         234 |           12.5 |             89.2
 coding-terminal    |             134 |         198 |           45.8 |             76.3
 repositories       |             123 |         187 |           23.4 |             67.8
 experience         |             145 |         201 |           18.9 |             72.1

-- Contact Form Conversion
    date    | total_visits | contact_page_views | form_submissions | conversion_rate
------------+--------------+--------------------+------------------+----------------
 2024-01-15 |          45  |                 12 |                3 |           25.00
 2024-01-14 |          38  |                 15 |                4 |           26.67
 2024-01-13 |          52  |                 18 |                5 |           27.78`
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
          <Badge variant="secondary" className="text-xs">{CODE_SAMPLES[currentSample].language}</Badge>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSample((prev) => (prev + 1) % CODE_SAMPLES.length)}
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
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-sm sm:text-base truncate flex-1">{CODE_SAMPLES[currentSample].title}</h3>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyCode}
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
                  className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3"
                  aria-label="Download code"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Download</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-3 sm:p-4 overflow-auto min-h-0">
            <pre className="text-xs sm:text-sm font-mono leading-relaxed">
              <code className={`language-${CODE_SAMPLES[currentSample].language}`}>
                {CODE_SAMPLES[currentSample].code}
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
                  disabled={isRunning || isTyping}
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
                Click &quot;Run&quot; to execute the code sample...
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
        </div>
      </div>
    </Card>
  );
}
