'use client'
import { data } from 'framer-motion/client';
import { useState, useEffect, useRef } from 'react'

// ─── CONTENT ────────────────────────────────────────────────────────────────

const C = {
  thoughts: [
    {date : "", text: "Let them be human — flawed, inconsistent, real."},
    {date : "", text: "And still we sleep."},
    {date : "", text: "Shit happens :)"},
    { date: "", text: "Buy a chocolate" },
    { date: "", text: "Learning is not supposed to be fun. The primary feeling should be that of effort. It should look a lot less like that \"10 minute full body\" workout from your local digital media creator and a lot more like a serious session at the gym. You want the mental equivalent of sweating.\n\n— Andrej Karpathy" },
    { date: "", text: "In the AI age, taste will become even more important." },
    { date: "", text: "Knock, knock.\n\nWho's there?\n\nNorma Lee.\n\nNorma Lee who?\n\nNorma Lee I don't do this, but do you want to go out with me?" },
    { date: "", text: "Umeed pe duniya Kayam hai" },
    { date: "", text: "Man has no freedom. Fate tosses him about in all directions. The game which Fate plays is unpredictable. Nothing lasts in this world. What has been gathered is scattered about. What was once at the top soon reaches the lowest position. Meetings only end in separations and, as for life, it only ends in death." },
    { date: "", text: "Aaj Delhi me, ek hotel me aag lagne se kuch logo ki maut ho gayi, thode din pehle train accident me huyi thi, kabhi bridge ke girne se toh kabhi kabar raste pe sirf chalne se ho jati hai, kuch logo ki maut\n\nJab jab desh ke kisi kone me hoti hai kisi ki maut tab tab mujhe yaad aata hai papa ka mujhe loan leke desh se bahar bhejne ka sapna aur \"mera desh ke liye kuch karna hai\" ye kehke unke uss sapne ko todne vala din" },
    { date: "", text: "Z-value ne critical region me aake apni aukat dikha diya"}
  ],
  poetry: [
    { body: "जो मेरे घर कभी नहीं आएंगे\nमैं उनसे मिलने\nउनके पास चला जाऊंगा।\nएक उफ़नती नदी कभी नहीं आएगी मेरे घर\nनदी जैसे लोगों से मिलने\nनदी किनारे जाऊंगा\nकुछ तैरूंगा और डूब जाऊंगा।\n\nपहाड़, टीले, चट्टानें, तालाब\nअसंख्य पेड़ खेत\nकभी नहीं आयेंगे मेरे घर\nखेत खलिहानों जैसे लोगों से मिलने\nगांव-गांव, जंगल-गलियां जाऊंगा।\n\nजो लगातार काम से लगे हैं\nमैं फुरसत से नहीं\nउनसे एक ज़रूरी काम की तरह\nमिलता रहूंगा।\nइसे मैं अकेली आख़िरी इच्छा की तरह\nसबसे पहली इच्छा रखना चाहूंगा।", author: "Vinod kumar shukla" },
    { body: "Bhale betho hazaro vaar eno haath Jaline\nToh pan khabar nathi eni nas kya che", author: "Mariz" },
    { body: "'Gaalib' hame.n na chhe.D ki phir josh-e-ashk se\nbaiThe hai.n ham tahayya-e-tuufaa.n kiye hu.e", author: "Mirza Ghalib" },
    { body: "aur 'faraaz' chaahiye.n kitnii mohabbate.n tujhe\nmaa.o.n ne tere naam par bachcho.n kaa naam rakh diyaa", author: "Ahmad Faraz" },
    { body: "hazaaro.n KHvaahishe.n aisii ki har KHvaahish pe dam nikle\nbahut nikle mire armaan lekin phir bhii kam nikle", author: "Mirza Ghalib" },
    { body: "rago.n me.n dau.Dte phirne ke ham nahii.n qaa.il\njab aa.nkh hii se na Tapkaa to phir lahuu kyaa hai", author: "Mirza Ghalib" },
    { body: "ham ko ma.aluum hai jannat kii haqiiqat lekin\ndil ke KHush rakhne ko 'Gaalib' ye KHayaal achchhaa hai", author: "Mirza Ghalib" },
    { body: "ishq ne 'Gaalib' nikammaa kar diyaa\nvarna ham bhii aadmii the kaam ke", author: "Mirza Ghalib" },
    { body: "le de ke apne paas faqat ik nazar to hai\nkyuu.n dekhe.n zindagii ko kisii kii nazar se ham", author: "Sahir Ludhianvi" },
    { body: "hazaar barq gire laakh aa.ndhiyaa.n uTThe.n\nvo phuul khil ke rahe.nge jo khilne vaale hai.n", author: "Sahir Ludhianvi" },
    { body: "है पाश पाश मगर फिर भी मुस्कुराता है\nवो चेहरा जैसे हो टूटे हुए खिलौने का", author: "Javed Akhtar" },
    { body: "नेकी इक दिन काम आती है हम को क्या समझाते हो\nहम ने बे-बस मरते देखे कैसे प्यारे प्यारे लोग", author: "Javed Akhtar" },
    { body: "डर हम को भी लगता है रस्ते के सन्नाटे से\nलेकिन एक सफ़र पर ऐ दिल अब जाना तो होगा", author: "Javed Akhtar" },
    { body: "बड़ी हसरत से इंसाँ बचपने को याद करता है\nये फल पक कर दोबारा चाहता है ख़ाम हो जाए", author: "Nushur Wahidi" },
    { body: "इक नज़र का फ़साना है दुनिया\nसौ कहानी है इक कहानी से", author: "Nushur Wahidi" },
    { body: "kis liye dekhtii ho aa.iina\ntum to KHud se bhii KHuubsuurat ho", author: "Jaun Eliya" },
    { body: "mai.n jo huu.n 'jaun-elia' huu.n janaab\nis kaa behad lihaaz kiijiyegaa", author: "Jaun Eliya" },
    { body: "ye mujhe chain kyuu.n nahii.n pa.Dtaa\nek hii shaKHs thaa jahaan me.n kyaa", author: "Jaun Eliya" },
    { body: "us kii yaad aa.ii hai saa.nso zaraa aahista chalo\ndha.Dkano.n se bhii ibaadat me.n KHalal pa.Dtaa hai", author: "Rahat Indori" },
    { body: "सवाल ये है हवा आई किस इशारे पर\nचराग़ किस के बुझे ये सवाल थोड़ी है", author: "Nadim Nadeem" },
    { body: "नहीं निगाह में मंज़िल तो जुस्तुजू ही सही\nनहीं विसाल मयस्सर तो आरज़ू ही सही", author: "Faiz Ahmad Faiz" },
    { body: "दिल ना-उमीद तो नहीं नाकाम ही तो है\nलम्बी है ग़म की शाम मगर शाम ही तो है", author: "Faiz Ahmad Faiz" },
    { body: "और भी दुख हैं ज़माने में मोहब्बत के सिवा\nराहतें और भी हैं वस्ल की राहत के सिवा", author: "Faiz Ahmad Faiz" },
    { body: "KHush-shakl bhii hai vo ye alag baat hai magar\nham ko zahiin log hamesha pasand the", author: "Javed Akhtar" },
    { body: "dhu.aa.n jo kuchh gharo.n se uTh rahaa hai\nna puure shahar par chhaa.e to kahnaa", author: "Javed Akhtar" },
    { body: "tum ye kahte ho ki mai.n Gair huu.n phir bhii shaayad\nnikal aa.e ko.ii pahchaan zaraa dekh to lo", author: "Javed Akhtar" },
    { body: "maz.hab nahii.n sikhaataa aapas me.n bair rakhnaa\nhindii hai.n ham vatan hai hindostaa.n hamaaraa", author: "Allama Iqbal" },
    { body: "mujh se pahlī sī mohabbat mirī mahbūb na maañg\nmaiñ ne samjhā thā ki tū hai to daraḳhshāñ hai hayāt\n\nterā ġham hai to ġham-e-dahr kā jhagḌā kyā hai\nterī sūrat se hai aalam meñ bahāroñ ko sabāt\n\nterī āñkhoñ ke sivā duniyā meñ rakkhā kyā hai\ntū jo mil jaa.e to taqdīr nigūñ ho jaa.e\n\nyuuñ na thā maiñ ne faqat chāhā thā yuuñ ho jaa.e\naur bhī dukh haiñ zamāne meñ mohabbat ke sivā\n\nrāhateñ aur bhī haiñ vasl kī rāhat ke sivā\nan-ginat sadiyoñ ke tārīk bahīmāna tilism\n\nresham o atlas o kamḳhāb meñ bunvā.e hue\njā-ba-jā bikte hue kūcha-o-bāzār meñ jism\n\nḳhaak meñ luThḌe hue ḳhuun meñ nahlā.e hue\njism nikle hue amrāz ke tannūroñ se\n\npiip bahtī huī galte hue nāsūroñ se\nlauT jaatī hai udhar ko bhī nazar kyā kiije\n\nab bhī dilkash hai tirā husn magar kyā kiije\naur bhī dukh haiñ zamāne meñ mohabbat ke sivā\n\nrāhateñ aur bhī haiñ vasl kī rāhat ke sivā\nmujh se pahlī sī mohabbat mirī mahbūb na maañg", author: "Faiz Ahmad Faiz" },
  ],
  movies: [] as { title: string; year: string; take: string }[],
  books:  [] as { title: string; author: string; take: string }[],
  songs: [
    { title: "Apocalypse",     artist: "Cigarettes After Sex", take: "perfect for writing code at 1am with one lamp on. it will make you sad but productively." },
    { title: "Redbone",        artist: "Childish Gambino",     take: "the bassline is so warm it feels like it's hugging you. six minutes of pure mood." },
    { title: "Moon River",     artist: "Frank Ocean",          take: "holds you gently. put it on when the day is too loud." },
    { title: "From The Start", artist: "Laufey",               take: "jazzy, tender, slightly heartbroken. perfect for sunday mornings." },
  ],
}

// ─── RICH TECHNICAL DATA ──────────────────────────────────────────────────────

interface Project {
  id: number
  name: string
  description: string
  githubUrl: string
  liveUrl: string
  techStack: string[]
  keyFeatures: string[]
}

