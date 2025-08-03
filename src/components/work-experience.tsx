'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, MapPin, Building2, ExternalLink, Code, Globe, Zap } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  achievements: string[];
  projectUrl?: string;
  icon?: string;
}

interface WorkExperience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  projects: Project[];
  companyUrl?: string;
}

const workData: WorkExperience[] = [
  {
    id: 1,
    company: "Raftlabs",
    position: "Junior Software Engineer",
    duration: "Aug 2024 - Present",
    location: "Ahmedabad, India (Remote)",
    description: "Working as a Junior Software Engineer on multiple AI-powered web applications and browser extensions, contributing across the entire product lifecycle - from architecture and development to deployment.",
    projects: [
      {
        id: "draftly",
        name: "Draftly",
        description: "AI-powered LinkedIn automation and content management platform",
        technologies: ["NextJS", "Typescript", "Hasura", "GraphQL", "PostgreSQL", "AWS Lambda, SQS and S3", "Docker", "Playwright", "LangChain"],
        achievements: [ 
            "Built and maintained a browser extension that integrates Draftly’s features directly into LinkedIn, enhancing user workflows with real-time content suggestions and engagement tools.",
            "Developed robust scraping workflows using Playwright for seamless data extraction and automation on LinkedIn.",
            "Designed and implemented the AI-driven comment generation feature using LangChain and OpenAI APIs, enabling contextual, persona-based interactions.",
            "Integrated multi-input content repurposing flows to accept URLs, LinkedIn posts, and custom text inputs, enhancing content versatility.",
            "Built a content scheduling calendar and performance analytics dashboard using GraphQL APIs and PostgreSQL for comprehensive campaign management.",
            "Leveraged Next.js, TypeScript, Hasura, AWS Lambda/S3/SQS, and Docker for scalable backend and frontend solutions."        
        ],
        projectUrl: "https://www.draftly.so/"
      },
      {
        id: "ai-raft",
        name: "AIRaft",
        description: "AI chatbot generation tool for document-based customer support",
        technologies: ["NextJS", "TypeScript", "PostgreSQL", "GraphQL", "AWS Amplify", "Vercel AI SDK", "Vector DB" ],
        achievements: [
          "Developed backend systems to ingest and vectorize uploaded documents, sitemaps, and web pages for semantic search using Vector DBs.",
          "Implemented an AI-powered chatbot interface using Vercel AI SDK to allow businesses to deploy support bots within minutes.",
          "Integrated APIs with GraphQL and deployed on AWS Amplify for a scalable and serverless setup."            
        ]
      }
    ],
    companyUrl: "https://raftlabs.com/"
  },
  {
    id: 2,
    company: "Crackube",
    position: "Frontend Developer Intern",
    duration: "Oct 2023 - Mar 2024",
    location: "Chennai, India",
    description: "Developed an edu-social website that merges educational and social media features.",
    projects: [
      {
        id: "crackube-edu",
        name: "Edu-Social Platform",
        description: "Educational social media platform",
        technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git", "NodeJS", "Express", "MongoDB"],
        achievements: [
          "Developed an edu-social website, merging educational and social media features",
          "Led the creation of a dynamic blog section, enabling students to write and earn within the platform"
        ]
      }
    ]
  },
  {
    id: 3,
    company: "Sanghvi Infosoft",
    position: "FullStack Developer Intern",
    duration: "Jan 2023 - July 2023",
    location: "Ahmedabad, India",
    description: "Developed an innovative game-based learning website for student education with focus on performance optimization and interactive features.",
    projects: [
      {
        id: "game-learning",
        name: "JuniorGurukul - Game-Based Learning Platform",
        description: "Interactive educational platform with gamification for children to learn with fun",
        technologies: [],
        achievements: [
          "Developed an innovative game-based learning website for student education",
          "Ensured optimal performance by implementing front-end optimizations resulting in increased website performance",
          "Essential contributions included the creation of dynamic templates and the implementation of drag-and-drop functionalities"
        ]
      }
    ],
    companyUrl: "https://sanghviinfo.com/"
  }
];

