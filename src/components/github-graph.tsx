'use client';

import { useEffect, useState } from 'react';

interface GitHubGraphProps {
  username: string;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export default function GitHubGraph({ username }: GitHubGraphProps) {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        
        // GitHub GraphQL query to get contribution data
        const query = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const data = await response.json();
        
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
        setContributions(weeks);
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
        <div className="work-sans-400 text-muted-foreground">Loading contributions...</div>
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-card rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="playwrite-hu-300 text-2xl text-card-foreground">
          GitHub Activity
        </h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="work-sans-600 text-sm text-primary hover:underline"
        >
          @{username} →
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="w-3 h-3 rounded-sm border border-border"
                  style={{
                    backgroundColor: day.contributionCount > 0 ? day.color : 'transparent',
                  }}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span className="work-sans-400">Less</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-border"></div>
          <div className="w-3 h-3 rounded-sm border border-border bg-[#ebedf0]"></div>
          <div className="w-3 h-3 rounded-sm border border-border bg-[#9be9a8]"></div>
          <div className="w-3 h-3 rounded-sm border border-border bg-[#40c463]"></div>
          <div className="w-3 h-3 rounded-sm border border-border bg-[#30a14e]"></div>
          <div className="w-3 h-3 rounded-sm border border-border bg-[#216e39]"></div>
        </div>
        <span className="work-sans-400">More</span>
      </div>
    </div>
  );
} 