const projectsData: { serious: Project[]; fun: Project[] } = {
  serious: [
    {
      id: 1,
      name: "Quizito",
      description: "Async AI quiz-generation platform that turns PDFs, URLs, and YouTube transcripts into high-quality quizzes without blocking long-running jobs.",
      githubUrl: "https://github.com/Divy97/quizito",
      liveUrl: "https://quizito.vercel.app/",
      techStack: ["Next.js 15", "TypeScript", "LangChain", "PostgreSQL", "AWS Lambda", "AWS S3", "AWS SQS", "AWS KMS", "Redis"],
      keyFeatures: [
        "Built async quiz generation pipeline for PDFs, URLs, and YouTube transcripts with non-blocking job processing",
        "Designed Bloom's-taxonomy-weighted generation with parallel LLM calls and a refinement pass for stronger question quality",
        "Added embedding-based semantic deduplication to reduce near-duplicate questions while keeping topic coverage",
        "Shipped BYOK with AWS KMS envelope encryption plus Lambda + SQS + DLQ backend and Redis rate limiting",
      ],
    },
    {
      id: 2,
      name: "Rajawadu",
      description: "Full-stack e-commerce platform for a decade-old family business selling premium Mukhwas and traditional Indian mouth fresheners across India.",
      githubUrl: "",
      liveUrl: "https://rajawadu.com/",
      techStack: ["Next.js 15", "TypeScript", "Supabase", "Social Auth", "PayU", "AWS SQS", "Framer Motion"],
      keyFeatures: [
        "Developed and deployed a modern e-commerce site serving 100+ daily users with a fast, responsive UI",
        "Integrated PayU payment gateway with secure transaction handling and real-time webhook-based order verification",
        "Implemented real-time inventory management and a custom order tracking system, processing 200+ monthly orders",
        "Built robust auth and guest-checkout flows with Supabase Auth, plus structured-data SEO for Gujarat-based products",
      ],
    },
    {
      id: 3,
      name: "Blah",
      description: "Real-time video calling platform with an AI chatbot you can @mention mid-call, built on Agora's Access Token and RTM SDK.",
      githubUrl: "https://github.com/Divy97/blah-vc",
      liveUrl: "",
      techStack: ["Node.js", "Express", "Agora RTM SDK", "EJS", "OpenAI API", "Docker"],
      keyFeatures: [
        "Real-time video calling with meeting rooms",
        "AI chatbot integration using the OpenAI API",
        "Server-side rendering with EJS templates",
      ],
    },
    {
      id: 4,
      name: "Razon",
      description: "Privacy-focused social platform with enhanced anonymity that lets users post images and text anonymously.",
      githubUrl: "https://github.com/Divy97/razon",
      liveUrl: "",
      techStack: ["React", "WebSockets", "Express", "JWT", "Cloudinary", "Multer", "MongoDB", "AWS EC2"],
      keyFeatures: [
        "Anonymous posting with privacy features",
        "Real-time communication with an inbuilt chat system",
        "Interactive features: upvoting, downvoting, commenting",
      ],
    },
    {
      id: 5,
      name: "Sync",
      description: "Collaborative text editor with real-time editable documents inside dedicated rooms, and a resident AI that writes with you.",
      githubUrl: "https://github.com/Divy97/sync",
      liveUrl: "",
      techStack: ["React", "WebSockets", "Express", "Redis", "Vertex AI", "MongoDB", "AWS EC2"],
      keyFeatures: [
        "Real-time collaborative text editing",
        "Advanced text generation using Vertex AI",
        "Enhanced performance with Redis integration",
      ],
    },
  ],
  fun: [
    {
      id: 6,
      name: "Know Your Flags",
      description: "Lightweight Chrome extension that helps users learn and recognize world flags through a fast-paced, multiple-choice quiz.",
      githubUrl: "",
      liveUrl: "https://chromewebstore.google.com/detail/know-your-flags/aamhiceacpppgnpifniemfpojkcdhone",
      techStack: ["TypeScript", "HTML5", "CSS3", "D3.js", "Chrome Extension API", "WXT"],
      keyFeatures: [
        "Interactive Chrome quiz challenging users to identify flags from four randomized options",
        "Clean, minimal UI focused on fast, distraction-free gameplay",
        "Randomized flag generator and answer logic for continuous, varied quizzes",
        "No sign-up or onboarding friction — optimized for performance and accessibility",
      ],
    },
    {
      id: 8,
      name: "ChatPDF",
      description: "Web app that lets users chat with PDF documents through natural-language conversations, powered by Gemini and LangChain.",
      githubUrl: "https://github.com/Divy97/chatpdf",
      liveUrl: "",
      techStack: ["Streamlit", "Google Generative AI", "Python", "Flask", "LangChain", "FAISS", "Docker", "PyPDF2"],
      keyFeatures: [
        "AI-powered chat with PDFs using Google Gemini Pro and LangChain",
        "Semantic search with FAISS vector embeddings for context-aware retrieval across multiple PDFs",
        "Real-time chat with drag-and-drop batch uploads, intelligent chunking, and live Q&A",
        "Modular Flask + Streamlit architecture, containerized via Docker",
      ],
    },
    {
      id: 9,
      name: "zenTab",
      description: "Minimalistic cross-browser extension that blocks distracting websites during focused work sessions with domain-based filtering.",
      githubUrl: "https://github.com/Divy97/zentab",
      liveUrl: "https://chromewebstore.google.com/detail/zentab/abdgfdocampilhegaakgafjgcmcdblfg",
      techStack: ["TypeScript", "HTML5", "CSS3", "Chrome Extension API", "WXT"],
      keyFeatures: [
        "Cross-browser (Chrome & Firefox) site blocking during focus sessions",
        "Clean popup UI with real-time start, stop, extend, and reduce controls",
        "Session persistence and cross-tab monitoring across browser restarts",
        "Allow-list and block-list modes, packaged with WXT and automatic state recovery",
      ],
    },
    {
      id: 10,
      name: "CrowdFunding DApp",
      description: "Decentralized crowdfunding platform on Ethereum enabling transparent, trustless fundraising with smart-contract escrow.",
      githubUrl: "https://github.com/Divy97/crowdFunding",
      liveUrl: "",
      techStack: ["React", "Solidity", "Ethereum", "Ethers.js", "ThirdWeb SDK", "JavaScript"],
      keyFeatures: [
        "Trustless fundraising through Ethereum smart contracts, no intermediaries",
        "Secure donation flows with real-time transfers and escrow distribution",
        "ThirdWeb SDK for seamless Web3 wallet interactions (MetaMask & more)",
        "On-chain transparency handling 50+ testnet campaigns with visible milestones",
      ],
    },
    {
      id: 11,
      name: "Sorting Visualizer",
      description: "Interactive web app that visualizes sorting algorithms in real-time, showing how each technique works step-by-step.",
      githubUrl: "https://github.com/Divy97/React-sortingVisualizer",
      liveUrl: "https://www.youtube.com/watch?v=pxhmJybT6xU",
      techStack: ["React", "Redux", "Material-UI", "Jest"],
      keyFeatures: [
        "Animated, step-by-step visualization of multiple sorting algorithms",
        "Adjustable array size and speed controls",
        "Educational tool for understanding algorithm complexity",
      ],
    },
    {
      id: 12,
      name: "Activity Mind Mapper",
      description: "Chrome extension that tracks browsing activity in real-time and visualizes it as interactive mind maps for better digital habits.",
      githubUrl: "",
      liveUrl: "",
      techStack: ["TypeScript", "D3.js", "Chrome Extension API", "Chrome Storage API", "WXT"],
      keyFeatures: [
        "Real-time browsing behavior tracked and visualized as dynamic mind maps with D3.js",
        "Pomodoro-based Focus Mode with customizable site blocking and notifications",
        "10+ activity metrics with local data persistence via Chrome Storage API",
        "Privacy-first, Manifest V3-compliant architecture with no external data sharing",
      ],
    },
  ],
}

interface WorkEntry {
  role: string
  company: string
  url?: string
  dates: string
  where: string
  description: string
  tech: string[]
  achievements: string[]
}

const workData: WorkEntry[] = [
  {
    role: "Software Engineer",
    company: "Raftlabs",
    url: "https://raftlabs.com/",
    dates: "Aug 2024 — Present",
    where: "Remote",
    description: "Building billing systems, AI workflows, browser-extension features, and cloud infra for SaaS products — focused on backend systems and async processing.",
    tech: ["Next.js", "TypeScript", "Hasura", "GraphQL", "PostgreSQL", "AWS Lambda", "AWS SQS", "Stripe", "Docker", "WXT", "LangChain"],
    achievements: [
      "Built backend AI pipelines for YouTube, blog, X, news, and free-text inputs for a LinkedIn AI content platform (Draftly) used by 2K+ users",
      "Developed the Draftly browser extension with WXT, React, and Chrome/Firefox support for in-page LinkedIn AI features",
      "Built Stripe billing flows for checkout, subscriptions, invoices, renewals, coupons, and webhook reconciliation into PostgreSQL",
      "Developed HIPAA-aligned retention and offboarding: 7-year audit-log retention, tenant exports, S3 archival, scoped IAM, secure deletion across 50+ tables",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Crackube",
    dates: "Oct 2023 — Mar 2024",
    where: "Chennai, India",
    description: "Developed an edu-social website merging educational and social-media features.",
    tech: ["React", "JavaScript", "CSS3", "HTML5", "Node.js", "Express", "MongoDB"],
    achievements: [
      "Developed an edu-social website merging educational and social-media features",
      "Led the creation of a dynamic blog section, enabling students to write and earn within the platform",
    ],
  },
  {
    role: "Fullstack Developer Intern",
    company: "Sanghvi Infosoft",
    url: "https://sanghviinfo.com/",
    dates: "Jan 2023 — Jul 2023",
    where: "Ahmedabad, India",
    description: "Built JuniorGurukul, a game-based learning platform for children, with a focus on performance and interactivity.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    achievements: [
      "Developed an innovative game-based learning website for student education",
      "Implemented front-end optimizations resulting in measurably improved performance",
      "Created dynamic templates and drag-and-drop functionality",
    ],
  },
]

const skillGroups: { label: string; items: string[] }[] = [
  { label: "Frontend",     items: ["ReactJS", "Next.js", "TypeScript", "JavaScript", "WXT", "Python"] },
  { label: "Backend / API", items: ["Node.js", "Express", "GraphQL", "REST", "Hasura", "Stripe"] },
  { label: "AWS",          items: ["Lambda", "S3", "SQS", "KMS", "IAM"] },
  { label: "Databases",    items: ["PostgreSQL", "MongoDB", "Redis", "SQL"] },
  { label: "AI / LLM",     items: ["LangChain", "LangGraph", "LLM Pipelines", "Async Processing"] },
  { label: "Tooling",      items: ["Docker", "Prisma", "Git", "Vercel", "Sentry", "Postman"] },
]

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────

const W = {
  bg:      "var(--wall-bg, #e8eaec)",
  bgDeep:  "var(--wall-bg-deep, #d5d9dd)",
  card:    "var(--wall-card, #f7f8f9)",
  ink:     "var(--wall-ink, #15171a)",
  inkSoft: "var(--wall-ink-soft, #5a6068)",
  line:    "var(--wall-line, #c7ccd1)",
  accent:  "var(--wall-accent, oklch(0.62 0.18 28))",
} as const

// ─── WALL CSS (injected once) ─────────────────────────────────────────────────