export default function WorkExperience() {
  const [expandedIds, setExpandedIds] = useState<number[]>(workData.map(job => job.id));
  const [expandedProjects, setExpandedProjects] = useState<string[]>(
    workData.flatMap(job => job.projects.map(project => project.id))
  );
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(expandedId => expandedId !== id)
        : [...prev, id]
    );
  };

  const toggleProjectExpanded = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getProjectIcon = (projectName: string) => {
    if (projectName.toLowerCase().includes('draftly')) return <Globe className="w-5 h-5" />;
    if (projectName.toLowerCase().includes('api')) return <Zap className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  };

  return (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
        Work Experience
      </h2>
      
      <div className="relative">
        {/* Timeline line - Hidden on mobile */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-lavender/30 hidden sm:block"></div>
        
        <div className="space-y-6 sm:space-y-8">
          {workData.map((job, index) => (
            <div
              key={job.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(job.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Content card */}
              <div className=''>
                <div 
                  className="bg-card rounded-lg border p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                  onClick={() => toggleExpanded(job.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <h3 className="work-sans-600 text-lg sm:text-xl text-card-foreground">
                          {job.position}
                        </h3>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="work-sans-400">{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="work-sans-400">{job.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                      {job.companyUrl && (
                        <a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 sm:p-2 text-primary hover:text-secondary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button className="p-1 sm:p-2 text-muted-foreground hover:text-primary transition-colors">
                        {expandedIds.includes(job.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Company name */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="work-sans-500 text-base sm:text-lg text-primary">
                      {job.company}
                    </h4>
                  </div>
                  
                  {/* Description */}
                  <p className="work-sans-400 text-sm sm:text-base text-card-foreground mb-3 sm:mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  
                  {/* Projects Section */}
                  {expandedIds.includes(job.id) && (
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border animate-in slide-in-from-top-2 duration-300">
                      <h5 className="work-sans-600 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 uppercase tracking-wide">
                        Projects ({job.projects.length})
                      </h5>
                      <div className="space-y-3 sm:space-y-4">
                        {job.projects.map((project, projectIndex) => (
                                                      <div
                              key={project.id}
                              className={`rounded-lg border p-3 sm:p-4 transition-all duration-200 hover:shadow-md ${
                                projectIndex % 3 === 0 
                                  ? 'bg-gradient-to-br from-lavender/5 to-lavender/15 border-lavender/30' 
                                  : projectIndex % 3 === 1 
                                  ? 'bg-gradient-to-br from-slate-blue/5 to-slate-blue/15 border-slate-blue/30' 
                                  : 'bg-gradient-to-br from-cream/10 to-cream/20 border-cream/40'
                              }`}
                            >
                              {/* Project Header */}
                              <div className="flex items-start justify-between mb-2 sm:mb-3">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div>
                                  <div className="flex items-center gap-1 sm:gap-2">
                                    <h6 className="work-sans-600 text-base sm:text-lg text-card-foreground">
                                      {project.name}
                                    </h6>
                                    {project.projectUrl && (
                                      <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 text-primary hover:text-secondary transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    )}
                                  </div>
                                  <p className="work-sans-400 text-xs sm:text-sm text-muted-foreground mt-1">
                                    {project.description}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="p-1 text-muted-foreground hover:text-primary transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleProjectExpanded(project.id);
                                }}
                              >
                                {expandedProjects.includes(project.id) ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            
                            {/* Project Details */}
                            {expandedProjects.includes(project.id) && (
                              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-300">
                                {/* Technologies */}
                                <div className="mb-3 sm:mb-4">
                                  {project.technologies.length > 0 && <h6 className="work-sans-600 text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                                    Technologies
                                  </h6>}
                                  <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-2 sm:px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs work-sans-500 transition-all duration-200 hover:bg-secondary hover:scale-105"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Achievements */}
                                <div>
                                  <h6 className="work-sans-600 text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                                    Key Achievements
                                  </h6>
                                  <ul className="space-y-1 sm:space-y-2">
                                    {project.achievements.map((achievement, achievementIndex) => (
                                      <li
                                        key={achievementIndex}
                                        className="flex items-start gap-2 sm:gap-3 work-sans-400 text-card-foreground text-xs sm:text-sm"
                                      >
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 