'use client'
import GitHubGraphSimple from '@/components/github-graph-simple';
import WorkExperience from '@/components/work-experience';
import { useState } from 'react';
import Image from 'next/image';

// Type definitions
interface Project {
  id: number;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
  keyFeatures: string[];
}

interface ProjectsData {
  serious: Project[];
  fun: Project[];
  more: Project[];
}

// Projects data - easily add new projects here
const projectsData: ProjectsData = {
  serious: [
    {
      id: 1,
      name: "Quizito - AI-Powered Quiz Generation Platform",
      description: "A full-stack web application that transforms any content (articles, documents, videos, topics) into engaging, intelligent quizzes using advanced AI. Generate quiz in 30 seconds",
      githubUrl: "https://github.com/Divy97/quizito",
      liveUrl: "https://quizito.vercel.app/",
      techStack: ["Next.js 15", "TypeScript", "LangChain", "PostgreSQL", "AWS Lambda", "AWS S3","AWS SQS", "Framer Motion"],
      keyFeatures: [
        "AI-powered quiz generation from multiple sources (PDF, URLs, YouTube, topics)",
        "Implemented sophisticated AI pipeline using LangChain framework, integrating multiple AI models (Claude 3.5, Google Generative AI) for question generation, semantic similarity analysis, and quality refinement",
        "Scalable serverless architecture with AWS Lambda and SQS queues",
        "Modern glassmorphism UI with real-time feedback and leaderboards"
      ]
    },
    {
      id: 2,
      name: "Rajawadu - Premium Royal Mukhwas & Traditional Indian Mouth Fresheners E-commerce Platform",
      description: "A full-stack e-commerce platform built for a decade-old family business specializing in premium Mukhwas and traditional Indian mouth fresheners. The platform serves customers across India with authentic products.",
      githubUrl: "",
      liveUrl: "https://rajawadu.com/",
      techStack: ["NextJS 15", "TypeScript", "Supabase", "Social Auth", "NextJS API routes", "PayU payment gateway integration","AWS SQS", "Framer Motion"],
      keyFeatures: [
        "Developed and deployed a modern e-commerce site serving 100+ daily users with fast, responsive UI using NextJS 15",
        "Integrated PayU payment gateway with secure transaction handling and real-time webhook-based order verification.",
        "Implemented real-time inventory management and a custom order tracking system, processing 200+ monthly orders with admin-side controls.",
        "Built robust authentication and guest checkout flows using Supabase Auth, enhancing user experience and conversion.",
        "Achieved SEO optimization with structured data and meta tags, boosting visibility for Gujarat-based traditional products"
      ]
    },
    {
      id: 3,
      name: "Blah - Video Calling Platform",
      description: "Real-time video calling functionality, leveraging Agora's Access Token and Agora RTM SDK for seamless communication.",
      githubUrl: "https://github.com/Divy97/blah-vc",
      liveUrl: "",
      techStack: ["Node.js", "ExpressJS", "Agora RTM SDK", "EJS", "OpenAI API", "Docker"],
      keyFeatures: [
        "Real-time video calling with meeting rooms",
        "AI chatbot integration using OpenAI API",
        "Server-side rendering with EJS templates"
      ]
    },

    {
      id: 4,
      name: "Razon - Anonymous Social Platform",
      description: "Privacy-focused social platform with enhanced anonymity features which allows users to post images, texts anonymously.",
      githubUrl: "https://github.com/Divy97/razon",
      liveUrl: "",
      techStack: ["ReactJS", "WebSockets", "ExpressJS", "JsonWebToken", "Cloudinary", "Multer", "MongoDB", "AWS-EC2"],
      keyFeatures: [
        "Anonymous posting with privacy features",
        "Real-time communication with inbuilt chat system",
        "Interactive features: upvoting, downvoting, commenting"
      ]
    },
    {
      id: 5,
      name: "Sync - Collaborate in Real-Time",
      description: "Collaborative text editing website enabling users to create and share real-time editable documents within dedicated rooms.",
      githubUrl: "https://github.com/Divy97/sync",
      liveUrl: "",
      techStack: ["ReactJS", "WebSockets", "ExpressJS", "Redis", "VertexAI", "MongoDB", "AWS-EC2"],
      keyFeatures: [
        "Real-time collaborative text editing",
        "Advanced text generation using Vertex AI",
        "Enhanced performance with Redis integration"
      ]
    },

  ],
  fun: [
    {
      id: 6,
      name: "Know Your Flags - Chrome Extension",
      description: "A lightweight and engaging Chrome extension that helps users learn and recognize world flags through a fast-paced, multiple-choice quiz. Designed with simplicity and education in mind, the extension presents a random flag and challenges the user to choose the correct country from four options — ideal for students, travelers, and quiz enthusiasts looking to sharpen their geography skills.",
      githubUrl: "",
      liveUrl: "https://chromewebstore.google.com/detail/know-your-flags/aamhiceacpppgnpifniemfpojkcdhone?authuser=1&hl=en-GB",
      techStack: ["TypeScript", "HTML5", "CSS3", "D3.js", "Chrome Extension API", "Chrome Storage API", "WXT"],
      keyFeatures: [
        "Developed an interactive Chrome extension quiz that challenges users to identify world flags from four randomized options.",
        "Designed a clean, minimal UI focused on fast, distraction-free gameplay—ideal for quick learning sessions or casual play.",
        "Implemented a randomized flag generator and answer logic for continuous, varied quiz experiences.",
        "Created an engaging, educational experience to help users improve their geography and flag recognition skills without sign-up or onboarding friction.",
        "Optimized for performance and accessibility, making it suitable for students, travelers, and quiz lovers alike."
      ]
    },
    {
        id: 8,
        name: "ChatPDF - AI-Powered PDF Document Assistant",
        description: "A web-based application that enables users to interact with PDF documents through natural language conversations. The system uses advanced AI to extract, process, and answer questions from uploaded PDF files, making document analysis and information retrieval seamless and intuitive.",
        githubUrl: "https://github.com/Divy97/chatpdf",
        liveUrl: "",
        techStack: ["Streamlit", "Google Generative AI", "Python","Flask","Langchain", "FAISS", "Docker", "PyPDF2"],
        keyFeatures: [
          "Built an AI-powered web app enabling users to chat with PDF documents using natural language queries powered by Google Gemini Pro and LangChain.",
         "Engineered semantic search with FAISS vector embeddings for accurate, context-aware information retrieval across multiple PDFs.",
          "Designed a real-time chat interface with drag-and-drop support for batch PDF uploads, intelligent chunking, and live Q&A feedback.",
          "Implemented a modular Flask + Streamlit architecture, containerized via Docker, and deployed using Heroku-ready configs.",
          "Achieved seamless document comprehension for multi-format PDFs, optimizing chunk segmentation and AI context preservation.",
        ]
      },
      {
        id: 9,
        name: "zenTab - Browser Extension",
        description: "A minimalistic browser extension designed to enhance productivity by blocking distracting websites during focused work sessions. The extension provides users with a clean, distraction-free browsing experience by allowing them to create customizable focus sessions with domain-based website blocking.",
        githubUrl: "https://github.com/Divy97/zentab",
        liveUrl: "https://chromewebstore.google.com/detail/zentab/abdgfdocampilhegaakgafjgcmcdblfg?authuser=1&hl=en-GB",
        techStack: ["TypeScript", "HTML5", "CSS3", "Chrome Extension API", "WXT"],
        keyFeatures: [
          "Developed a cross-browser extension (Chrome & Firefox) to block distracting websites during focus sessions using domain-based filtering.",
          "Built a clean, responsive popup UI with real-time session controls, including start, stop, extend, and reduce features for enhanced productivity.",
          "Implemented session persistence and cross-tab monitoring, maintaining focus mode across browser restarts and multiple tabs.",
          "Supported both allow-list and block-list modes, enabling flexible configuration based on user preferences.",
          "Packaged the extension using WXT, with production-ready builds and automatic state recovery via browser storage APIs."
        ]
      },
    {
      id: 10,
      name: "CrowdFunding DApp",
      description: "A decentralized crowdfunding platform built on blockchain technology that enables users to create and fund campaigns using cryptocurrency. The platform provides a transparent, trustless environment for fundraising with smart contract-based escrow functionality.",
      githubUrl: "https://github.com/Divy97/crowdFunding",
      liveUrl: "",
      techStack: ["React", "CSS3", "JavaScript", "Solidity", "Ethereum", "Ethers.js","ThirdWeb SDK", "React App Rewired", "Yarn"],
      keyFeatures: [
        "Built a decentralized crowdfunding platform enabling trustless fundraising through Ethereum smart contracts, eliminating the need for intermediaries.",
        "Developed and deployed secure donation flows with real-time fund transfers and escrow-based distribution using Solidity and Ethers.js.",
        "Integrated ThirdWeb SDK for seamless Web3 wallet interactions, supporting MetaMask and other Ethereum-compatible wallets.",
        "Enabled on-chain transparency for campaign data and donations, handling 50+ testnet campaigns with visible funding milestones and contributor lists.",        
      ]
    },
    {
      id: 11,
      name: "Sorting Visualizer",
      description: "An interactive web application that visualizes various sorting algorithms in real-time, allowing users to observe how different sorting techniques work step-by-step. The application provides an educational and engaging way to understand algorithm complexity and execution patterns through animated visual representations.",
      githubUrl: "https://github.com/Divy97/React-sortingVisualizer",
      liveUrl: "https://www.youtube.com/watch?v=pxhmJybT6xU",
      techStack: ["React", "Redux", "Material-UI", "Jest", "Sorting Algorithms"],
      keyFeatures: [
        "Built a decentralized crowdfunding platform enabling trustless fundraising through Ethereum smart contracts, eliminating the need for intermediaries.",
        "Developed and deployed secure donation flows with real-time fund transfers and escrow-based distribution using Solidity and Ethers.js.",
        "Integrated ThirdWeb SDK for seamless Web3 wallet interactions, supporting MetaMask and other Ethereum-compatible wallets.",
        "Enabled on-chain transparency for campaign data and donations, handling 50+ testnet campaigns with visible funding milestones and contributor lists.",        
      ]
    },
    {
      id: 12,
      name: "Activity Mind Mapper - Chrome Extension",
      description: "A sophisticated Chrome browser extension that tracks user browsing activities in real-time and visualizes them as interactive mind maps. The extension helps users understand their digital habits, set productivity goals, and achieve better work-life balance through comprehensive activity analytics and focus management features.",
      githubUrl: "",
      liveUrl: "",
      techStack: ["TypeScript", "HTML5", "CSS3", "D3.js", "Chrome Extension API", "Chrome Storage API", "WXT"],
      keyFeatures: [
        "Built a Chrome extension to track real-time user browsing behavior and visualize it as dynamic mind maps using D3.js.",
        "Implemented a Pomodoro-based Focus Mode with customizable site blocking and browser notifications for enhanced productivity.",
        "Tracked 10+ user activity metrics (e.g., time spent, scroll depth, site categories) with local data persistence via Chrome Storage API.",
        "Enabled smart goal management by mapping digital habits to user-defined productivity goals with visual progress tracking.",
        "Designed a privacy-first, Manifest V3-compliant architecture with fully local storage and no external data sharing."
      ]
    },
  ],
  more:[]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'serious' | 'fun' | 'more'>('serious');

  const tabs = [
    { id: 'serious', label: 'Serious Projects (aka hire-me stuff)', emoji: '', description: 'The ones that get me hired' },
    { id: 'fun', label: 'Fun Projects (just-because builds)', emoji: '', description: 'Just because I can' },
  ];

  const handleTabClick = (tabId: 'serious' | 'fun' | 'more') => {
      setActiveTab(tabId);
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
      {/* Sneaking Cat - Fixed Position - Hidden on mobile */}
      <div className="fixed left-[-7%] top-1/2 transform -translate-y-1/2 z-10 pointer-events-none hidden lg:block">
        <div className="relative w-110 h-110">
          <Image
            src="/image.png"
            alt="Sneaking cat peeking from the left"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* View Resume Button - Fixed Position Top Right */}
      <div className="fixed top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 z-20">
        <a
          href="https://drive.google.com/file/d/1aVtWGmOqTici3BNTgG8pIyzzo5GXULW0/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg work-sans-600 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">View Resume</span>
          <span className="sm:hidden">Resume</span>
        </a>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Fun Header with Meme */}
        <header className="text-center space-y-4 sm:space-y-6">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            {/* Main Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="playwrite-hu-400 text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                I&apos;m Divy Parekh
              </h1>
              <p className="work-sans-400 text-lg sm:text-xl text-muted-foreground px-4">
                too many side projects and not enough sleep 
              </p>
            </div>
          </div>
        </header>

        {/* GitHub Activity Graph */}
        <div className="relative">
          <GitHubGraphSimple username="divy97" />
        </div>

        {/* About Section */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
            About Me
          </h2>
          <div className="p-4 sm:p-6 bg-card rounded-lg border">
            <p className="work-sans-400 text-base sm:text-lg text-card-foreground leading-relaxed">
              A software engineer who builds things that <span className="text-red-500 font-bold">(mostly)</span> work and break things just to fix them better😅. 
              Currently obsessed with <span className="text-green-700 font-bold text-xl sm:text-2xl">AI AI AI</span>, and anything that lets me <span className="text-blue-500 font-semibold">dodge writing CSS</span>. 
              When I&apos;m not coding, I&apos;m either reading oddly specific books or collecting memes to share with my colleagues.
            </p>
          </div>
        </section>

          {/* Fun Hiring Section */}
          <section className="space-y-4 sm:space-y-6">
          <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
            Why You Should Hire Me 🧑‍💻
          </h2>
          <div className="p-4 sm:p-6 lg:p-8 bg-card rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Card 1: Code Obsession */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg">💻</span>
                  </div>
                  <h3 className="work-sans-600 text-base sm:text-lg text-green-800">Code Obsession</h3>
                </div>
                <p className="work-sans-400 text-sm sm:text-base text-green-700 leading-relaxed">
                  I&apos;m <span className="font-semibold">obsessed</span> with code - like &ldquo;debug-at-2am-for-fun&rdquo; obsessed. - like can you come to office on sunday ? Yay! why not ? <span className="font-semibold">obsessed</span>
                </p>
              </div>

              {/* Card 2: Fun Factor */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg">😎</span>
                  </div>
                  <h3 className="work-sans-600 text-base sm:text-lg text-yellow-800">Dangerously Fun</h3>
                </div>
                <p className="work-sans-400 text-sm sm:text-base text-yellow-700 leading-relaxed">
                  I&apos;m <span className="font-semibold">fun</span> to work with like <span className="font-semibold">very fun</span> - no <span className="font-semibold">seriously very fun</span> 
                </p>
              </div>

              {/* Card 3: Cat Love */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg">🐱</span>
                  </div>
                  <h3 className="work-sans-600 text-base sm:text-lg text-pink-800">Cat Enthusiast</h3>
                </div>
                <p className="work-sans-400 text-sm sm:text-base text-pink-700 leading-relaxed">
                  Most importantly, <span className="font-semibold">I love cats</span>. 
                  If your team has a cat Slack channel, I&apos;m already sold. 
                </p>
              </div>
            </div>

            {/* Bottom Summary */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 text-primary rounded-full">
                  <span className="text-lg sm:text-2xl">✨</span>
                  <p className="work-sans-600 text-sm sm:text-lg">
                    TL;DR — You get clean code, good vibes, and cat memes. What more could you want?
                  </p>
                  <span className="text-lg sm:text-2xl">✨</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='space-y-4 sm:space-y-6'>
          <div className="text-center space-y-3 sm:space-y-4">
            
            <h2 className="playwrite-hu-400 text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Ohh Okay okay, Serious stuff now...
            </h2>
            
            <p className="work-sans-400 text-base sm:text-lg text-muted-foreground mt-3 sm:mt-4 px-4">
              *cracks knuckles* Time to show off the professional side 😎
            </p>
          </div>
        </section>

        {/* Work Experience Section */}
        <WorkExperience />



                {/* Projects Section */}
                <section className="space-y-4 sm:space-y-6">
          <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
            Featured Projects
          </h2>
          <div className="p-4 sm:p-6 bg-card rounded-lg border">
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as 'serious' | 'fun' | 'more')}
                  className={`px-3 sm:px-4 py-2 rounded-full work-sans-600 text-sm sm:text-base transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tab.label}
                  
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {projectsData[activeTab].map((project: Project) => (
                <div key={project.id} className="p-4 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="work-sans-600 text-lg sm:text-xl text-card-foreground">
                      {project.name}
                    </h3>
                    <div className="flex gap-1 sm:gap-2">
                     {project.githubUrl && <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 sm:p-2 text-primary hover:text-secondary transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>}
                      {project.liveUrl && <a
                        href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
                        className="p-1 sm:p-2 text-primary hover:text-secondary transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>}
                    </div>
                  </div>
                  <p className="work-sans-400 text-sm sm:text-base text-card-foreground mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-3 sm:mb-4">
                    <h4 className="work-sans-600 text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wide">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                          {project.techStack.map((tech: string, index: number) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs work-sans-500">{tech}</span>
                    ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="work-sans-600 text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wide">Key Features</h4>
                    <ul className="space-y-1">
                                          {project.keyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 work-sans-400 text-xs sm:text-sm text-card-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* Education Section */}
                <section className="space-y-4 sm:space-y-6">
          <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
            Education
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {/* Master's Degree */}
            <div className="p-4 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg sm:text-xl font-bold">M</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="work-sans-600 text-lg sm:text-xl text-card-foreground mb-1">
                        Master&apos;s in Computer Applications
                      </h3>
                      <p className="work-sans-500 text-base sm:text-lg text-primary mb-2">
                        Vellore Institute of Technology, Chennai, India
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <span className="work-sans-400">2023 - 2025</span>
                        <span className="work-sans-600">GPA: 9.12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bachelor's Degree */}
            <div className="p-4 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary-foreground text-lg sm:text-xl font-bold">B</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="work-sans-600 text-lg sm:text-xl text-card-foreground mb-1">
                        Bachelor&apos;s in Computer Applications
                      </h3>
                      <p className="work-sans-500 text-base sm:text-lg text-secondary-foreground mb-2">
                        Gujarat Law Society University, Ahmedabad, India
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <span className="work-sans-400">2020 - 2023</span>
                        <span className="work-sans-600">GPA: 9.25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
            Skills & Technologies
          </h2>
          <div className="p-4 sm:p-6 lg:p-8 bg-card rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-primary uppercase tracking-wide">
                    Frontend
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">ReactJS</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">NextJS</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">WXT</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">TypeScript</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">JavaScript</span>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-secondary-foreground uppercase tracking-wide">
                    Styling & UI
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Tailwind CSS</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Bootstrap</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Material UI</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">ShadCN</span>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-primary uppercase tracking-wide">
                    Backend & APIs
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Express</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">NodeJS</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">GraphQL</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">REST</span>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-secondary-foreground uppercase tracking-wide">
                    AWS
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">AWS Lambda</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">AWS Amplify</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">AWS S3</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">AWS SQS</span>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-primary uppercase tracking-wide">
                    Databases 
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">PostgreSQL</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">MySQL</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">MongoDB</span>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-secondary-foreground uppercase tracking-wide">
                    AI & Analytics
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">LangChain</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">LangGraph</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Vercel AI SDK</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Google Analytics</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-secondary text-secondary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Sentry</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
                  <h3 className="work-sans-700 text-base sm:text-lg text-primary uppercase tracking-wide">
                    Additional Technologies 
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Prisma</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Redis</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">GIT</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">WXT</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Hasura</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Firebase</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Vercel</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm work-sans-600 shadow-sm hover:shadow-md transition-all duration-200">Sentry</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="playwrite-hu-300 text-2xl sm:text-3xl text-foreground">
            Get In Touch
          </h2>
          <div className="p-4 sm:p-6 bg-card rounded-lg border">
            <p className="work-sans-400 text-base sm:text-lg text-card-foreground mb-4">
              I&apos;m always up for a chat, a coffee, and code.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="mailto:divyparekh1810@gmail.com"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg work-sans-600 hover:opacity-90 transition-opacity text-center"
              >
                Send Email
          </a>
          <a
                href="https://github.com/Divy97"
            target="_blank"
            rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-secondary text-secondary-foreground rounded-lg work-sans-600 hover:opacity-90 transition-opacity text-center"
          >
                View GitHub
          </a>
            </div>
          </div>
        </section>

        </div>
      </main>
  );
}