const WALL_CSS = `
  :root {
    --wall-bg: #101113;
    --wall-bg-deep: #090a0c;
    --wall-card: #17181b;
    --wall-ink: #e8e5de;
    --wall-ink-soft: #8f939a;
    --wall-line: #2d3035;
    --wall-accent: oklch(0.70 0.19 28);
  }
  html, body { background: var(--wall-bg); }

  .wall {
    position: relative; width: 100%; min-height: 100vh;
    background: var(--wall-bg);
    font-family: var(--font-work-sans), "Inter", system-ui, sans-serif;
    color: var(--wall-ink);
    overflow-x: hidden;
  }
  .wall-inner { max-width: none; width: 100%; margin: 0; padding: 10px 4px 18px; }
  @media (min-width: 640px) { .wall-inner { padding: 12px 8px 28px; } }
  @media (min-width: 1024px){ .wall-inner { padding: 12px 12px 34px; } }

  .wserif { font-family: var(--font-instrument-serif), "EB Garamond", Georgia, serif; font-weight: 400; }
  .wmono  { font-family: var(--font-jetbrains-mono), ui-monospace, monospace; }

  /* Hero stage — interactive room where Miso + crosshair live */
  .hero-stage { position: relative; }

  /* Faint grid only behind the hero */
  .hero-stage::before {
    content: ""; position: absolute; inset: -24px -40px;
    pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(var(--wall-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--wall-line) 1px, transparent 1px);
    background-size: 80px 80px;
    opacity: .22;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, #000 35%, transparent 88%);
  }
  @media (min-width: 1024px){ .hero-stage::before { background-size: 120px 120px; } }

  /* Module grid — single column on mobile/tablet, 6-col editorial layout on desktop */
  .mgrid {
    display: grid; grid-template-columns: minmax(0, 1fr); gap: 4px; align-items: stretch;
  }
  @media (min-width: 640px)  { .mgrid { gap: 6px; } }
  @media (min-width: 1024px) {
    .mgrid { grid-template-columns: repeat(6, 1fr); gap: 6px; }
    .m-6 { grid-column: span 6; }
    .m-4 { grid-column: span 4; }
    .m-2 { grid-column: span 2; }
  }

  .module {
    position: relative;
    background: var(--wall-card);
    border: 1px solid var(--wall-line);
    transition: transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms, border-color 260ms, background-color .4s ease, color .4s ease;
    cursor: pointer; min-height: 132px; min-width: 0;
  }
  .module:hover {
    transform: translateY(-3px);
    box-shadow: 0 24px 40px -24px rgba(20,25,35,.25);
    border-color: var(--wall-ink); z-index: 5;
  }
  .module.flat { cursor: default; }
  .module.flat:hover { transform: none; box-shadow: none; border-color: var(--wall-line); }
  .card-inner { padding: 10px 8px; height: 100%; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
  @media (min-width: 640px){ .card-inner { padding: 12px 14px; } }

  .corner-mark { position: absolute; width: 8px; height: 8px; border: 1px solid var(--wall-ink); z-index: 2; }
  .corner-mark.tl { top: -4px; left: -4px; border-right: none; border-bottom: none; }
  .corner-mark.tr { top: -4px; right: -4px; border-left: none; border-bottom: none; }
  .corner-mark.bl { bottom: -4px; left: -4px; border-right: none; border-top: none; }
  .corner-mark.br { bottom: -4px; right: -4px; border-left: none; border-top: none; }

  .idx-label { font-family: var(--font-jetbrains-mono), monospace; font-size: 10px; letter-spacing: .18em; color: var(--wall-ink-soft); text-transform: uppercase; }
  .idx-num   { font-family: var(--font-jetbrains-mono), monospace; font-size: 10px; letter-spacing: .08em; color: var(--wall-accent); }

  .head-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; min-width: 0; }
  .head-row > * { min-width: 0; }
  .head-row .idx-label { text-align: right; overflow-wrap: anywhere; }
  @media (max-width: 420px) {
    .head-row { flex-direction: column; }
    .head-row .idx-label { text-align: left; }
  }

  /* GitHub graph squares */
  .gh-scroll { width: 100%; max-width: 100%; overflow: hidden; }
  .gh-grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, auto); grid-auto-columns: minmax(3px, 1fr); gap: 1px; width: 100%; }
  .gh-cell { width: 100%; aspect-ratio: 1; border-radius: 50%; }
  @media (min-width: 520px) {
    .gh-grid { grid-auto-columns: minmax(7px, 1fr); gap: 2px; }
  }
  @media (min-width: 900px) {
    .gh-grid { grid-auto-columns: minmax(11px, 1fr); }
  }

  /* Chips */
  .chip { font-family: var(--font-jetbrains-mono), monospace; font-size: 11px; padding: 4px 10px; border: 1px solid var(--wall-line); letter-spacing: .03em; color: var(--wall-ink); white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
  .chip-solid { background: var(--wall-accent); border-color: var(--wall-accent); color: #fff; }

  /* Modal */
  .wmodal-backdrop {
    position: fixed; inset: 0; background: rgba(20,25,35,0.62);
    backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 12px; animation: wfade .24s ease;
  }
  .wmodal {
    background: var(--wall-card); max-width: 680px; width: 100%; max-height: calc(100dvh - 24px);
    overflow: auto; padding: 44px 18px 24px; border: 1px solid var(--wall-ink);
    position: relative; animation: wrise .32s cubic-bezier(.2,.8,.2,1);
  }
  @media (min-width: 640px){ .wmodal { padding: 44px 48px; } }
  .wmodal.wide { max-width: 780px; }
  .wmodal-close {
    position: absolute; top: 14px; right: 16px;
    font-family: var(--font-jetbrains-mono), monospace; font-size: 11px;
    color: var(--wall-ink-soft); cursor: pointer; border: none; background: none;
    padding: 4px 6px; letter-spacing: .1em;
  }
  .wmodal-close:hover { color: var(--wall-ink); }
  .modal-split { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; min-width: 0; }
  .modal-split-main { min-width: 0; overflow-wrap: anywhere; }
  .modal-actions { display: flex; gap: 10px; flex-shrink: 0; color: var(--wall-ink-soft); }
  @media (max-width: 520px) {
    .modal-split { flex-direction: column; align-items: flex-start; gap: 8px; }
  }
  @keyframes wfade { from { opacity: 0 } to { opacity: 1 } }
  @keyframes wrise { from { transform: translateY(12px); opacity: 0 } to { transform: none; opacity: 1 } }

  .ticker-line { overflow: hidden; white-space: nowrap; }
  .ticker-line > span { display: inline-block; animation: tickerslide 38s linear infinite; }
  @keyframes tickerslide { from { transform: translateX(0) } to { transform: translateX(-50%) } }

  .spot-pulse { animation: spotpulse 1.4s ease-in-out infinite; }
  @keyframes spotpulse { 0%,100% { opacity: 1 } 50% { opacity: .3 } }

  .track-row { display: flex; gap: 14px; align-items: center; text-decoration: none; color: var(--wall-ink); padding: 10px 0; transition: opacity .2s; }
  .track-row:hover { opacity: .65; }
  .track-art { width: 46px; height: 46px; border: 1px solid var(--wall-line); object-fit: cover; flex-shrink: 0; background: var(--wall-bg-deep); }

  @keyframes misobubble { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; } }
  @keyframes misoheart {
    0%   { opacity: 0; transform: translate(0,0) rotate(0); }
    20%  { opacity: 1; }
    100% { opacity: 0; transform: translate(0, var(--dy, -40px)) rotate(var(--rot, 0)); }
  }
  @keyframes pawfade { from { opacity: .55 } to { opacity: 0 } }

  /* film grain over everything */
  .wall::after {
    content: ""; position: fixed; inset: -60%; pointer-events: none; z-index: 70;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: .07; animation: grain 9s steps(10) infinite;
  }
  @keyframes grain {
    0%,100% { transform: translate(0,0) } 10% { transform: translate(-3%,2%) } 20% { transform: translate(2%,-4%) }
    30% { transform: translate(-4%,-2%) } 40% { transform: translate(3%,4%) } 50% { transform: translate(-2%,3%) }
    60% { transform: translate(4%,-1%) } 70% { transform: translate(-3%,-3%) } 80% { transform: translate(1%,4%) } 90% { transform: translate(4%,2%) }
  }

  /* staggered module entrance */
  .module { animation: modin .7s cubic-bezier(.2,.8,.2,1) backwards; animation-delay: var(--d, 0ms); }
  @keyframes modin { from { opacity: 0; transform: translateY(18px) } }

  /* cursor spotlight inside cards */
  .module::after {
    content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; z-index: 1;
    transition: opacity .35s ease;
    background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--wall-accent) 12%, transparent), transparent 70%);
  }
  .module:hover::after { opacity: 1; }
  .module.flat:hover::after { opacity: 0; }

  /* hero line reveal + typewriter caret */
  .hero-line { display: block; overflow: hidden; }
  .hero-line > span { display: inline-block; animation: lineup .85s cubic-bezier(.2,.8,.2,1) backwards; }
  @keyframes lineup { from { transform: translateY(108%); opacity: .2 } }
  .tw-caret { display: inline-block; width: 3px; height: .95em; background: var(--wall-accent); vertical-align: -0.12em; margin-left: 3px; animation: caretblink 1.1s steps(1) infinite; }
  @keyframes caretblink { 50% { opacity: 0 } }

  /* status bar + colophon */
  .statusbar {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 4px 2px 12px; flex-wrap: wrap;
    font-family: var(--font-jetbrains-mono), monospace; font-size: 10px;
    letter-spacing: .14em; text-transform: uppercase; color: var(--wall-ink-soft);
  }
  .sb-group { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .sb-btn {
    border: 1px solid var(--wall-line); background: none; color: inherit; font: inherit;
    letter-spacing: .14em; text-transform: uppercase; padding: 4px 9px; cursor: pointer;
    min-height: 0; min-width: 0; transition: border-color .2s, color .2s;
  }
  .sb-btn:hover { border-color: var(--wall-ink); color: var(--wall-ink); }
  .sb-dot { width: 6px; height: 6px; border-radius: 50%; background: #34c97b; display: inline-block; animation: spotpulse 2.2s ease-in-out infinite; }
  .sb-only-m { display: none; }
  @media (max-width: 700px) { .sb-hide-m { display: none; } .sb-only-m { display: inline; } }

  /* plain-text, clickable menu link — no button chrome */
  .menu-link {
    border: none; background: none; color: inherit; font: inherit;
    letter-spacing: inherit; text-transform: inherit; padding: 0;
    cursor: pointer; min-height: 0; min-width: 0;
  }
  .menu-link:hover { color: var(--wall-ink); }
  .menu-link .ml-icon { color: var(--wall-accent); margin-right: 6px; }

  .colophon {
    display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
    padding: 16px 2px 4px; font-family: var(--font-jetbrains-mono), monospace;
    font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--wall-ink-soft);
  }
  .barcode { display: flex; align-items: flex-end; gap: 2px; height: 18px; }
  .barcode i { display: block; width: 2px; background: var(--wall-ink); opacity: .75; }

  /* command palette */
  .cmdk-backdrop {
    position: fixed; inset: 0; z-index: 1200; background: rgba(12,14,16,.55);
    backdrop-filter: blur(6px); display: flex; align-items: flex-start; justify-content: center;
    padding: 14vh 14px 0; animation: wfade .18s ease;
  }
  .cmdk { width: 100%; max-width: 540px; background: var(--wall-card); border: 1px solid var(--wall-ink); animation: wrise .25s cubic-bezier(.2,.8,.2,1); }
  .cmdk-input {
    width: 100%; border: none; outline: none; background: transparent;
    padding: 15px 18px; font-family: var(--font-jetbrains-mono), monospace; font-size: 13px;
    color: var(--wall-ink); border-bottom: 1px solid var(--wall-line); letter-spacing: .04em;
  }
  .cmdk-list { max-height: 320px; overflow: auto; padding: 6px 0; }
  .cmdk-item {
    display: flex; justify-content: space-between; align-items: center; gap: 12px;
    padding: 10px 18px; cursor: pointer;
    font-family: var(--font-jetbrains-mono), monospace; font-size: 12px; color: var(--wall-ink-soft);
  }
  .cmdk-item[data-active="true"] { background: color-mix(in oklab, var(--wall-accent) 9%, transparent); color: var(--wall-ink); }
  .cmdk-hint { font-size: 10px; letter-spacing: .12em; opacity: .7; }

  /* github cells pop in as a wave — desktop only; the staggered scale-in of
     ~370 cells flickers on mobile, so there they just render in place */
  @media (min-width: 700px) {
    .gh-cell { animation: ghin .45s ease backwards; }
  }
  @keyframes ghin { from { opacity: 0; transform: scale(.2) } }

  /* cursor miso — pops up at the pointer when you "meow" while scrolled down,
     then trails along behind the cursor */
  .cursor-miso {
    position: fixed; left: 0; top: 0; z-index: 80; pointer-events: none;
    transform: translate(-200px, -200px); opacity: 0;
    transition: transform .26s cubic-bezier(.2,.8,.3,1), opacity .3s ease;
  }
  .cursor-miso.show { opacity: 1; }
  .cursor-miso.show svg { animation: misopop .4s cubic-bezier(.2,1.5,.4,1) backwards; }
  @keyframes misopop { from { transform: scale(.3) translateY(10px) } }
  .pocket-bubble {
    position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 4px;
    background: var(--wall-card); color: var(--wall-ink); border: 1px solid var(--wall-ink);
    font-family: var(--font-instrument-serif), serif; font-style: italic; font-size: 15px;
    padding: 2px 11px; white-space: nowrap; border-radius: 13px; opacity: 0;
  }
  .cursor-miso.show .pocket-bubble { animation: misobubble .3s ease .12s forwards; }
`

