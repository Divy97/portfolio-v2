'use client';

import { useEffect, useState } from 'react';

interface GitHubGraphProps {
  username: string;
}

interface ContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

interface GitHubContributionsResponse {
  contributions: ContributionDay[][];
  totalContributions: number;
}

export default function GitHubGraphSimple({ username }: GitHubGraphProps) {
  const [contributions, setContributions] = useState<ContributionDay[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        
        // Use the dedicated GitHub contributions API
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub contributions');
        }

        const data: GitHubContributionsResponse = await response.json();
        
        // Calculate date range for last one year
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        oneYearAgo.setMonth(today.getMonth());
        oneYearAgo.setDate(today.getDate());
        
        // Filter for last one year contributions
        const filteredContributions = data.contributions.map(week => 
          week.filter(day => {
            const dayDate = new Date(day.date);
            return dayDate >= oneYearAgo && dayDate <= today;
          })
        ).filter(week => week.length > 0);

        setContributions(filteredContributions);
        
        // Calculate total contributions for the period
        const totalPeriod = filteredContributions.reduce((total, week) => {
          return total + week.reduce((weekTotal, day) => {
            return weekTotal + day.contributionCount;
          }, 0);
        }, 0);
        
        setTotalContributions(totalPeriod);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contributions');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchContributions();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">🐱</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="work-sans-400 text-destructive">
          Unable to load GitHub contributions. {error}
        </div>
      </div>
    );
  }

  // Flatten all contribution days for easier processing
  const allDays = contributions.flatMap(week => week);
  
  if (allDays.length === 0) {
        return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-card rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
        <h2 className="playwrite-hu-300 text-xl sm:text-2xl text-card-foreground">
          GitHub Activity
        </h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="work-sans-600 text-xs sm:text-sm text-primary hover:underline"
        >
          @{username} →
        </a>
      </div>
      <div className="text-center py-6 sm:py-8">
        <p className="work-sans-400 text-sm sm:text-base text-muted-foreground">
          No contributions found for the last year.
        </p>
      </div>
    </div>
    );
  }

  // Calculate grid columns based on the number of weeks
  const weeks = contributions.length;
  const gridColsClass = `grid-cols-${weeks}`;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-card rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
        <h2 className="playwrite-hu-300 text-xl sm:text-2xl text-card-foreground">
          GitHub Activity
        </h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="work-sans-600 text-xs sm:text-sm text-muted-foreground">
            {totalContributions} contributions
          </span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="work-sans-600 text-xs sm:text-sm text-primary hover:underline"
          >
            @{username} →
          </a>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className={`grid ${gridColsClass} gap-1 min-w-max`}>
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-md transition-all duration-200 hover:scale-110 hover:shadow-md"
                  style={{
                    backgroundColor: day.contributionCount > 0 ? day.color : 'transparent',
                    border: day.contributionCount > 0 ? 'none' : '1px solid var(--border)',
                    boxShadow: day.contributionCount > 0 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span className="work-sans-400"></span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md border border-border"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-[#ebedf0] shadow-sm"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-[#9be9a8] shadow-sm"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-[#40c463] shadow-sm"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-[#30a14e] shadow-sm"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-[#216e39] shadow-sm"></div>
        </div>
        <span className="work-sans-400"></span>
      </div>
    </div>
  );
} 