// Rendered as a server-side <style> tag so the dark wall paints correctly
// on first load with no flash.
function WallStyles() {
  return <style id="wall-css" dangerouslySetInnerHTML={{ __html: WALL_CSS }} />
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

// ─── SMALL DELIGHTS ──────────────────────────────────────────────────────────

function Clock() {
  const [now, setNow] = useState('--:--:--')
  useEffect(() => {
    const f = () => setNow(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }))
    f()
    const id = setInterval(f, 1000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>ahmedabad {now} ist</span>
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#'

// Decodes from glyph soup to the real text on hover.
function ScrambleText({ text }: { text: string }) {
  const [out, setOut] = useState(text)
  const raf = useRef<number | null>(null)
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current) }, [])
  const start = () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    let frame = 0
    const run = () => {
      frame++
      const reveal = Math.floor(frame / 2)
      if (reveal >= text.length) { setOut(text); return }
      setOut(text.split('').map((ch, i) =>
        i < reveal || ch === ' ' ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      ).join(''))
      raf.current = requestAnimationFrame(run)
    }
    raf.current = requestAnimationFrame(run)
  }
  return <span onMouseEnter={start}>{out}</span>
}

const TAGLINES = [
  'Not a portfolio, exactly.',
  'A public diary with labeled drawers.',
  'Software engineer · poetry hoarder · cat observer.',
  'press ⌘k. or type "meow". your call.',
]

function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState('')
  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, alive = true
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!alive) return
      const p = phrases[pi]
      if (!deleting) {
        ci++
        setText(p.slice(0, ci))
        if (ci === p.length) { deleting = true; t = setTimeout(tick, 2600); return }
        t = setTimeout(tick, 40 + Math.random() * 55)
      } else {
        ci--
        setText(p.slice(0, ci))
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; t = setTimeout(tick, 450); return }
        t = setTimeout(tick, 22)
      }
    }
    t = setTimeout(tick, 800)
    return () => { alive = false; clearTimeout(t) }
  }, [phrases])
  return <>{text}<span className="tw-caret" /></>
}

// ─── COMMAND PALETTE (⌘K) ────────────────────────────────────────────────────

interface CmdAction { id: string; label: string; hint: string; run: () => void }

function CommandPalette({ open, onClose, actions }: { open: boolean; onClose: () => void; actions: CmdAction[] }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!open) return
    setQ(''); setIdx(0)
    const t = setTimeout(() => inputRef.current?.focus(), 20)
    return () => clearTimeout(t)
  }, [open])
  useEffect(() => { setIdx(0) }, [q])
  if (!open) return null
  const filtered = actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase()))
  const exec = (a: CmdAction) => { onClose(); a.run() }
  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef} className="cmdk-input" value={q} placeholder="type a command…"
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Escape') onClose()
            else if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)) }
            else if (e.key === 'Enter' && filtered[idx]) exec(filtered[idx])
          }}
        />
        <div className="cmdk-list">
          {filtered.map((a, i) => (
            <div key={a.id} className="cmdk-item" data-active={i === idx}
              onMouseEnter={() => setIdx(i)} onClick={() => exec(a)}>
              <span>{a.label}</span><span className="cmdk-hint">{a.hint}</span>
            </div>
          ))}
          {filtered.length === 0 && <div className="cmdk-item">nothing here. miso probably ate it.</div>}
        </div>
      </div>
    </div>
  )
}

interface SpotifyTrack {
  title: string
  artist: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  isPlaying?: boolean
}
interface SpotifyData {
  configured: boolean
  nowPlaying?: SpotifyTrack | null
  recent?: SpotifyTrack | null
  top?: SpotifyTrack[]
}

// Polls the server route for live listening data. Re-fetches every 30s
// (Spotify has no push). Returns null until the first response lands.
function useSpotify(): SpotifyData | null {
  const [data, setData] = useState<SpotifyData | null>(null)
  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch('/api/spotify')
        if (!res.ok) return
        const d: SpotifyData = await res.json()
        if (active) setData(d)
      } catch { /* keep last good / curated fallback */ }
    }
    load()
    const id = setInterval(load, 30_000)
    return () => { active = false; clearInterval(id) }
  }, [])
  return data
}

// ─── LINK ICONS ─────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

// ─── GITHUB GRAPH (wall-styled) ────────────────────────────────────────────────

interface ContributionDay { color: string; contributionCount: number; date: string }

function WallGitHubGraph({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([])
  const [total, setTotal] = useState(0)
  const [shown, setShown] = useState(0)
  const [state, setState] = useState<'loading' | 'error' | 'ok'>('loading')

  // Count the big number up from zero once data lands. The per-frame reflow
  // flickers on small screens, so there we just snap to the final total.
  useEffect(() => {
    if (state !== 'ok' || total === 0) return
    const small = typeof window !== 'undefined'
      && (window.matchMedia('(max-width: 700px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    if (small) { setShown(total); return }
    let raf = 0
    const t0 = performance.now()
    const dur = 1400
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setShown(Math.round(total * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [state, total])

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`)
        if (!res.ok) throw new Error('fetch failed')
        const data: { contributions: ContributionDay[][] } = await res.json()
        const today = new Date()
        const yearAgo = new Date()
        yearAgo.setFullYear(today.getFullYear() - 1)
        const filtered = data.contributions
          .map(week => week.filter(d => { const dt = new Date(d.date); return dt >= yearAgo && dt <= today }))
          .filter(week => week.length > 0)
        if (!active) return
        setWeeks(filtered)
        setTotal(filtered.reduce((t, wk) => t + wk.reduce((s, d) => s + d.contributionCount, 0), 0))
        setState('ok')
      } catch {
        if (active) setState('error')
      }
    })()
    return () => { active = false }
  }, [username])

  return (
    <div className="card-inner">
      <div className="head-row">
        <div className="idx-num">01 / github</div>
        <div className="idx-label"><ScrambleText text="last 12 months · the receipts" /></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
        <div className="wserif" style={{ fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {state === 'ok' ? shown.toLocaleString() : '—'}
          <span style={{ fontStyle: 'italic', color: W.accent }}> contributions</span>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
           className="wmono" style={{ fontSize: 12, color: W.ink, borderBottom: `1px solid ${W.ink}`, paddingBottom: 2, textDecoration: 'none', letterSpacing: '.04em' }}>
          @{username} →
        </a>
      </div>

      {state === 'loading' && (
        // eslint-disable-next-line @next/next/no-img-element
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <img src="/loader.svg" alt="loading" width={80} height={60} />
        </div>
      )}
      {state === 'ok' && (
        <div className="gh-scroll">
          <div className="gh-grid">
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <div key={`${wi}-${di}`} className="gh-cell"
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  style={{
                    background: day.contributionCount > 0 ? day.color : 'transparent',
                    border: `1px solid ${day.contributionCount > 0 ? 'transparent' : W.line}`,
                    gridRow: di + 1,
                    animationDelay: `${wi * 12}ms`,
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}
      {state === 'error' && (
        <div className="wmono" style={{ fontSize: 12, color: W.inkSoft }}>couldn&apos;t load the graph — github was shy today.</div>
      )}
    </div>
  )
}

// ─── MISO THE CAT ────────────────────────────────────────────────────────────

type CatMood = 'wander' | 'watch' | 'sit' | 'sleep' | 'love' | 'loaf' | 'play'

function MisoCat({ stageRef }: { stageRef: React.RefObject<HTMLDivElement | null> }) {
  const [pos, setPos]     = useState({ x: 900, y: 120 })
  const [facing, setFacing] = useState(-1)
  const [mood, setMood]   = useState<CatMood>('wander')
  const [blink, setBlink] = useState(false)
  const [bubble, setBubble] = useState<{ text: string; t: number } | null>(null)
  const [hearts, setHearts] = useState<{ id: number; dx: number; dy: number; rot: number }[]>([])
  const [paws, setPaws] = useState<{ id: number; x: number; y: number; a: number }[]>([])
  const lastPaw = useRef({ x: 900, y: 120 })
  const [breathe, setBreathe] = useState(0)

  const target   = useRef({ x: 900, y: 120 })
  const cursor   = useRef({ x: 0, y: 0, inside: false, vx: 0, vy: 0, lastX: 0, lastY: 0, t: 0 })
  const lastMove = useRef(Date.now())
  const raf      = useRef<number | null>(null)
  const moodRef  = useRef<CatMood>('wander')
  const posRef   = useRef({ x: 900, y: 120 })
  const sitSince = useRef(0)

  useEffect(() => { moodRef.current = mood }, [mood])
  useEffect(() => { posRef.current = pos }, [pos])

  const bounds = () => {
    const r = stageRef.current?.getBoundingClientRect()
    return { w: r?.width ?? 600, h: r?.height ?? 360 }
  }

  // Cursor tracking (relative to stage, 1:1)
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const el = stageRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const now = performance.now()
      const dt  = Math.max(1, now - cursor.current.t)
      cursor.current.vx = (x - cursor.current.lastX) / dt
      cursor.current.vy = (y - cursor.current.lastY) / dt
      cursor.current.lastX = x; cursor.current.lastY = y; cursor.current.t = now
      cursor.current.x = x; cursor.current.y = y
      cursor.current.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      lastMove.current = Date.now()
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [stageRef])

  // Wander target
  useEffect(() => {
    const pick = () => {
      const b = bounds()
      target.current = { x: 40 + Math.random() * (b.w - 100), y: 40 + Math.random() * (b.h - 100) }
    }
    pick()
    const id = setInterval(() => {
      if (moodRef.current === 'wander') {
        pick()
        if (Math.random() < 0.25) { setMood('loaf'); setTimeout(() => setMood('wander'), 4000) }
      }
    }, 6000)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Blink
  useEffect(() => {
    const id = setInterval(() => {
      if (moodRef.current === 'sleep' || moodRef.current === 'love') return
      setBlink(true); setTimeout(() => setBlink(false), 130)
      if (Math.random() < 0.25) setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 160) }, 260)
    }, 2800 + Math.random() * 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setBreathe(b => (b + 1) % 120), 16)
    return () => clearInterval(id)
  }, [])

  // Main loop
  useEffect(() => {
    let running = true
    const tick = () => {
      if (!running) return
      const now = Date.now(), idle = now - lastMove.current
      const c = cursor.current, p = posRef.current, m = moodRef.current
      const dist = c.inside ? Math.hypot(c.x - p.x, c.y - p.y) : 9999
      const cSpeed = Math.hypot(c.vx, c.vy)

      let next: CatMood = m
      if (m === 'love') { /* timer-controlled */ }
      else if (m === 'loaf') { if (c.inside && dist < 120) next = 'watch' }
      else if (c.inside && dist < 240 && cSpeed > 0.6) next = 'play'
      else if (c.inside && dist < 200) next = 'watch'
      else if (idle > 10000) next = 'sleep'
      else next = 'wander'

      let tx = p.x, ty = p.y
      if (next === 'watch') {
        const dx = c.x - p.x, dy = c.y - p.y, d = Math.hypot(dx, dy) || 1
        tx = c.x - (dx / d) * 90; ty = c.y - (dy / d) * 55
      } else if (next === 'play') { tx = c.x; ty = c.y + 16 }
      else if (next !== 'sleep' && next !== 'loaf' && next !== 'love') { tx = target.current.x; ty = target.current.y }

      setPos(prev => {
        const dx = tx - prev.x, dy = ty - prev.y, d = Math.hypot(dx, dy)
        const speed = next === 'play' ? 3.6 : next === 'watch' ? 2.2 : 1.2
        if (d < 2) { if (next === 'watch' && !sitSince.current) sitSince.current = Date.now(); return prev }
        sitSince.current = 0
        if (Math.abs(dx) > 2) setFacing(dx > 0 ? 1 : -1)
        return { x: prev.x + (dx / d) * Math.min(speed, d), y: prev.y + (dy / d) * Math.min(speed, d) }
      })

      // drop a fading paw print every few steps while moving
      const pp = posRef.current
      if ((next === 'wander' || next === 'watch' || next === 'play') &&
          Math.hypot(pp.x - lastPaw.current.x, pp.y - lastPaw.current.y) > 46) {
        const a = Math.atan2(pp.y - lastPaw.current.y, pp.x - lastPaw.current.x) * 180 / Math.PI
        lastPaw.current = { x: pp.x, y: pp.y }
        const id = now + Math.random()
        setPaws(ps => [...ps.slice(-9), { id, x: pp.x, y: pp.y + 24, a }])
        setTimeout(() => setPaws(ps => ps.filter(pw => pw.id !== id)), 2600)
      }

      if (next !== m) setMood(next)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { running = false; if (raf.current) cancelAnimationFrame(raf.current) }
  }, [])

  useEffect(() => {
    const lines      = ["mrow?","purr.","*stretches*","hi :3","*yawns*","blep","*tiny chirp*","mrrp!","hello friend","*tail swish*"]
    const sleepLines = ["zzz...","*tiny snore*","*dream twitch*"]
    const loveLines  = ["<3","purr purr","*melts*","best day ever","more pets pls"]
    const id = setInterval(() => {
      if (Math.random() > 0.45) return
      const pool = mood === 'sleep' ? sleepLines : mood === 'love' ? loveLines : lines
      setBubble({ text: pool[Math.floor(Math.random() * pool.length)], t: Date.now() })
    }, 5500)
    return () => clearInterval(id)
  }, [mood])

  useEffect(() => {
    if (!bubble) return
    const id = setTimeout(() => setBubble(null), 2400)
    return () => clearTimeout(id)
  }, [bubble])

  const celebrate = () => {
    setMood('love')
    const msgs = ["<3","purr!","*melts*","mrrp!","!!!","*chirp*"]
    setBubble({ text: msgs[Math.floor(Math.random() * msgs.length)], t: Date.now() })
    const burst = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i, dx: (Math.random() - 0.5) * 40, dy: -20 - Math.random() * 30, rot: (Math.random() - 0.5) * 40,
    }))
    setHearts(h => [...h, ...burst])
    setTimeout(() => setHearts(h => h.filter(x => !burst.find(b => b.id === x.id))), 1400)
    setTimeout(() => setMood('wander'), 2200)
  }
  const onPet = (e: React.MouseEvent) => { e.stopPropagation(); celebrate() }

  // Anyone (palette, "meow" easter egg) can ask for affection via this event.
  const celebrateRef = useRef(celebrate)
  celebrateRef.current = celebrate
  useEffect(() => {
    const h = () => celebrateRef.current()
    window.addEventListener('miso-love', h)
    return () => window.removeEventListener('miso-love', h)
  }, [])

  // Miso wears cream fur so she stays visible against the dark wall.
  const fur   = '#ece5d8'
  const feat  = '#262019'
  const pupil = '#ece5d8'
  const sleeping = mood === 'sleep', watching = mood === 'watch' || mood === 'play'
  const loafing  = mood === 'loaf',  loved = mood === 'love', playing = mood === 'play'
  const bScale   = 1 + Math.sin(breathe / 12) * 0.03
  const t = Date.now(), tailFreq = playing ? 140 : 260, tailSwing = Math.sin(t / tailFreq)
  const eyeDx = watching ? (cursor.current.x - pos.x > 0 ? 0.8 : -0.8) * facing : 0
  const eyeDy = watching ? (cursor.current.y - pos.y > 0 ? 0.6 : -0.6) : 0

  return (
    <>
    {paws.map(p => (
      <div key={p.id} style={{
        position: 'absolute', left: p.x, top: p.y, zIndex: 4, pointerEvents: 'none',
        transform: `translate(-6px,-6px) rotate(${p.a + 90}deg)`, animation: 'pawfade 2.6s ease-out forwards',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12">
          <ellipse cx="6" cy="8" rx="3" ry="2.4" fill={fur} />
          <circle cx="2.6" cy="4.4" r="1.1" fill={fur} />
          <circle cx="6" cy="3.6" r="1.1" fill={fur} />
          <circle cx="9.4" cy="4.4" r="1.1" fill={fur} />
        </svg>
      </div>
    ))}
    <div onClick={onPet}
      style={{
        position: 'absolute', left: pos.x, top: pos.y, width: 100, height: 80, zIndex: 6,
        transform: `translate(-50px, -50px) scaleX(${facing})`, transition: 'transform 200ms ease',
        cursor: 'pointer', pointerEvents: 'auto',
        filter: loved ? 'drop-shadow(0 0 8px rgba(255,120,150,.55))' : 'drop-shadow(0 4px 6px rgba(0,0,0,.15))',
      }}
      title="pet me!">
      <svg viewBox="0 0 100 80" width="100" height="80" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="miso-belly" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#d9c8b2" /><stop offset="100%" stopColor="#c2ab90" />
          </radialGradient>
        </defs>
        {!loafing && !sleeping && (
          <path d={`M 76 ${loved ? 48 : 50} Q ${88 + tailSwing * 6} ${38 + tailSwing * 4} ${80 + tailSwing * 3} ${26 + tailSwing * 3}`}
            stroke={fur} strokeWidth="7" fill="none" strokeLinecap="round" />
        )}
        <g transform={`translate(50 ${loafing ? 50 : sleeping ? 52 : 48}) scale(${sleeping ? bScale : 1})`}>
          {loafing ? <ellipse cx="0" cy="0" rx="30" ry="16" fill={fur} />
            : sleeping ? <ellipse cx="0" cy="0" rx="30" ry="18" fill={fur} />
            : <ellipse cx="0" cy="0" rx="26" ry="18" fill={fur} />}
          {!sleeping && !loafing && <ellipse cx="0" cy="4" rx="14" ry="10" fill="url(#miso-belly)" opacity="0.95" />}
          {sleeping && <ellipse cx="0" cy="2" rx="18" ry="10" fill="url(#miso-belly)" opacity="0.9" />}
        </g>
        {!sleeping && !loafing && !loved && (
          <g>
            <ellipse cx="34" cy="62" rx="5" ry="3.5" fill={fur} /><ellipse cx="46" cy="63" rx="5" ry="3.5" fill={fur} />
            <ellipse cx="56" cy="63" rx="5" ry="3.5" fill={fur} /><ellipse cx="68" cy="62" rx="5" ry="3.5" fill={fur} />
            <circle cx="34" cy="64" r="1.3" fill="#f4a8b8" /><circle cx="46" cy="65" r="1.3" fill="#f4a8b8" />
            <circle cx="56" cy="65" r="1.3" fill="#f4a8b8" /><circle cx="68" cy="64" r="1.3" fill="#f4a8b8" />
          </g>
        )}
        {loafing && (
          <g>
            <ellipse cx="32" cy="64" rx="4" ry="2.5" fill={fur} /><ellipse cx="68" cy="64" rx="4" ry="2.5" fill={fur} />
            <circle cx="32" cy="65" r="1" fill="#f4a8b8" /><circle cx="68" cy="65" r="1" fill="#f4a8b8" />
          </g>
        )}
        <g transform={`translate(${sleeping ? 36 : loafing ? 50 : 32}, ${sleeping ? 46 : loafing ? 38 : 28})`}>
          <path d={`M -2 8 L -6 ${playing ? -8 : -4} L 8 6 Z`} fill={fur} />
          <path d={`M 22 8 L 26 ${playing ? -8 : -4} L 12 6 Z`} fill={fur} />
          <path d="M -1 7 L -3 1 L 5 5 Z" fill="#f4a8b8" opacity="0.85" />
          <path d="M 21 7 L 23 1 L 15 5 Z" fill="#f4a8b8" opacity="0.85" />
          <circle cx="10" cy="12" r="14" fill={fur} />
          <circle cx="-1" cy="15" r="4.5" fill={fur} /><circle cx="21" cy="15" r="4.5" fill={fur} />
          <ellipse cx="10" cy="20" rx="5" ry="2.5" fill={feat} opacity="0.85" />
          {loved ? (
            <>
              <path d="M 4 12 C 4 10, 6 9, 7 11 C 8 9, 10 10, 10 12 C 10 14, 7 15, 7 15 C 7 15, 4 14, 4 12 Z" fill="#ff6b8a" />
              <path d="M 12 12 C 12 10, 14 9, 15 11 C 16 9, 18 10, 18 12 C 18 14, 15 15, 15 15 C 15 15, 12 14, 12 12 Z" fill="#ff6b8a" />
            </>
          ) : sleeping || loafing ? (
            <>
              <path d="M 4 11.5 Q 6.5 13.5 9 11.5" stroke={feat} strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M 11 11.5 Q 13.5 13.5 16 11.5" stroke={feat} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </>
          ) : blink ? (
            <>
              <line x1="3.5" y1="12" x2="8.5" y2="12" stroke={feat} strokeWidth="1.4" strokeLinecap="round" />
              <line x1="11.5" y1="12" x2="16.5" y2="12" stroke={feat} strokeWidth="1.4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="6.5" cy="12" rx="2.4" ry="2.8" fill={feat} /><ellipse cx="13.5" cy="12" rx="2.4" ry="2.8" fill={feat} />
              <ellipse cx={6.5 + eyeDx} cy={12 + eyeDy} rx="1.2" ry="1.6" fill={pupil} />
              <ellipse cx={13.5 + eyeDx} cy={12 + eyeDy} rx="1.2" ry="1.6" fill={pupil} />
              <circle cx={6 + eyeDx} cy={11 + eyeDy} r="0.5" fill="#fff" /><circle cx={13 + eyeDx} cy={11 + eyeDy} r="0.5" fill="#fff" />
            </>
          )}
          {!sleeping && (
            <>
              <ellipse cx="2" cy="16" rx="2.2" ry="1.2" fill="#f4a8b8" opacity="0.55" />
              <ellipse cx="18" cy="16" rx="2.2" ry="1.2" fill="#f4a8b8" opacity="0.55" />
            </>
          )}
          <path d="M 9 16 L 11 16 L 10 17.6 Z" fill="#f4a8b8" />
          {loved || playing ? (
            <path d="M 8 18 Q 10 20 12 18" stroke={feat} strokeWidth="1" fill="none" strokeLinecap="round" />
          ) : (
            <>
              <path d="M 10 17.6 Q 9 19 7.5 18.6" stroke={feat} strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <path d="M 10 17.6 Q 11 19 12.5 18.6" stroke={feat} strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </>
          )}
          <line x1="-4" y1="17" x2="2" y2="17.5" stroke={feat} strokeWidth="0.5" opacity="0.7" />
          <line x1="-4" y1="15" x2="2" y2="16" stroke={feat} strokeWidth="0.5" opacity="0.5" />
          <line x1="18" y1="17.5" x2="24" y2="17" stroke={feat} strokeWidth="0.5" opacity="0.7" />
          <line x1="18" y1="16" x2="24" y2="15" stroke={feat} strokeWidth="0.5" opacity="0.5" />
        </g>
        {sleeping && (
          <g transform="translate(72 24)">
            <text fontFamily="serif" fontSize="16" fill={fur} fontStyle="italic" opacity="0.8">z</text>
            <text x="8" y="-6" fontFamily="serif" fontSize="12" fill={fur} fontStyle="italic" opacity="0.55">z</text>
            <text x="14" y="-12" fontFamily="serif" fontSize="9" fill={fur} fontStyle="italic" opacity="0.35">z</text>
          </g>
        )}
        {loved && (
          <g>
            {([[-8,-6],[92,-4],[-6,40],[90,42]] as [number,number][]).map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx} ${cy})`} opacity="0.9">
                <path d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z" fill="#ffb347">
                  <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                </path>
              </g>
            ))}
          </g>
        )}
      </svg>
      {hearts.map(h => (
        <div key={h.id} style={{
          position: 'absolute', left: 50 + h.dx, top: 20, transform: `scaleX(${facing})`, pointerEvents: 'none',
          animation: 'misoheart 1.3s ease-out forwards', ['--dy' as string]: `${h.dy}px`, ['--rot' as string]: `${h.rot}deg`,
        }}>
          <svg width="20" height="18" viewBox="0 0 20 18">
            <path d="M 10 16 C 2 10, 2 4, 6 3 C 8 2.5, 10 4, 10 6 C 10 4, 12 2.5, 14 3 C 18 4, 18 10, 10 16 Z" fill="#ff6b8a" />
          </svg>
        </div>
      ))}
      {bubble && (
        <div style={{
          position: 'absolute', bottom: '100%', left: facing === 1 ? '55%' : '-70px', transform: `scaleX(${facing})`,
          background: 'var(--wall-card)', color: 'var(--wall-ink)', border: '1px solid var(--wall-ink)',
          fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 17,
          padding: '4px 12px', whiteSpace: 'nowrap', marginBottom: 10, animation: 'misobubble .24s ease', borderRadius: 14,
        }}>
          <span style={{ display: 'inline-block', transform: `scaleX(${facing})` }}>{bubble.text}</span>
        </div>
      )}
    </div>
    </>
  )
}

// ─── CURSOR MISO ──────────────────────────────────────────────────────────────
// When you "meow" (or pet via ⌘K) while the hero is scrolled out of view, a
// little Miso pops up at the pointer and trails along behind it, so you always
// see the reaction wherever you happen to be reading.

function CursorMiso({ stageRef }: { stageRef: React.RefObject<HTMLDivElement | null> }) {
  const [show, setShow] = useState(false)
  const [line, setLine] = useState('purr')
  const [hearts, setHearts] = useState<{ id: number; dx: number; dy: number; rot: number }[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
  const cur = useRef({ x: -200, y: -200 })
  const hideT = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track the pointer and keep the cat parked just above-right of it.
  useEffect(() => {
    const place = () => {
      if (boxRef.current) boxRef.current.style.transform = `translate(${cur.current.x + 12}px, ${cur.current.y - 104}px)`
    }
    const mv = (e: MouseEvent) => { cur.current = { x: e.clientX, y: e.clientY }; place() }
    window.addEventListener('mousemove', mv)
    return () => window.removeEventListener('mousemove', mv)
  }, [])

  useEffect(() => {
    const onLove = () => {
      // If the real Miso is on screen she already shows the love — stay hidden.
      const r = stageRef.current?.getBoundingClientRect()
      if (r && r.bottom > 90) return

      const lines = ['purr purr', 'mrrp!', '<3', 'best day ever', '*melts*', 'i heard that']
      setLine(lines[Math.floor(Math.random() * lines.length)])
      setShow(true)

      const burst = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i, dx: (Math.random() - 0.5) * 70, dy: -36 - Math.random() * 44, rot: (Math.random() - 0.5) * 55,
      }))
      setHearts(h => [...h, ...burst])
      setTimeout(() => setHearts(h => h.filter(x => !burst.find(b => b.id === x.id))), 1600)

      if (hideT.current) clearTimeout(hideT.current)
      hideT.current = setTimeout(() => setShow(false), 2800)
    }
    window.addEventListener('miso-love', onLove)
    return () => { window.removeEventListener('miso-love', onLove); if (hideT.current) clearTimeout(hideT.current) }
  }, [stageRef])

  return (
    <div ref={boxRef} className={`cursor-miso ${show ? 'show' : ''}`} aria-hidden>
      <div className="pocket-bubble">{line}</div>
      {hearts.map(h => (
        <div key={h.id} style={{
          position: 'absolute', left: 45 + h.dx, top: 8, pointerEvents: 'none',
          animation: 'misoheart 1.5s ease-out forwards', ['--dy' as string]: `${h.dy}px`, ['--rot' as string]: `${h.rot}deg`,
        }}>
          <svg width="20" height="18" viewBox="0 0 20 18">
            <path d="M 10 16 C 2 10, 2 4, 6 3 C 8 2.5, 10 4, 10 6 C 10 4, 12 2.5, 14 3 C 18 4, 18 10, 10 16 Z" fill="#ff6b8a" />
          </svg>
        </div>
      ))}
      <svg width="92" height="96" viewBox="0 0 92 96" style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.4))' }}>
        {/* ears */}
        <path d="M 22 40 L 16 14 L 40 30 Z" fill="#ece5d8" />
        <path d="M 70 40 L 76 14 L 52 30 Z" fill="#ece5d8" />
        <path d="M 23 35 L 20 21 L 33 30 Z" fill="#f4a8b8" opacity="0.8" />
        <path d="M 69 35 L 72 21 L 59 30 Z" fill="#f4a8b8" opacity="0.8" />
        {/* head */}
        <ellipse cx="46" cy="56" rx="32" ry="28" fill="#ece5d8" />
        {/* heart eyes */}
        <path d="M 32 50 C 32 46, 36 44, 38 48 C 40 44, 44 46, 44 50 C 44 54, 38 58, 38 58 C 38 58, 32 54, 32 50 Z" fill="#ff6b8a" />
        <path d="M 48 50 C 48 46, 52 44, 54 48 C 56 44, 60 46, 60 50 C 60 54, 54 58, 54 58 C 54 58, 48 54, 48 50 Z" fill="#ff6b8a" />
        {/* blush */}
        <ellipse cx="28" cy="60" rx="5" ry="3" fill="#f4a8b8" opacity="0.55" />
        <ellipse cx="64" cy="60" rx="5" ry="3" fill="#f4a8b8" opacity="0.55" />
        {/* nose + happy mouth */}
        <path d="M 44 60 L 48 60 L 46 63 Z" fill="#f4a8b8" />
        <path d="M 42 64 Q 46 68 50 64" stroke="#262019" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* whiskers */}
        <line x1="10" y1="58" x2="26" y2="60" stroke="#262019" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="64" x2="26" y2="64" stroke="#262019" strokeWidth="1" opacity="0.5" />
        <line x1="66" y1="60" x2="82" y2="58" stroke="#262019" strokeWidth="1" opacity="0.6" />
        <line x1="66" y1="64" x2="82" y2="64" stroke="#262019" strokeWidth="1" opacity="0.5" />
        {/* paws */}
        <ellipse cx="32" cy="86" rx="9" ry="7" fill="#ece5d8" />
        <ellipse cx="60" cy="86" rx="9" ry="7" fill="#ece5d8" />
      </svg>
    </div>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function WModal({ open, onClose, children, wide }: {
  open: boolean; onClose: () => void; children: React.ReactNode; wide?: boolean
}) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="wmodal-backdrop" onClick={onClose}>
      <div className={`wmodal ${wide ? 'wide' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="wmodal-close" onClick={onClose}>[ esc ]</button>
        {children}
      </div>
    </div>
  )
}

// ─── CARD (grid module) ─────────────────────────────────────────────────────

function Card({ span = '', onClick, children, dark, deep, flat, marks = true, delay = 0, openLabel }: {
  span?: string; onClick?: () => void; children: React.ReactNode
  dark?: boolean; deep?: boolean; flat?: boolean; marks?: boolean; delay?: number; openLabel?: string
}) {
  const style: React.CSSProperties = { ['--d' as string]: `${delay}ms` }
  if (dark) { style.background = W.ink; style.borderColor = W.ink; style.color = '#e8eaec' }
  else if (deep) { style.background = W.bgDeep }
  return (
    <div className={`module ${flat ? 'flat' : ''} ${span}`} onClick={onClick} style={style} data-open-label={openLabel}>
      {marks && (<><span className="corner-mark tl" /><span className="corner-mark tr" /><span className="corner-mark bl" /><span className="corner-mark br" /></>)}
      {children}
    </div>
  )
}

function ModHead({ num, label, light }: { num: string; label: string; light?: boolean }) {
  return (
    <div className="head-row">
      <div className="idx-num" style={light ? { color: W.accent } : undefined}>{num}</div>
      <div className="idx-label" style={light ? { color: 'rgba(232,234,236,.6)' } : undefined}><ScrambleText text={label} /></div>
    </div>
  )
}

// ─── SONGS (live Spotify + curated takes) ────────────────────────────────────

function TrackRow({ t }: { t: SpotifyTrack }) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {t.albumImageUrl
        ? <img className="track-art" src={t.albumImageUrl} alt="" width={46} height={46} />
        : <div className="track-art" />}
      <div style={{ minWidth: 0 }}>
        <div className="wserif" style={{ fontSize: 20, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
        <div className="wmono" style={{ fontSize: 11, color: W.inkSoft, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.artist}</div>
      </div>
    </>
  )
  return t.songUrl
    ? <a className="track-row" href={t.songUrl} target="_blank" rel="noreferrer">{inner}</a>
    : <div className="track-row" style={{ cursor: 'default' }}>{inner}</div>
}

function SongsModalBody({ spotify }: { spotify: SpotifyData | null }) {
  const live = spotify?.nowPlaying ?? spotify?.recent ?? null
  const playing = !!spotify?.nowPlaying?.isPlaying
  const top = spotify?.top ?? []
  return (
    <>
      <div className="idx-num" style={{ marginBottom: 6 }}>03 / on repeat</div>
      <div className="wserif" style={{ fontSize: 'clamp(36px,7vw,52px)', lineHeight: 1, marginBottom: 28, letterSpacing: '-.02em' }}>Songs.</div>

      {spotify === null && (
        // eslint-disable-next-line @next/next/no-img-element
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <img src="/loader.svg" alt="loading" width={80} height={60} />
        </div>
      )}

      {live && (
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${W.line}` }}>
          <div className="idx-label" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            {playing && <span className="spot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: W.accent, display: 'inline-block' }} />}
            <span style={{ color: playing ? W.accent : W.inkSoft }}>{playing ? 'now playing · live' : 'last played'}</span>
          </div>
          <TrackRow t={live} />
        </div>
      )}

      {top.length > 0 && (
        <div>
          <div className="idx-label" style={{ marginBottom: 6 }}>top this month · via spotify</div>
          {top.map((t, i) => <TrackRow key={i} t={t} />)}
        </div>
      )}
    </>
  )
}

// ─── JOURNAL MODAL BODY (daily writing: thoughts + poetry + notes + recs) ──────

function JournalModalBody() {
  const [tab, setTab] = useState<'thoughts' | 'poetry' | 'recs'>('thoughts')
  const tabs: { id: typeof tab; label: string }[] = [
    { id: 'thoughts', label: 'thoughts' },
    { id: 'poetry',    label: 'poetry' },
    { id: 'recs',     label: 'watching & reading' },
  ]
  return (
    <>
      <div className="idx-num" style={{ marginBottom: 6 }}>02 / journal</div>
      <div className="wserif" style={{ fontSize: 'clamp(36px,7vw,52px)', lineHeight: 1, marginBottom: 20, letterSpacing: '-.02em' }}>
        Things I write down.
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`chip ${tab === t.id ? 'chip-solid' : ''}`}
            style={{ cursor: 'pointer', textTransform: 'lowercase' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'thoughts' && C.thoughts.map((t, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: t.date ? '70px 1fr' : '1fr', gap: 16, padding: '16px 0', borderBottom: i < C.thoughts.length - 1 ? `1px solid ${W.line}` : 'none' }}>
          {t.date && <div className="wmono" style={{ fontSize: 11, color: W.accent, letterSpacing: '.08em', paddingTop: 4 }}>{t.date}</div>}
          <div className="wserif" style={{ fontSize: 'clamp(18px,3vw,22px)', lineHeight: 1.45, whiteSpace: 'pre-line' }}>{t.text}</div>
        </div>
      ))}

      {tab === 'poetry' && C.poetry.map((p, i) => (
        <div key={i} style={{ marginBottom: 32, paddingBottom: 24, borderBottom: i < C.poetry.length - 1 ? `1px solid ${W.line}` : 'none' }}>
          <div className="wserif" style={{ fontSize: 'clamp(18px,3vw,20px)', lineHeight: 1.75, whiteSpace: 'pre-line', marginBottom: 10 }}>{p.body}</div>
          <div className="wmono" style={{ fontSize: 12, color: W.inkSoft, letterSpacing: '.06em' }}>— {p.author}</div>
        </div>
      ))}

      {tab === 'recs' && (
        <>
          {C.movies.length > 0 && (
            <>
              <div className="idx-label" style={{ marginBottom: 4 }}>watching</div>
              {C.movies.map((m, i) => (
                <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${W.line}` }}>
                  <div className="wserif" style={{ fontSize: 24, lineHeight: 1.1 }}>{m.title} <span className="wmono" style={{ fontSize: 13, color: W.inkSoft, letterSpacing: '.08em' }}>({m.year})</span></div>
                  <div className="wserif" style={{ fontSize: 16, lineHeight: 1.55, marginTop: 8 }}>{m.take}</div>
                </div>
              ))}
            </>
          )}
          {C.books.length > 0 && (
            <>
              <div className="idx-label" style={{ margin: `${C.movies.length > 0 ? '24px' : '0'} 0 4px` }}>reading</div>
              {C.books.map((b, i) => (
                <div key={i} style={{ padding: '16px 0', borderBottom: i < C.books.length - 1 ? `1px solid ${W.line}` : 'none' }}>
                  <div className="wserif" style={{ fontSize: 24, lineHeight: 1.1 }}>{b.title} <span style={{ fontStyle: 'italic', color: W.inkSoft, fontSize: 17 }}>— {b.author}</span></div>
                  <div className="wserif" style={{ fontSize: 16, lineHeight: 1.55, marginTop: 8 }}>{b.take}</div>
                </div>
              ))}
            </>
          )}
          {C.movies.length === 0 && C.books.length === 0 && (
            <div className="wserif" style={{ fontSize: 18, color: W.inkSoft, fontStyle: 'italic', paddingTop: 8 }}>nothing here yet.</div>
          )}
        </>
      )}
    </>
  )
}

// ─── WORK MODAL BODY (projects + experience + stack) ─────────────────────────

function ProjectsModalBody() {
  const [tab, setTab] = useState<'serious' | 'fun' | 'work' | 'stack'>('serious')
  const tabs: { id: typeof tab; label: string }[] = [
    { id: 'serious', label: 'serious' },
    { id: 'fun',     label: 'fun' },
    { id: 'work',    label: 'experience' },
    { id: 'stack',   label: 'stack' },
  ]
  const isProjects = tab === 'serious' || tab === 'fun'
  return (
    <>
      <div className="idx-num" style={{ marginBottom: 6 }}>04 / work</div>
      <div className="wserif" style={{ fontSize: 'clamp(36px,7vw,52px)', lineHeight: 1, marginBottom: 20, letterSpacing: '-.02em' }}>
        Things I&apos;ve built.
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`chip ${tab === t.id ? 'chip-solid' : ''}`}
            style={{ cursor: 'pointer', textTransform: 'lowercase' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'stack' && skillGroups.map((g, i) => (
        <div key={g.label} style={{ padding: '16px 0', borderBottom: i < skillGroups.length - 1 ? `1px solid ${W.line}` : 'none' }}>
          <div className="idx-label" style={{ marginBottom: 10 }}>{g.label}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {g.items.map(it => <span key={it} className="chip">{it}</span>)}
          </div>
        </div>
      ))}

      {isProjects && projectsData[tab].map((p, i, arr) => (
        <div key={p.id} style={{ padding: '20px 0', borderBottom: i < arr.length - 1 ? `1px solid ${W.line}` : 'none' }}>
          <div className="modal-split" style={{ marginBottom: 8 }}>
            <div className="wserif modal-split-main" style={{ fontSize: 26, lineHeight: 1.1 }}>{p.name}</div>
            <div className="modal-actions">
              {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit' }} aria-label={`${p.name} GitHub`} onMouseEnter={e => (e.currentTarget.style.color = W.ink)} onMouseLeave={e => (e.currentTarget.style.color = W.inkSoft)}><GithubIcon /></a>}
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit' }} aria-label={`${p.name} live`} onMouseEnter={e => (e.currentTarget.style.color = W.ink)} onMouseLeave={e => (e.currentTarget.style.color = W.inkSoft)}><ExternalIcon /></a>}
            </div>
          </div>
          <div className="wserif" style={{ fontSize: 16, lineHeight: 1.55, marginBottom: 12 }}>{p.description}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {p.techStack.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {p.keyFeatures.map((f, fi) => (
              <li key={fi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: W.accent, marginTop: 8, flexShrink: 0 }} />
                <span className="wmono" style={{ fontSize: 12.5, lineHeight: 1.55, color: W.inkSoft }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {tab === 'work' && workData.map((w, i) => (
        <div key={i} style={{ padding: '20px 0', borderBottom: i < workData.length - 1 ? `1px solid ${W.line}` : 'none' }}>
          <div className="modal-split" style={{ marginBottom: 4 }}>
            <div className="wserif modal-split-main" style={{ fontSize: 24, lineHeight: 1.15 }}>
              {w.role} <span style={{ fontStyle: 'italic', color: W.inkSoft, fontSize: 18 }}>— {w.company}</span>
            </div>
            {w.url && <a href={w.url} target="_blank" rel="noreferrer" style={{ color: W.inkSoft, flexShrink: 0 }} aria-label={`${w.company} site`}><ExternalIcon /></a>}
          </div>
          <div className="wmono" style={{ fontSize: 11, color: W.accent, letterSpacing: '.06em', marginBottom: 10 }}>{w.dates} · {w.where}</div>
          <div className="wserif" style={{ fontSize: 16, lineHeight: 1.55, marginBottom: 12 }}>{w.description}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {w.tech.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {w.achievements.map((a, ai) => (
              <li key={ai} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: W.accent, marginTop: 8, flexShrink: 0 }} />
                <span className="wmono" style={{ fontSize: 12.5, lineHeight: 1.55, color: W.inkSoft }}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

// ─── WALL ──────────────────────────────────────────────────────────────────

function WallDesign() {
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading')
  const desktop = useIsDesktop()
  const spotify = useSpotify()
  const [open, setOpen] = useState<string | null>(null)
  const [palette, setPalette] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const vLineRef = useRef<HTMLDivElement>(null)
  const hLineRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('ready'), 1500)
    const t2 = setTimeout(() => setOpen('about'), 2100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Live listening — falls back to the first curated track until data lands.
  const liveTrack = spotify?.nowPlaying ?? spotify?.recent ?? null
  const isPlaying = !!spotify?.nowPlaying?.isPlaying
  const songTitle = liveTrack?.title ?? C.songs[0].title
  const songArtist = liveTrack?.artist ?? C.songs[0].artist
  const songStatus = isPlaying ? 'now playing' : liveTrack ? 'last played' : 'on repeat this month'
  const eqAnimate = isPlaying || !spotify?.configured
  const trackCount = spotify?.top?.length || C.songs.length

  // Surveying crosshair across the whole wall — direct DOM writes, zero re-renders.
  useEffect(() => {
    if (!desktop) return
    const mv = (e: MouseEvent) => {
      if (vLineRef.current) vLineRef.current.style.transform = `translateX(${e.clientX}px)`
      if (hLineRef.current) hLineRef.current.style.transform = `translateY(${e.clientY}px)`
      const tag = tagRef.current
      if (tag) {
        tag.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`
        const mod = (e.target as HTMLElement).closest?.('[data-open-label]') as HTMLElement | null
        tag.textContent = mod
          ? `open · ${mod.dataset.openLabel} ↵`
          : `[${String(Math.round(e.clientX)).padStart(4, '0')} · ${String(Math.round(e.clientY)).padStart(4, '0')}]`
        tag.style.color = mod ? 'var(--wall-accent)' : 'var(--wall-ink-soft)'
      }
    }
    window.addEventListener('mousemove', mv)
    return () => window.removeEventListener('mousemove', mv)
  }, [desktop])

  // Spotlight gradient tracks the cursor inside whichever module it's over.
  useEffect(() => {
    if (!desktop || phase !== 'ready') return
    const grid = gridRef.current
    if (!grid) return
    const mv = (e: MouseEvent) => {
      const mod = (e.target as HTMLElement).closest('.module') as HTMLElement | null
      if (!mod) return
      const r = mod.getBoundingClientRect()
      mod.style.setProperty('--mx', `${e.clientX - r.left}px`)
      mod.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    grid.addEventListener('mousemove', mv)
    return () => grid.removeEventListener('mousemove', mv)
  }, [desktop, phase])

  // ⌘K palette + the "meow" easter egg.
  useEffect(() => {
    let buf = ''
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p); return }
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-4)
        if (buf === 'meow') window.dispatchEvent(new Event('miso-love'))
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    console.log(
      '%c /\\_/\\\n( o.o )  curiosity logged.\n > ^ <   type "meow" anywhere on the page — miso will hear you.',
      'font-family: monospace; font-size: 13px; color: #c2410c;'
    )
  }, [])

  const ticker = C.thoughts.slice(0, 5).map(t => t.date ? `${t.date} — ${t.text}` : t.text).join('   ·   ')
  const eqHeights = [0.6, 0.9, 0.4, 1, 0.7, 0.5, 0.85, 0.35, 0.75, 0.6]
  const eqCss = eqHeights.map((v, i) => `@keyframes eq${i}{from{height:${v * 30}%}to{height:${v * 100}%}}`).join('')

  const actions: CmdAction[] = [
    { id: 'journal', label: 'open · journal — thoughts & poetry',  hint: '02', run: () => setOpen('journal') },
    { id: 'songs',   label: 'open · on repeat — live spotify',     hint: '03', run: () => setOpen('songs') },
    { id: 'work',    label: 'open · work — projects & experience', hint: '04', run: () => setOpen('projects') },
    { id: 'about',   label: 'open · about divy',                   hint: '05', run: () => setOpen('about') },
    { id: 'miso',    label: 'pet · miso the cat',                  hint: '=^.^=', run: () => window.dispatchEvent(new Event('miso-love')) },
    { id: 'email',   label: 'write · email me',                    hint: '06', run: () => { window.location.href = 'mailto:divyparekh1810@gmail.com' } },
    { id: 'github',  label: 'visit · github',                      hint: '↗', run: () => window.open('https://github.com/Divy097', '_blank') },
    { id: 'resume',  label: 'read · resume',                       hint: '↗', run: () => window.open('https://drive.google.com/file/d/16vW-vhHgcTgwvtTlTWnSxrxgZ6bI8VkG/view', '_blank') },
  ]

  if (phase === 'loading') return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--wall-bg, #101113)' }}>
      <WallStyles />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cat.gif" alt="loading" width={220} height={220}
        style={{ mixBlendMode: 'screen', filter: 'invert(1)' }} />
    </div>
  )

  return (
    <div className="wall">
      <WallStyles />
      <style>{eqCss}</style>
      <div className="wall-inner">
        {/* Status bar */}
        <header className="statusbar">
          <div className="sb-group">
            <span style={{ color: 'var(--wall-ink)' }}><ScrambleText text="divy parekh" /></span>
            <span className="sb-hide-m">— wall index v2.0</span>
          </div>
          <div className="sb-group">
            <span className="sb-hide-m" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="sb-dot" /> open to conversations
            </span>
            <span className="sb-hide-m"><Clock /></span>
            <button className="sb-btn sb-hide-m" onClick={() => setPalette(true)} aria-label="open command palette">⌘k</button>
          </div>
        </header>

        {/* Hero stage */}
        <section className="hero-stage" ref={stageRef}
          style={{ position: 'relative', marginBottom: 8 }}>
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="wserif" style={{ fontSize: 'clamp(24px, 7vw, 96px)', lineHeight: .98, letterSpacing: '-.03em', color: W.ink }}>
                <span className="hero-line"><span style={{ animationDelay: '.05s' }}>The Internet&apos;s not</span></span>
                <span className="hero-line"><span style={{ animationDelay: '.16s' }}>written in pencil, Mark.</span></span>
                <span className="hero-line"><span style={{ animationDelay: '.27s' }}>It&apos;s written in <span style={{ fontStyle: 'italic', color: W.accent }}>ink</span>.</span></span>
              </div>
              <div className="wserif" style={{ fontSize: 'clamp(14px, 1.8vw, 20px)', color: W.inkSoft, marginTop: 16, fontStyle: 'italic', minHeight: '1.6em' }}>
                <Typewriter phrases={TAGLINES} />
              </div>
            </div>
          </div>

          {desktop && <MisoCat stageRef={stageRef} />}
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: W.ink, marginBottom: 6 }} />

        {/* ── MODULE GRID (6) ── */}
        <div className="mgrid" ref={gridRef}>

          {/* 01 — GitHub graph */}
          <Card span="m-6" flat>
            <WallGitHubGraph username="divy97" />
          </Card>

          {/* 02 — Journal (daily writing) */}
          <Card span="m-4" delay={90} openLabel="journal" onClick={() => setOpen('journal')}>
            <div className="card-inner" style={{ justifyContent: 'space-between' }}>
              <ModHead num="02 / journal" label="thoughts · poetry" />
              <div className="wserif" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.12 }}>
                &ldquo;{C.thoughts[0].text}&rdquo;
              </div>
              <div className="ticker-line" style={{ fontSize: 11, color: W.inkSoft, borderTop: `1px solid ${W.line}`, paddingTop: 10 }}>
                <span className="wmono">{ticker}  ·  {ticker}  ·  </span>
              </div>
            </div>
          </Card>

          {/* 03 — Songs (live Spotify) */}
          <Card span="m-2" delay={180} openLabel="on repeat" onClick={() => setOpen('songs')}>
            <div className="card-inner" style={{ justifyContent: 'space-between' }}>
              <div>
                <ModHead num="03 / on repeat" label={`${trackCount} tracks`} />
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 38, marginTop: 14 }}>
                  {eqHeights.map((v, i) => (
                    <div key={i} style={{
                      width: 4, background: W.accent,
                      height: `${v * 100}%`,
                      animation: eqAnimate ? `eq${i} ${0.8 + (i % 4) * 0.2}s ease-in-out infinite alternate` : 'none',
                      opacity: eqAnimate ? 1 : 0.45,
                    }} />
                  ))}
                </div>
              </div>
              <div>
                <div className="wmono" style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: isPlaying ? W.accent : W.inkSoft, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isPlaying && <span className="spot-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: W.accent, display: 'inline-block' }} />}
                  {songStatus}
                </div>
                <div className="wserif" style={{ fontSize: 24, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{songTitle}</div>
                <div className="wmono" style={{ fontSize: 11, color: W.inkSoft, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>— {songArtist}</div>
              </div>
            </div>
          </Card>

          {/* 04 — Work (projects + experience + stack) */}
          <Card span="m-4" delay={270} openLabel="work index" onClick={() => setOpen('projects')} deep>
            <div className="card-inner" style={{ justifyContent: 'space-between' }}>
              <ModHead num="04 / work" label="projects · experience · stack" />
              <div className="wserif" style={{ fontSize: 'clamp(34px,5.5vw,52px)', lineHeight: .95, letterSpacing: '-.01em' }}>
                Built with code<br />
                <span style={{ fontStyle: 'italic', color: W.accent }}>and caffeine.</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {projectsData.serious.slice(0, 5).map(p => <span key={p.id} className="chip">{p.name}</span>)}
                <span className="chip" style={{ borderStyle: 'dashed', color: W.inkSoft }}>+ {projectsData.fun.length} more →</span>
              </div>
            </div>
          </Card>

          {/* 05 — About */}
          <Card span="m-2" delay={360} openLabel="about" onClick={() => setOpen('about')}>
            <div className="card-inner" style={{ justifyContent: 'space-between' }}>
              <ModHead num="05 / about" label="the person behind the index" />
              <div className="wserif" style={{ fontSize: 'clamp(22px,3vw,28px)', lineHeight: 1.25, color: W.ink }}>
                Software engineer. Occasional writer. Full-time cat observer.
              </div>Divy97
            </div>
          </Card>

          {/* 06 — Write to me */}
          <Card span="m-6" flat marks={false} delay={450}>
            <div className="card-inner" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div>
                <div className="idx-num" style={{ marginBottom: 10 }}>06 / write to me</div>
                <div className="wserif" style={{ fontSize: 'clamp(40px,6vw,56px)', lineHeight: 1, letterSpacing: '-.01em' }}>
                  Say <span style={{ fontStyle: 'italic', color: W.accent }}>hello.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }} className="wmono">
                <a href="mailto:divyparekh1810@gmail.com" style={{ fontSize: 13, color: W.ink, borderBottom: `1px solid ${W.ink}`, paddingBottom: 2, textDecoration: 'none', letterSpacing: '.04em' }}>email →</a>
                <a href="https://github.com/Divy097" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: W.ink, borderBottom: `1px solid ${W.ink}`, paddingBottom: 2, textDecoration: 'none', letterSpacing: '.04em' }}>github →</a>
                <a href="https://drive.google.com/file/d/16vW-vhHgcTgwvtTlTWnSxrxgZ6bI8VkG/view" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: W.ink, borderBottom: `1px solid ${W.ink}`, paddingBottom: 2, textDecoration: 'none', letterSpacing: '.04em' }}>resume →</a>
              </div>
            </div>
          </Card>
        </div>

        {/* Colophon */}
        <footer className="colophon">
          <span>© {new Date().getFullYear()} Divy Parekh</span>
          <div className="barcode" aria-hidden>
            {[3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3].map((w, i) => (
              <i key={i} style={{ width: w, height: `${8 + ((i * 5) % 10)}px` }} />
            ))}
          </div>
          <span className="sb-hide-m">type &ldquo;meow&rdquo; · press ⌘k</span>
          <button className="menu-link sb-only-m" onClick={() => setPalette(true)} aria-label="open menu">
            <span className="ml-icon">☰</span>menu
          </button>
        </footer>
      </div>

      {/* Crosshair survey lines (desktop) */}
      {desktop && (
        <>
          <div ref={hLineRef} style={{ position: 'fixed', left: 0, right: 0, top: 0, height: 1, background: 'var(--wall-line)', opacity: .5, pointerEvents: 'none', zIndex: 40, transform: 'translateY(-10px)' }} />
          <div ref={vLineRef} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: 1, background: 'var(--wall-line)', opacity: .5, pointerEvents: 'none', zIndex: 40, transform: 'translateX(-10px)' }} />
          <div ref={tagRef} className="wmono" style={{ position: 'fixed', left: 0, top: 0, fontSize: 10, letterSpacing: '.08em', color: 'var(--wall-ink-soft)', pointerEvents: 'none', zIndex: 41, transform: 'translate(-100px,-100px)' }} />
        </>
      )}

      <CursorMiso stageRef={stageRef} />

      <CommandPalette open={palette} onClose={() => setPalette(false)} actions={actions} />

      {/* ── MODALS (4) ── */}
      <WModal open={open === 'journal'} onClose={() => setOpen(null)} wide>
        <JournalModalBody />
      </WModal>

      <WModal open={open === 'songs'} onClose={() => setOpen(null)}>
        <SongsModalBody spotify={spotify} />
      </WModal>

      <WModal open={open === 'projects'} onClose={() => setOpen(null)} wide>
        <ProjectsModalBody />
      </WModal>

      <WModal open={open === 'about'} onClose={() => setOpen(null)}>
        <div className="idx-num" style={{ marginBottom: 6 }}>05 / about</div>
        <div className="wserif" style={{ fontSize: 'clamp(36px,7vw,52px)', lineHeight: 1, marginBottom: 28, letterSpacing: '-.02em' }}>Hi, I&apos;m Divy.</div>
        <div className="wserif" style={{ fontSize: 'clamp(19px,3vw,22px)', lineHeight: 1.7 }}>
          Nerdy introvert from Ahmedabad. I have spent most of my life happily alone in a room with a laptop and decent Wi-Fi — and I still think that is a perfectly valid Saturday.
          <br /><br />
          By day I am building AI-adjacent web things at Raftlabs. By night I am probably losing at chess, reading fiction or Urdu poetry, or very slowly learning Russian.
          <br /><br />
          Lately I have been thinking I might be missing out by not talking to more people. So this site is my version of saying hello. If you want to rant about something, trade cat videos, talk about a book, or just share your story — I am genuinely here for it.
          <br /><br />
          This index is the closest thing I have to a diary in public. Every drawer is labeled. Feel free to look around.
        </div>
      </WModal>
    </div>
  )
}

export default function Home() {
  return <WallDesign />
}
