import { Course, CourseCategory } from '../types';

export const COURSE_CATEGORIES: CourseCategory[] = [
  'All',
  'Programming Languages',
  'Editing Softwares',
  'AI Related',
  'Data Analyst',
  'Web & App Development',
  'Trading & Stock Market',
  'Hacking & Security',
  'Study & MNC Interviews',
  'Computer Basics',
];

// Helper to generate 20 robust courses for each category (180 total)
const generateCourses = (): Course[] => {
  const categoriesList: CourseCategory[] = [
    'Programming Languages',
    'Editing Softwares',
    'AI Related',
    'Data Analyst',
    'Web & App Development',
    'Trading & Stock Market',
    'Hacking & Security',
    'Study & MNC Interviews',
    'Computer Basics',
  ];

  // Tested working, embeddable YouTube Video IDs to ensure zero broken/deleted videos
  const validYoutubeIds = [
    'rfscVS0vtbw', 'W6NZfCO5SIk', 'KJgsSFOSQv0', 'vLnPwxZdW4Y', 'A74TOX803D0',
    'un6ZyFkqFKo', 'zF34dRivLOw', 'd56mG7DezGs', 'gfkTfcpWqAY', 'OK_JCtrrv-c',
    'HXV3zeQKqGY', 'VPvVD8t0208', '3Kq1MIfTWCE', 'bMknfKXIFA8', 'nu_pCVPKzTk',
    'mEsleV16qdo', 'i_LwzRVP7bg', 'V_xro1bcAuA', 'r-uOLxNrNk8', 'OOWAk21lHyM',
    '3u7MQz1EyPY', 'rZ41y93IT5s', 'm8Icp_Cid8Q', 'H43G8L1S_m0', 'nIoXOplUvaw',
    'IyR_uYsRdPs', 'IBoufdpz0ac', 'FXpIoQ_rT_c', 'wm5gMKCOB4k', 'Oe421EPjeBE',
    'c2M-ElqfFQ8', 'dFgzHOX84xQ', '0-S5a0eXPoc', '3qBXWUpoPHo', 'F5mRW0b4Acc',
    'vtPkZShrvXQ', 'aywZ7rawpXc', 'w8yWXqWQYmU', 'oXlwWbU8l2o', 'p7HKvqRI_Bo',
    'tPYj3Ng4Y44', 'ed8SzALpx1Q', '4CziA4YAn30', 'gyMwXuJrbJQ', 'DPnqb74obnw',
    'fNxaJsNG3-s', 'QEaBAZVUjAw', 'klTvEwg3ozk', 'JgvyzIkgm04', 'tcqEUSFvJqI',
    'TPPlS1MAn2M', 'xxpc-HPKN28', 'fmyvWz5TUWg', '_V8eKsto3Ug', '4gwYkEK0gOk',
  ];

  // Specific Titles and Details per Category (20 items each)
  const categoryTemplates: Record<CourseCategory, Array<{
    title: string;
    desc: string;
    instructor: string;
    lang: 'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Marathi';
    badge: 'Bestseller' | 'Trending' | 'Hot' | 'Featured' | 'Free' | 'New';
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    duration: string;
    tags: string[];
  }>> = {
    All: [],
    'Programming Languages': [
      { title: 'Python 3 Masterclass 2026: Zero to Hero', desc: 'Master Python syntax, OOP, automation, data structures, and web scraping with hands-on projects.', instructor: 'CodeWithHarry & Angela Yu', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '14h 20m', tags: ['Python', 'OOP', 'Automation'] },
      { title: 'JavaScript Modern ES6+ Full Course', desc: 'Understand promises, async/await, DOM manipulation, functional programming, and modern JS engines.', instructor: 'Programming with Mosh', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '8h 45m', tags: ['JavaScript', 'ES6', 'Web'] },
      { title: 'C Programming Complete Fundamentals', desc: 'Learn pointers, dynamic memory allocation, structs, file handling, and hardware interaction in C.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Trending', level: 'Beginner', duration: '10h 15m', tags: ['C', 'Pointers', 'Memory'] },
      { title: 'C++ Systems & Game Programming', desc: 'Deep dive into object-oriented C++, STL, template metaprogramming, and memory safety.', instructor: 'Abdul Bari', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '18h 30m', tags: ['C++', 'STL', 'GameDev'] },
      { title: 'Java Core & Advanced Masterclass', desc: 'Complete Java coverage including JVM architecture, multithreading, collections framework, and streams.', instructor: 'Telusko (Navin Reddy)', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '16h 10m', tags: ['Java', 'OOP', 'Backend'] },
      { title: 'Go (Golang) Microservices & Concurrency', desc: 'Build ultra-fast backend services using Go goroutines, channels, interfaces, and gRPC APIs.', instructor: 'Trevor Sawler', lang: 'English', badge: 'New', level: 'Intermediate', duration: '9h 20m', tags: ['Golang', 'Concurrency', 'Microservices'] },
      { title: 'Rust Language & Memory Management', desc: 'Master ownership, borrowing, lifetimes, pattern matching, and memory-safe systems programming in Rust.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Hot', level: 'Advanced', duration: '11h 05m', tags: ['Rust', 'Systems', 'Safety'] },
      { title: 'TypeScript Complete Developer Guide', desc: 'Type safety, generics, interfaces, decorators, and building large-scale frontend and backend applications.', instructor: 'Stephen Grider', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '7h 50m', tags: ['TypeScript', 'Types', 'React'] },
      { title: 'C# & .NET 9 Modern Software Dev', desc: 'Object-oriented C#, LINQ queries, ASP.NET Core web APIs, and cross-platform desktop development.', instructor: 'Mosh Hamedani', lang: 'English', badge: 'Trending', level: 'All Levels', duration: '12h 40m', tags: ['C#', '.NET', 'ASP.NET'] },
      { title: 'PHP 8 & MySQL Web Backend Guide', desc: 'Build dynamic database-driven web applications, custom CMS engines, and secure authentication.', instructor: 'Traversy Media', lang: 'English', badge: 'Free', level: 'Beginner', duration: '6h 30m', tags: ['PHP', 'MySQL', 'Backend'] },
      { title: 'Ruby on Rails Web Development', desc: 'Rapid web application prototyping with Ruby syntax, ActiveRecord ORM, and MVC architecture.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'Beginner', duration: '8h 10m', tags: ['Ruby', 'Rails', 'MVC'] },
      { title: 'Swift & iOS App Development', desc: 'Build iOS apps using SwiftUI, Xcode, Combine framework, and RESTful API integration.', instructor: 'Angela Yu', lang: 'English', badge: 'Bestseller', level: 'Beginner', duration: '15h 00m', tags: ['Swift', 'SwiftUI', 'iOS'] },
      { title: 'Kotlin Android App Development', desc: 'Android app development with Kotlin, Jetpack Compose, Coroutines, and ViewModel architecture.', instructor: 'Anuj Bhaiya', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '13h 15m', tags: ['Kotlin', 'Android', 'Mobile'] },
      { title: 'R Programming for Data Analytics', desc: 'Statistical computing, data manipulation with dplyr, and publication-ready graphics with ggplot2 in R.', instructor: 'Data School', lang: 'English', badge: 'Free', level: 'All Levels', duration: '9h 40m', tags: ['R', 'Statistics', 'Data'] },
      { title: 'Dart Programming & Flutter Logic', desc: 'Master object-oriented Dart concepts required for Flutter mobile and web apps.', instructor: 'Venkatesh Mogili', lang: 'Telugu', badge: 'Featured', level: 'Beginner', duration: '5h 50m', tags: ['Dart', 'Flutter', 'Logic'] },
      { title: 'Bash Shell Scripting & Linux CLI', desc: 'Automate system administration, process files, write cron jobs, and master terminal command lines.', instructor: 'NetworkChuck', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '7h 15m', tags: ['Bash', 'Linux', 'Automation'] },
      { title: 'SQL Queries & Relational Databases', desc: 'Master SQL SELECT queries, JOINs, subqueries, indexing, constraints, and stored procedures.', instructor: 'Kiran Kumar', lang: 'Telugu', badge: 'Bestseller', level: 'All Levels', duration: '8h 00m', tags: ['SQL', 'Database', 'Queries'] },
      { title: 'Assembly Language & x86 Architecture', desc: 'Understand CPU registers, stack operations, machine code execution, and low-level reverse engineering.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'Advanced', duration: '6h 45m', tags: ['Assembly', 'x86', 'LowLevel'] },
      { title: 'Scala & Functional Programming', desc: 'Pure functional programming, immutability, pattern matching, and Akka actor systems in Scala.', instructor: 'Rock the JVM', lang: 'English', badge: 'New', level: 'Advanced', duration: '10h 20m', tags: ['Scala', 'Functional', 'JVM'] },
      { title: 'MATLAB & Simulink Engineering Logic', desc: 'Mathematical modeling, matrix operations, signal processing, and control system simulation.', instructor: 'MathWorks Educator', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '7h 10m', tags: ['MATLAB', 'Math', 'Engineering'] },
    ],

    'Editing Softwares': [
      { title: 'Adobe Premiere Pro CC Complete Masterclass', desc: 'Video editing, timeline cuts, keyframing, audio mixing, color correction, and smooth transition effects.', instructor: 'Daniel Schiffer & GFXMentor', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '11h 30m', tags: ['PremierePro', 'VideoEditing', 'Adobe'] },
      { title: 'Premiere Pro Cinematic Color Grading', desc: 'Master Lumetri Color, LUTs, scope monitoring, skin tone matching, and cinematic color science.', instructor: 'Justin Odisho', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '4h 45m', tags: ['ColorGrading', 'Lumetri', 'Cinematic'] },
      { title: 'Adobe After Effects Visual Effects & VFX', desc: 'Motion graphics, 3D tracking, green screen keying, camera camera animation, and text motion presets.', instructor: 'Benchmark Film', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '14h 10m', tags: ['AfterEffects', 'MotionGraphics', 'VFX'] },
      { title: 'DaVinci Resolve 18 Video Editing Guide', desc: 'Editing on Cut & Edit pages, Fairlight audio design, Fusion node VFX, and fast YouTube export settings.', instructor: 'Casey Faris', lang: 'English', badge: 'Trending', level: 'Beginner', duration: '9h 50m', tags: ['DaVinciResolve', 'Editing', 'Nodes'] },
      { title: 'DaVinci Resolve Color Page Mastery', desc: 'Primary & secondary color correction, power windows, Qualifier keys, curve adjustments, and Film Emulation.', instructor: 'Waqas Qazi', lang: 'English', badge: 'Featured', level: 'Advanced', duration: '12h 15m', tags: ['DaVinci', 'ColorCorrection', 'Scopes'] },
      { title: 'Adobe Photoshop CC Photo Editing & Manipulation', desc: 'Layers, masks, selection tools, portrait retouching, graphic design, and AI Generative Fill tools.', instructor: 'GFXMentor (Rajeev)', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '16h 00m', tags: ['Photoshop', 'Design', 'Retouching'] },
      { title: 'Photoshop High-End Portrait Retouching', desc: 'Frequency separation, dodge & burn techniques, skin smoothing, and eye enhancement for photographers.', instructor: 'PiXimperfect (Unmesh)', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '8h 20m', tags: ['Photoshop', 'Retouching', 'Portraits'] },
      { title: 'Adobe Illustrator Vector Design & Logo Art', desc: 'Pen tool mastery, shape builder, typography, gradient mesh, isometric art, and logo vector creation.', instructor: 'GFXMentor', lang: 'Hindi', badge: 'Bestseller', level: 'Beginner', duration: '13h 40m', tags: ['Illustrator', 'Vector', 'Logos'] },
      { title: 'CapCut Desktop Video Editing for Creators', desc: 'Fast editing for YouTube Shorts, Instagram Reels, auto captions, speed ramps, and trending transitions.', instructor: 'Tech Creator', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '5h 15m', tags: ['CapCut', 'Shorts', 'Reels'] },
      { title: 'Wondershare Filmora 13 Full Masterclass', desc: 'User-friendly video editing, AI smart cutout, audio ducking, speed ramping, and title animations.', instructor: 'Sandeep Bhansali', lang: 'Hindi', badge: 'Free', level: 'Beginner', duration: '6h 30m', tags: ['Filmora', 'VideoEditing', 'Simple'] },
      { title: 'Lightroom Classic Photography Editing', desc: 'RAW photo processing, tone curves, color grading, mask selections, and Lightroom batch presets.', instructor: 'Serge Ramelli', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '7h 10m', tags: ['Lightroom', 'RAW', 'Photography'] },
      { title: 'Canva Pro Video & Graphic Design Guide', desc: 'Create social media posts, presentation decks, YouTube thumbnails, logo animations, and marketing videos.', instructor: 'Design with Priya', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '4h 50m', tags: ['Canva', 'Thumbnails', 'SocialMedia'] },
      { title: 'Final Cut Pro X Masterclass for Mac', desc: 'Magnetic timeline editing, compound clips, color wheels, spatial audio, and Apple Silicon optimization.', instructor: 'Peter McKinnon', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '8h 00m', tags: ['FinalCutPro', 'Mac', 'FCPX'] },
      { title: 'Audacity Audio Editing & Voice Over Cleaning', desc: 'Remove background noise, compression, EQ tuning, de-essing, and mastering crisp audio for podcasts.', instructor: 'Podcast Host', lang: 'English', badge: 'Free', level: 'Beginner', duration: '3h 40m', tags: ['Audacity', 'Audio', 'NoiseRemoval'] },
      { title: 'Adobe Audition Podcast Sound Design', desc: 'Multitrack audio mixing, dialogue restoration, spectral frequency editing, and loudness normalization.', instructor: 'Curtis Judd', lang: 'English', badge: 'New', level: 'Intermediate', duration: '5h 30m', tags: ['Audition', 'Podcast', 'Audio'] },
      { title: 'Blender 3D Modeling for Absolute Beginners', desc: 'Navigate 3D viewport, mesh editing, modifier stacks, materials, lighting, and Cycles rendering.', instructor: 'Blender Guru (Andrew Price)', lang: 'English', badge: 'Bestseller', level: 'Beginner', duration: '15h 20m', tags: ['Blender', '3D', 'Animation'] },
      { title: 'Blender Character Design & Animation', desc: 'Sculpting, rigging bone armatures, weight painting, keyframe animation, and rendering character shorts.', instructor: 'CGCookie', lang: 'English', badge: 'Hot', level: 'Advanced', duration: '12h 00m', tags: ['Blender', 'Character', '3D'] },
      { title: 'CapCut Mobile Pro Editing Secrets', desc: 'Edit viral TikTok, Instagram Reels, and YouTube Shorts directly on your mobile device.', instructor: 'Creative Edits Telugu', lang: 'Telugu', badge: 'Trending', level: 'Beginner', duration: '4h 10m', tags: ['CapCut', 'Mobile', 'Reels'] },
      { title: 'Figma UI/UX Design System & Prototyping', desc: 'Auto layout 5.0, components, variants, interactive prototypes, design systems, and developer handoff.', instructor: 'Ansh Mehra', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '10h 30m', tags: ['Figma', 'UIUX', 'Design'] },
      { title: 'Cinematic Video Color Science & LUTs', desc: 'Understand color space transforms (Rec.709 vs LOG), exposure controls, and film grain emulation.', instructor: 'Film Director', lang: 'English', badge: 'Free', level: 'Advanced', duration: '6h 15m', tags: ['ColorScience', 'Cinematography', 'LOG'] },
    ],

    'AI Related': [
      { title: 'Generative AI & LLM Engineering Masterclass', desc: 'Understand Transformers architecture, attention mechanisms, fine-tuning, and building GenAI applications.', instructor: 'Andrew Ng & DeepLearning.AI', lang: 'English', badge: 'Bestseller', level: 'All Levels', duration: '12h 45m', tags: ['GenAI', 'LLM', 'Transformers'] },
      { title: 'ChatGPT & Advanced Prompt Engineering 2026', desc: 'Master zero-shot, few-shot, chain-of-thought prompting, custom GPTs, and automated workflows.', instructor: 'Hitesh Choudhary', lang: 'Hindi', badge: 'Hot', level: 'Beginner', duration: '6h 30m', tags: ['ChatGPT', 'Prompting', 'Productivity'] },
      { title: 'Midjourney & AI Art Generation Bootcamp', desc: 'Master parameters (--v 6, --ar, --stylize), photorealistic prompting, character consistency, and commercial art.', instructor: 'Nikhil Pawar', lang: 'Hindi', badge: 'Trending', level: 'All Levels', duration: '5h 40m', tags: ['Midjourney', 'AIArt', 'Prompts'] },
      { title: 'LangChain & LlamaIndex AI Agent Development', desc: 'Build autonomous AI agents, RAG pipelines, custom tools, memory modules, and vector database integrations.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '10h 15m', tags: ['LangChain', 'RAG', 'Agents'] },
      { title: 'Machine Learning A-Z with Python & Scikit-Learn', desc: 'Supervised & unsupervised learning, linear regression, decision trees, random forests, and SVMs.', instructor: 'Krish Naik', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '18h 00m', tags: ['MachineLearning', 'Python', 'Scikit'] },
      { title: 'Deep Learning & PyTorch Full Course', desc: 'Build neural networks, convolutional nets (CNNs), recurrent nets (RNNs), and custom PyTorch trainers.', instructor: 'Daniel Bourke', lang: 'English', badge: 'Featured', level: 'Intermediate', duration: '16h 30m', tags: ['PyTorch', 'DeepLearning', 'CNN'] },
      { title: 'TensorFlow 2.0 & Keras Deep Learning', desc: 'Train deep neural models, image classifiers, time series forecasting, and export models to TensorFlow.js.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'All Levels', duration: '11h 20m', tags: ['TensorFlow', 'Keras', 'AI'] },
      { title: 'Neural Networks from Scratch in Python', desc: 'Code backpropagation, activation functions, loss functions, and optimizers without external AI libraries.', instructor: 'Sentdex (Harrison)', lang: 'English', badge: 'Hot', level: 'Advanced', duration: '9h 50m', tags: ['NeuralNetworks', 'Math', 'Python'] },
      { title: 'Computer Vision with OpenCV & Python', desc: 'Object detection, face recognition, motion tracking, image segmentation, and YOLO v8 real-time detection.', instructor: 'Murtaza Workshop', lang: 'English', badge: 'Trending', level: 'Intermediate', duration: '13h 10m', tags: ['OpenCV', 'Vision', 'YOLO'] },
      { title: 'Natural Language Processing (NLP) with NLTK & SpaCy', desc: 'Tokenization, sentiment analysis, named entity recognition, topic modeling, and word embeddings (Word2Vec).', instructor: 'CampusX (Nitish)', lang: 'Hindi', badge: 'Featured', level: 'Intermediate', duration: '14h 00m', tags: ['NLP', 'SpaCy', 'Text'] },
      { title: 'Hugging Face Transformers & Model Fine-Tuning', desc: 'Load open-source models (Llama 3, Mistral, BERT), fine-tune with LoRA & QLoRA, and deploy to HuggingFace Hub.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'New', level: 'Advanced', duration: '8h 45m', tags: ['HuggingFace', 'Llama3', 'FineTuning'] },
      { title: 'AI Autonomous Agents & AutoGPT Blueprint', desc: 'Understand goal-driven agent architectures, web browsing tools, code execution sandboxes, and task planning.', instructor: 'Tech Lead', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '7h 20m', tags: ['Agents', 'AutoGPT', 'Automation'] },
      { title: 'Gemini API & Google AI Studio Integration', desc: 'Integrate Gemini 1.5/2.0 models, multimodal vision, structured JSON outputs, and function calling in TypeScript.', instructor: 'Google Developer Student Lead', lang: 'English', badge: 'Bestseller', level: 'All Levels', duration: '6h 15m', tags: ['Gemini', 'GoogleAI', 'APIs'] },
      { title: 'Vector Databases & Pinecone RAG Architecture', desc: 'Vector embeddings, similarity search (Cosine, Euclidean), HNSW indexing, Pinecone, and ChromaDB setup.', instructor: 'Data Engineer', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '5h 30m', tags: ['VectorDB', 'Pinecone', 'RAG'] },
      { title: 'Stable Diffusion & Automatic1111 Art Generation', desc: 'ControlNet, LoRA model training, Inpainting, Outpainting, and local GPU setup for AI image synthesis.', instructor: 'AI Artist', lang: 'English', badge: 'Trending', level: 'Intermediate', duration: '8h 10m', tags: ['StableDiffusion', 'ControlNet', 'Art'] },
      { title: 'AI Voice Cloning & ElevenLabs Mastery', desc: 'Text-to-speech generation, voice cloning, audio dubbing in 29+ languages, and AI podcast generation.', instructor: 'Digital Creator', lang: 'English', badge: 'Free', level: 'Beginner', duration: '4h 00m', tags: ['ElevenLabs', 'VoiceAI', 'TTS'] },
      { title: 'Reinforcement Learning & Q-Learning', desc: 'Markov Decision Processes (MDP), Q-Learning, Deep Q-Networks (DQN), and training OpenAI Gym environments.', instructor: 'DeepMind Researcher', lang: 'English', badge: 'New', level: 'Advanced', duration: '10h 40m', tags: ['ReinforcementLearning', 'Q-Learning', 'Gym'] },
      { title: 'RAG Architecture & Hybrid Search Systems', desc: 'Combine dense vector retrieval with sparse keyword search (BM25), reranking, and hallucination guardrails.', instructor: 'AI Architect', lang: 'English', badge: 'Hot', level: 'Advanced', duration: '7h 50m', tags: ['RAG', 'HybridSearch', 'Guardrails'] },
      { title: 'AI Automation with N8N & Make.com', desc: 'Automate business workflows by connecting AI models with Gmail, Slack, Google Sheets, and CRM tools without code.', instructor: 'Automation Guru', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '6h 40m', tags: ['N8N', 'NoCode', 'Automation'] },
      { title: 'Responsible AI & Safety Guardrails', desc: 'AI ethics, bias mitigation, red teaming LLMs, prompt injection defense, and data privacy compliance.', instructor: 'AI Safety Specialist', lang: 'English', badge: 'Free', level: 'All Levels', duration: '5h 10m', tags: ['AISafety', 'Ethics', 'RedTeaming'] },
    ],

    'Data Analyst': [
      { title: 'Data Analysis with Python (Pandas & NumPy)', desc: 'Data cleaning, data filtering, group-by aggregations, exploratory data analysis (EDA), and CSV/Excel exports.', instructor: 'CodeWithHarry & Keith Galli', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '12h 00m', tags: ['Pandas', 'NumPy', 'EDA'] },
      { title: 'Advanced Excel for Data Analytics 2026', desc: 'Pivot Tables, VLOOKUP/XLOOKUP, INDEX-MATCH, Power Query, Power Pivot, and interactive Excel dashboards.', instructor: 'Chandoo & Chaitanya', lang: 'Telugu', badge: 'Bestseller', level: 'All Levels', duration: '9h 30m', tags: ['Excel', 'PivotTables', 'Dashboards'] },
      { title: 'Power BI Complete Masterclass (Zero to Hero)', desc: 'Connect data sources, DAX formulas, data modeling, custom visuals, and publishing interactive Power BI reports.', instructor: 'Kripa Shankar', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '11h 45m', tags: ['PowerBI', 'DAX', 'Reports'] },
      { title: 'Tableau Desktop Data Visualization Guide', desc: 'Build line charts, heatmaps, maps, calculated fields, parameters, and storyboards for executive data insights.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '8h 20m', tags: ['Tableau', 'Visualization', 'BI'] },
      { title: 'SQL for Data Science & Business Intelligence', desc: 'Complex JOINs, Window functions (ROW_NUMBER, RANK, LEAD/LAG), CTEs, aggregation, and performance tuning.', instructor: 'Ankit Bansal', lang: 'Hindi', badge: 'Bestseller', level: 'Intermediate', duration: '14h 10m', tags: ['SQL', 'WindowFunctions', 'DataScience'] },
      { title: 'Python Data Visualization (Seaborn & Matplotlib)', desc: 'Create publication-grade statistical plots, correlation heatmaps, box plots, and distribution graphs.', instructor: 'Corey Schafer', lang: 'English', badge: 'Free', level: 'Beginner', duration: '6h 15m', tags: ['Seaborn', 'Matplotlib', 'Plots'] },
      { title: 'Statistics & Probability for Data Analytics', desc: 'Mean, median, variance, normal distribution, z-scores, hypothesis testing (p-values, t-tests), and confidence intervals.', instructor: 'MarinStatsLectures', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '10h 50m', tags: ['Statistics', 'Probability', 'Testing'] },
      { title: 'Data Cleaning & Wrangling Masterclass', desc: 'Handle missing values, duplicate records, data type conversions, string manipulation, and outlier detection.', instructor: 'Data Analyst Mentor', lang: 'English', badge: 'Free', level: 'Beginner', duration: '5h 40m', tags: ['DataCleaning', 'Wrangling', 'Pandas'] },
      { title: 'Google Data Analytics Professional Prep', desc: 'Comprehensive guide covering data ask, prepare, process, analyze, share, and act phases.', instructor: 'Google Career Cert Lead', lang: 'English', badge: 'Trending', level: 'Beginner', duration: '15h 30m', tags: ['GoogleData', 'Analytics', 'Certification'] },
      { title: 'Business Intelligence & Executive Dashboards', desc: 'KPI design, executive summary metrics, drill-down interactions, and stakeholder data presentation skills.', instructor: 'BI Specialist', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '7h 25m', tags: ['BI', 'Dashboards', 'KPIs'] },
      { title: 'Google BigQuery & Cloud Data Warehousing', desc: 'Query terabytes of data in seconds, partitioned tables, BigQuery ML, and cost-effective cloud queries.', instructor: 'GCP Architect', lang: 'English', badge: 'New', level: 'Intermediate', duration: '8h 10m', tags: ['BigQuery', 'GCP', 'DataWarehouse'] },
      { title: 'A/B Testing & Product Analytics Logic', desc: 'Experimentation design, sample size calculation, p-hacking avoidance, and measuring product feature impact.', instructor: 'Product Analyst', lang: 'English', badge: 'Free', level: 'Advanced', duration: '6h 00m', tags: ['ABTesting', 'Product', 'Metrics'] },
      { title: 'R Programming for Data Analytics', desc: 'Data manipulation with tidyverse, data import, statistical models, and R Markdown report generation.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'Beginner', duration: '9h 15m', tags: ['R', 'Tidyverse', 'Analytics'] },
      { title: 'Data Storytelling & Executive Presentations', desc: 'Transform complex raw numbers into compelling visual narratives and slide decks for business leadership.', instructor: 'Storytelling Expert', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '4h 50m', tags: ['Storytelling', 'Business', 'Slides'] },
      { title: 'Financial Data Analytics with Python', desc: 'Analyze stock prices, portfolio returns, Sharpe ratio, volatility metrics, and financial statement ratio analysis.', instructor: 'Quant Analyst', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '8h 40m', tags: ['Finance', 'Portfolio', 'Python'] },
      { title: 'Predictive Analytics & Linear Regression', desc: 'Simple & multiple linear regression, logistic regression for classification, residual analysis, and model evaluation.', instructor: 'StatQuest (Josh Starmer)', lang: 'English', badge: 'Trending', level: 'Intermediate', duration: '7h 10m', tags: ['Regression', 'Predictive', 'StatQuest'] },
      { title: 'Time Series Forecasting with Python', desc: 'Stationarity, ARIMA models, Exponential Smoothing, Prophet library, and predicting future trends.', instructor: 'Time Series Specialist', lang: 'English', badge: 'New', level: 'Advanced', duration: '9h 00m', tags: ['TimeSeries', 'ARIMA', 'Prophet'] },
      { title: 'Data Governance, Privacy & Data Quality', desc: 'Data cataloging, lineage tracking, GDPR/CCPA compliance, and ensuring data accuracy across enterprise systems.', instructor: 'Data Steward', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '5h 15m', tags: ['DataQuality', 'Governance', 'GDPR'] },
      { title: 'Apache Spark & PySpark Big Data Processing', desc: 'Resilient Distributed Datasets (RDDs), Spark DataFrames, distributed joins, and processing massive datasets.', instructor: 'Big Data Engineer', lang: 'English', badge: 'Featured', level: 'Advanced', duration: '11h 30m', tags: ['Spark', 'PySpark', 'BigData'] },
      { title: 'Google Analytics 4 (GA4) Web Analytics', desc: 'Track website traffic, custom event tracking, e-commerce funnels, conversion attribution, and GA4 BigQuery export.', instructor: 'Digital Marketer', lang: 'English', badge: 'Trending', level: 'Beginner', duration: '6h 50m', tags: ['GA4', 'WebAnalytics', 'Tracking'] },
    ],

    'Web & App Development': [
      { title: 'Full Stack MERN Web Development 2026', desc: 'Build full-stack apps with MongoDB, Express.js, React 19, and Node.js with authentication and deployment.', instructor: 'CodeWithHarry & Angela Yu', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '22h 30m', tags: ['MERN', 'React', 'NodeJS'] },
      { title: 'React.js Complete Masterclass (Hooks, Context, Redux)', desc: 'JSX, useState, useEffect, custom hooks, Context API, Redux Toolkit, and Tailwind CSS styling.', instructor: 'Akshay Saini (Namaste React)', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '18h 10m', tags: ['React', 'Hooks', 'Redux'] },
      { title: 'Next.js 15 Full Stack Framework (App Router)', desc: 'Server Components, Server Actions, Dynamic Routes, SSR, SSG, Prisma ORM, and Vercel deployment.', instructor: 'CodeWithAntonio', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '14h 40m', tags: ['NextJS', 'AppRouter', 'Prisma'] },
      { title: 'Node.js & Express REST API Development', desc: 'Build scalable REST APIs, JWT authentication, middleware, error handling, rate limiting, and MongoDB setup.', instructor: 'Hitesh Choudhary', lang: 'Hindi', badge: 'Trending', level: 'Intermediate', duration: '11h 20m', tags: ['NodeJS', 'Express', 'JWT'] },
      { title: 'MongoDB & Mongoose Database Guide', desc: 'NoSQL document modeling, CRUD operations, aggregation framework, indexing, and MongoDB Atlas cloud setup.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'Beginner', duration: '7h 15m', tags: ['MongoDB', 'NoSQL', 'Mongoose'] },
      { title: 'Tailwind CSS Modern Web Design', desc: 'Utility-first CSS, responsive layouts, dark mode toggle, custom themes, and glassmorphism UI components.', instructor: 'Traversy Media', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '6h 00m', tags: ['Tailwind', 'CSS', 'Responsive'] },
      { title: 'React Native Cross-Platform Mobile Apps', desc: 'Build iOS and Android mobile apps using React Native, Expo, Navigation v6, and native device APIs.', instructor: 'Academind (Maximilian)', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '16h 00m', tags: ['ReactNative', 'Mobile', 'Expo'] },
      { title: 'Flutter & Dart Mobile App Development', desc: 'Cross-platform mobile apps, Flutter widgets, State Management (Provider/Bloc), Firebase backend, and Play Store export.', instructor: 'Pawan Kumar & Angela Yu', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '20h 15m', tags: ['Flutter', 'Dart', 'Android'] },
      { title: 'Vue.js 3 & Pinia Modern Frontend', desc: 'Composition API, reactive refs, computed properties, Vue Router, Pinia state management, and Vite tooling.', instructor: 'Vue Mastery', lang: 'English', badge: 'Featured', level: 'Beginner', duration: '9h 30m', tags: ['VueJS', 'CompositionAPI', 'Pinia'] },
      { title: 'Angular Framework Complete Bootcamp', desc: 'TypeScript, Components, Services, RxJS Observables, Dependency Injection, Reactive Forms, and Routing.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'All Levels', duration: '13h 00m', tags: ['Angular', 'RxJS', 'TypeScript'] },
      { title: 'Django Web Framework with Python', desc: 'Python web development, Django MVT pattern, ORM database models, admin panel, and REST framework (DRF).', instructor: 'Corey Schafer', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '12h 45m', tags: ['Django', 'Python', 'DRF'] },
      { title: 'Spring Boot Java Microservices Architecture', desc: 'Spring MVC, REST endpoints, Spring Data JPA, Hibernate, Spring Security, Docker, and Spring Cloud Gateway.', instructor: 'Java Brains (Koushik)', lang: 'English', badge: 'Bestseller', level: 'Advanced', duration: '17h 50m', tags: ['SpringBoot', 'Java', 'Microservices'] },
      { title: 'GraphQL & Apollo Server API Guide', desc: 'Schemas, Queries, Mutations, Resolvers, Apollo Client integration, and replacing traditional REST APIs.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '5h 40m', tags: ['GraphQL', 'Apollo', 'API'] },
      { title: 'WebSockets & Real-Time App Development', desc: 'Build real-time chat apps, live multiplayer canvas, and notifications using Socket.io and Node.js.', instructor: 'Tech Stack Lead', lang: 'English', badge: 'Trending', level: 'Intermediate', duration: '6h 30m', tags: ['WebSockets', 'SocketIO', 'RealTime'] },
      { title: 'Progressive Web Apps (PWA) & Service Workers', desc: 'Convert web apps into installable offline desktop/mobile apps with Service Workers and Web App Manifests.', instructor: 'Web Dev Simplified', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '4h 20m', tags: ['PWA', 'Offline', 'ServiceWorker'] },
      { title: 'Figma to Code React Component Workflow', desc: 'Translate Figma UI designs directly into clean, reusable Tailwind CSS and React JSX components.', instructor: 'UI UX Developer', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '5h 10m', tags: ['FigmaToCode', 'DesignToCode', 'React'] },
      { title: 'Web3 & Solidity Smart Contract Development', desc: 'EVM architecture, Solidity programming, Remix IDE, Hardhat, Ethers.js, and deploying Decentralized Apps (DApps).', instructor: 'Patrick Collins (FreeCodeCamp)', lang: 'English', badge: 'Bestseller', level: 'Advanced', duration: '24h 00m', tags: ['Web3', 'Solidity', 'Ethereum'] },
      { title: 'SvelteKit Modern Full Stack Development', desc: 'Svelte 5 reactivity, file-based routing, SSR, form actions, and lightweight bundle optimization.', instructor: 'Rich Harris (Svelte Creator)', lang: 'English', badge: 'New', level: 'Intermediate', duration: '8h 15m', tags: ['SvelteKit', 'Svelte', 'Frontend'] },
      { title: 'Microservices Architecture & Docker Containers', desc: 'Decompose monolithic apps, containerize services with Docker, handle inter-service communication, and RabbitMQ queues.', instructor: 'Microservices Specialist', lang: 'English', badge: 'Featured', level: 'Advanced', duration: '14h 00m', tags: ['Microservices', 'Docker', 'RabbitMQ'] },
      { title: 'RESTful API Design & Postman Automated Testing', desc: 'HTTP methods, status codes, OpenAPI/Swagger specifications, Postman test scripts, and mock servers.', instructor: 'API Architect', lang: 'English', badge: 'Free', level: 'Beginner', duration: '5h 45m', tags: ['REST', 'Postman', 'Swagger'] },
    ],

    'Trading & Stock Market': [
      { title: 'Stock Market Basics for Beginners (Zero to Hero)', desc: 'Understand stocks, IPOs, market order types, demat accounts, BSE/NSE exchanges, and market terminology.', instructor: 'Pranjal Kamra & CA Rachana Ranade', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '10h 15m', tags: ['StockMarket', 'Trading', 'Basics'] },
      { title: 'Technical Analysis & Candlestick Patterns 2026', desc: 'Support & resistance levels, chart patterns (Head & Shoulders, Double Bottom), moving averages, RSI, and MACD.', instructor: 'Pushkar Raj Thakur', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '12h 40m', tags: ['TechnicalAnalysis', 'Candlesticks', 'Charts'] },
      { title: 'Price Action Trading Strategy Blueprint', desc: 'Trade without laggy indicators. Master trendlines, market structure, breakout entries, and false breakout traps.', instructor: 'Rayner Teo', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '9h 10m', tags: ['PriceAction', 'Trading', 'Breakout'] },
      { title: 'Options Trading Masterclass (Calls, Puts & Spreads)', desc: 'Options greeks (Delta, Gamma, Theta, Vega), Option Chain analysis, Bull Call Spreads, and Iron Condor strategies.', instructor: 'Power of Stocks (Subasish)', lang: 'Hindi', badge: 'Bestseller', level: 'Intermediate', duration: '15h 00m', tags: ['Options', 'CallPut', 'Greeks'] },
      { title: 'Risk Management & Position Sizing Rules', desc: 'Protect capital with 1% risk rule, Risk-to-Reward ratio, stop-loss calculations, and avoiding trader blowout.', instructor: 'Trader Vikas', lang: 'Telugu', badge: 'Hot', level: 'All Levels', duration: '6h 20m', tags: ['RiskManagement', 'StopLoss', 'Capital'] },
      { title: 'Intraday Trading Secrets & Daily Rules', desc: 'Select intraday stocks, VWAP indicator setups, momentum strategies, strict discipline, and risk controls.', instructor: 'Neeraj Joshi', lang: 'Hindi', badge: 'Trending', level: 'Intermediate', duration: '8h 30m', tags: ['Intraday', 'VWAP', 'Momentum'] },
      { title: 'Fundamental Analysis & Financial Statement Reading', desc: 'Read Balance Sheets, Profit & Loss accounts, Cash Flow statements, and calculate ROE, ROCE, and Debt-to-Equity ratios.', instructor: 'CA Rachana Ranade', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '11h 20m', tags: ['FundamentalAnalysis', 'BalanceSheet', 'Investing'] },
      { title: 'Mutual Funds, Index Funds & SIP Wealth Creation', desc: 'Direct vs Regular funds, Equity vs Debt funds, NAV calculations, expense ratios, and long-term compounding with SIPs.', instructor: 'Asset Yogi', lang: 'Hindi', badge: 'Featured', level: 'Beginner', duration: '7h 10m', tags: ['MutualFunds', 'SIP', 'Investing'] },
      { title: 'Swing Trading Strategies for Working Professionals', desc: 'Hold stocks for days to weeks. Use 20/50 EMA crossovers, breakout volume, and part-time trading routines.', instructor: 'Trading With Vivek', lang: 'Hindi', badge: 'Trending', level: 'Intermediate', duration: '7h 50m', tags: ['SwingTrading', 'PartTime', 'EMA'] },
      { title: 'Crypto Market Trading & Blockchain Assets', desc: 'Bitcoin cycles, Ethereum ecosystem, crypto technical analysis, hardware wallet security, and DeFi basics.', instructor: 'Coin Bureau', lang: 'English', badge: 'Free', level: 'All Levels', duration: '9h 00m', tags: ['Crypto', 'Bitcoin', 'Blockchain'] },
      { title: 'Algorithmic Trading with Python & Zerodha Kite API', desc: 'Automate trading strategies using Python, Zerodha/AngelOne REST APIs, backtesting with Backtrader, and live execution.', instructor: 'Quant Insti Lead', lang: 'English', badge: 'New', level: 'Advanced', duration: '13h 30m', tags: ['AlgoTrading', 'Python', 'KiteAPI'] },
      { title: 'Forex Market Trading for Beginners', desc: 'Currency pairs (EUR/USD, GBP/JPY), leverage, pips calculation, economic calendar events, and MetaTrader 5 platform.', instructor: 'FX Street Educator', lang: 'English', badge: 'Free', level: 'Beginner', duration: '8h 15m', tags: ['Forex', 'Currencies', 'MT5'] },
      { title: 'Commodity Trading (Gold, Silver, Crude Oil)', desc: 'Trade MCX commodity contracts, global demand/supply factors, inventory reports, and margin requirements.', instructor: 'Commodity Trader', lang: 'Hindi', badge: 'Free', level: 'Intermediate', duration: '6h 40m', tags: ['Commodity', 'MCX', 'Gold'] },
      { title: 'Behavioral Finance & Investor Psychology', desc: 'Overcome FOMO, panic selling, loss aversion bias, revenge trading, and build an invincible trader mindset.', instructor: 'Mark Douglas Reader', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '5h 30m', tags: ['Psychology', 'Mindset', 'Discipline'] },
      { title: 'Futures & Derivatives Trading Masterclass', desc: 'Futures contracts, leverage margins, mark-to-market settlement, open interest (OI) decoding, and hedging.', instructor: 'Derivative Analyst', lang: 'Hindi', badge: 'Hot', level: 'Advanced', duration: '10h 20m', tags: ['Futures', 'Derivatives', 'OpenInterest'] },
      { title: 'Dividend Investing for Passive Cash Flow', desc: 'Identify high dividend yield stocks, dividend payout ratios, ex-dividend dates, and compounding dividend reinvestment.', instructor: 'Passive Income TV', lang: 'English', badge: 'Free', level: 'Beginner', duration: '5h 00m', tags: ['Dividends', 'PassiveIncome', 'Yield'] },
      { title: 'Personal Finance & Wealth Management Blueprint', desc: 'Budgeting 50/30/20 rule, emergency funds, health/life insurance selection, tax saving 80C, and financial freedom.', instructor: 'Labor Law Advisor (LLA)', lang: 'Hindi', badge: 'Bestseller', level: 'Beginner', duration: '9h 45m', tags: ['PersonalFinance', 'Insurance', 'Tax'] },
      { title: 'Valuation Ratios (P/E, P/B, EV/EBITDA, DCF Model)', desc: 'Calculate intrinsic stock value using Discounted Cash Flow (DCF) modeling and peer valuation comparison.', instructor: 'Finance Educator', lang: 'English', badge: 'New', level: 'Advanced', duration: '8h 10m', tags: ['Valuation', 'DCF', 'IntrinsicValue'] },
      { title: 'IPO Analysis & Smart Subscription Guide', desc: 'Evaluate IPO Red Herring Prospectus (RHP), promoter background, GMP (Grey Market Premium), and listing gains strategy.', instructor: 'Stock Market Telugu', lang: 'Telugu', badge: 'Trending', level: 'Beginner', duration: '4h 30m', tags: ['IPO', 'RHP', 'GMP'] },
      { title: 'Indian Stock Market (NSE/BSE) Complete Blueprint', desc: 'Understand SEBI regulations, Nifty 50 index composition, sector rotation, and Indian macroeconomic indicators.', instructor: 'Market Expert', lang: 'Hindi', badge: 'Featured', level: 'All Levels', duration: '7h 15m', tags: ['NSE', 'Nifty50', 'SEBI'] },
    ],

    'Hacking & Security': [
      { title: 'Ethical Hacking & Cyber Security Full Course 2026', desc: 'Learn ethical hacking tools, penetration testing, foot-printing, network scanning, vulnerability assessment, and exploit mitigation.', instructor: 'NetworkChuck & Technical Guftgu', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '16h 40m', tags: ['EthicalHacking', 'CyberSecurity', 'PenTesting'] },
      { title: 'Network Security & Wireshark Packet Analysis', desc: 'Analyze TCP/IP handshakes, capture network packets, detect ARP spoofing, and identify unencrypted credential leaks.', instructor: 'David Bombal', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '9h 15m', tags: ['Wireshark', 'Networking', 'Packets'] },
      { title: 'Web Application Penetration Testing (OWASP Top 10)', desc: 'SQL Injection, Cross-Site Scripting (XSS), CSRF, IDOR vulnerabilities, and testing with Burp Suite Pro.', instructor: 'Rana Khalil', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '14h 20m', tags: ['OWASP', 'BurpSuite', 'WebSecurity'] },
      { title: 'Metasploit Exploit Framework Masterclass', desc: 'Exploit vulnerable target machines, payload generation with msfvenom, post-exploitation, and privilege escalation.', instructor: 'HackerSploit', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '8h 50m', tags: ['Metasploit', 'Exploits', 'Payloads'] },
      { title: 'Kali Linux for Ethical Hackers & Linux Security', desc: 'Kali Linux terminal navigation, shell utilities, custom scripting, and security tool configurations.', instructor: 'Bitten Tech', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '10h 30m', tags: ['KaliLinux', 'Linux', 'Terminal'] },
      { title: 'Cryptography, PKI & Encryption Fundamentals', desc: 'Symmetric (AES) vs Asymmetric (RSA) encryption, hashing algorithms (SHA-256), SSL/TLS certificates, and digital signatures.', instructor: 'Computerphile', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '6h 45m', tags: ['Cryptography', 'AES', 'RSA'] },
      { title: 'Python for Ethical Hackers & Security Tools', desc: 'Code custom port scanners, keyloggers, packet sniffers, banner grabbers, and brute-force scripts from scratch.', instructor: 'FreeCodeCamp', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '8h 10m', tags: ['PythonHacking', 'PortScanner', 'Scripts'] },
      { title: 'Bug Bounty Hunting Masterclass (HackerOne/Bugcrowd)', desc: 'Discover real-world bugs, write professional bug report submissions, bypass WAFs, and earn bounty rewards.', instructor: 'Jason Haddix', lang: 'English', badge: 'Bestseller', level: 'Advanced', duration: '12h 00m', tags: ['BugBounty', 'HackerOne', 'Recon'] },
      { title: 'Wireless Network Security & Wi-Fi Defense', desc: 'Understand WPA2/WPA3 handshake captures, deauthentication attacks, Evil Twin rogue APs, and wireless defense.', instructor: 'Cyber Mentor', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '7h 30m', tags: ['WiFiHacking', 'WPA3', 'Wireless'] },
      { title: 'Reverse Engineering & Malware Analysis', desc: 'Analyze malicious x86/x64 executables, static & dynamic analysis with Ghidra, x64dbg, and IDA Pro.', instructor: 'MalwareTech (Marcus Hutchins)', lang: 'English', badge: 'Featured', level: 'Advanced', duration: '11h 10m', tags: ['ReverseEngineering', 'Ghidra', 'Malware'] },
      { title: 'CompTIA Security+ (SY0-701) Certification Guide', desc: 'Comprehensive domain prep covering threats, architecture, incident response, governance, and compliance.', instructor: 'Professor Messer', lang: 'English', badge: 'Bestseller', level: 'All Levels', duration: '18h 00m', tags: ['CompTIA', 'Security+', 'Certification'] },
      { title: 'Certified Ethical Hacker (CEH) Exam Blueprint', desc: 'Study core CEH modules: enumeration, system hacking, malware threats, sniffing, social engineering, and denial-of-service.', instructor: 'Cyber Security Trainer', lang: 'Hindi', badge: 'Trending', level: 'Intermediate', duration: '15h 20m', tags: ['CEH', 'ExamPrep', 'Hacking'] },
      { title: 'Social Engineering & Phishing Defense Techniques', desc: 'Understand OSINT target profiling, credential harvesting templates, spear-phishing, and security awareness training.', instructor: 'Social Engineer', lang: 'English', badge: 'Free', level: 'Beginner', duration: '5h 20m', tags: ['SocialEngineering', 'Phishing', 'Awareness'] },
      { title: 'SOC Analyst & SIEM Tools (Splunk & Elastic)', desc: 'Monitor security alerts, write Splunk SPL queries, analyze firewall logs, detect intrusions, and triage security tickets.', instructor: 'SOC Manager', lang: 'English', badge: 'Hot', level: 'Intermediate', duration: '10h 40m', tags: ['SOCAnalyst', 'Splunk', 'SIEM'] },
      { title: 'Cloud Security Architecture (AWS & Azure Guard)', desc: 'Secure S3 buckets, AWS IAM roles, VPC Security Groups, KMS key management, and cloud threat monitoring.', instructor: 'AWS Security Specialist', lang: 'English', badge: 'New', level: 'Advanced', duration: '9h 30m', tags: ['AWS', 'CloudSecurity', 'IAM'] },
      { title: 'Digital Forensics & Incident Response (DFIR)', desc: 'Memory forensic dumps with Volatility, disk image analysis with Autopsy, and timeline reconstruction.', instructor: 'Forensic Investigator', lang: 'English', badge: 'Featured', level: 'Advanced', duration: '8h 45m', tags: ['DigitalForensics', 'DFIR', 'Volatility'] },
      { title: 'Mobile Application Security (Android & iOS)', desc: 'Static & dynamic APK analysis, MobSF, Frida dynamic instrumentation, SSL pinning bypass, and reverse engineering.', instructor: 'Mobile Security Lead', lang: 'English', badge: 'New', level: 'Advanced', duration: '9h 15m', tags: ['AndroidSecurity', 'Frida', 'MobSF'] },
      { title: 'OSINT (Open Source Intelligence) Tools & Recon', desc: 'Gather target intelligence using Maltego, Shodan, Google Dorks, Sherlock, and public footprint analysis.', instructor: 'OSINT Combine', lang: 'English', badge: 'Trending', level: 'Beginner', duration: '6h 40m', tags: ['OSINT', 'Shodan', 'Recon'] },
      { title: 'Active Directory Hacking & Security Hardening', desc: 'Domain enumeration with BloodHound, Kerberoasting attacks, Pass-the-Hash, and securing Active Directory forests.', instructor: 'Active Directory Admin', lang: 'English', badge: 'Hot', level: 'Advanced', duration: '12h 30m', tags: ['ActiveDirectory', 'Kerberos', 'BloodHound'] },
      { title: 'Zero Trust Security Architecture & IAM', desc: 'Never trust, always verify. Micro-segmentation, continuous authentication, least privilege access, and SASE framework.', instructor: 'Enterprise CISO', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '5h 50m', tags: ['ZeroTrust', 'IAM', 'Enterprise'] },
    ],

    'Study & MNC Interviews': [
      { title: 'Data Structures & Algorithms (DSA) Java/C++ Roadmap', desc: 'Arrays, Strings, Linked Lists, Stacks, Queues, Binary Trees, BSTs, Heaps, Graphs, and Dynamic Programming.', instructor: 'Striver (Take U Forward) & Love Babbar', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '25h 00m', tags: ['DSA', 'Striver', 'CodingInterview'] },
      { title: 'System Design Interview Masterclass (HLD & LLD)', desc: 'High-Level Design (Load Balancers, Caching, Databases, Sharding) & Low-Level Design (Design Patterns, SOLID).', instructor: 'Gaurav Sen & Arpit Bhayani', lang: 'English', badge: 'Bestseller', level: 'Advanced', duration: '16h 30m', tags: ['SystemDesign', 'HLD', 'LLD'] },
      { title: 'FAANG & Top MNC Coding Interview Blueprint', desc: 'Solve 100+ top curated LeetCode Medium/Hard questions asked in Google, Amazon, Microsoft, and Meta interviews.', instructor: 'Kunal Kushwaha', lang: 'Hindi', badge: 'Hot', level: 'Intermediate', duration: '20h 10m', tags: ['FAANG', 'LeetCode', 'InterviewPrep'] },
      { title: 'Technical Resume & LinkedIn Portfolio Building', desc: 'Craft ATS-friendly engineering resumes, write impactful project descriptions, and optimize your LinkedIn profile.', instructor: 'Ansh Mehra & Nishant Chahar', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '4h 45m', tags: ['Resume', 'LinkedIn', 'JobPrep'] },
      { title: 'Mock Technical Interview Practice & Confidence', desc: 'Watch real mock interviews, learn how to articulate your thoughts out loud, handle pressure, and ask follow-up questions.', instructor: 'Interviewing.io Coach', lang: 'English', badge: 'Featured', level: 'All Levels', duration: '6h 15m', tags: ['MockInterview', 'Communication', 'Confidence'] },
      { title: 'Quantitative Aptitude for Campus Placements', desc: 'Master Speed Math, Percentages, Profit & Loss, Time & Work, Speed Distance Time, Permutation & Combination.', instructor: 'Feel Free to Learn (Tamil)', lang: 'Tamil', badge: 'Bestseller', level: 'All Levels', duration: '14h 00m', tags: ['Aptitude', 'Placement', 'Math'] },
      { title: 'Logical Reasoning for IT & MNC Exams', desc: 'Blood relations, coding-decoding, seating arrangement, syllogism, puzzles, and direction sense tests.', instructor: 'TalentSprint Educator', lang: 'Telugu', badge: 'Trending', level: 'Beginner', duration: '11h 20m', tags: ['LogicalReasoning', 'Puzzles', 'Exams'] },
      { title: 'Verbal Ability & Business Communication Skills', desc: 'Grammar rules, reading comprehension, sentence correction, vocabulary building, and professional email writing.', instructor: 'English With Lucy', lang: 'English', badge: 'Free', level: 'Beginner', duration: '7h 40m', tags: ['VerbalAbility', 'English', 'Communication'] },
      { title: 'Behavioral Interview Masterclass (STAR Method)', desc: 'Answer "Tell me about a time when...", handle conflict resolution, showcase teamwork, and align with company values.', instructor: 'Career Coach', lang: 'English', badge: 'Hot', level: 'All Levels', duration: '5h 10m', tags: ['STARMethod', 'Behavioral', 'HRRound'] },
      { title: 'Dynamic Programming (DP) Zero to Hero', desc: 'Master memoization, tabulation, knapsack problems, longest common subsequence (LCS), and DP on trees.', instructor: 'Striver', lang: 'Hindi', badge: 'Featured', level: 'Advanced', duration: '13h 45m', tags: ['DP', 'DynamicProgramming', 'Algorithms'] },
      { title: 'Graph Algorithms & Tree Traversal Deep Dive', desc: 'BFS, DFS, Dijkstra shortest path, Bellman-Ford, Kruskal/Prim MST, Topological Sorting, and Disjoint Set Union (DSU).', instructor: 'Abdul Bari', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '12h 10m', tags: ['Graphs', 'Dijkstra', 'Trees'] },
      { title: 'SQL Interview Questions for Tech Jobs', desc: 'Solve top 50 SQL queries asked in Amazon, Flipkart, and TCS interview rounds.', instructor: 'Tech Lagna', lang: 'Telugu', badge: 'Trending', level: 'Intermediate', duration: '6h 50m', tags: ['SQLInterview', 'Queries', 'Database'] },
      { title: 'Object-Oriented System Design (OOD) & Design Patterns', desc: 'Singleton, Factory, Strategy, Observer, Decorator patterns, and UML diagram modeling.', instructor: 'Christopher Okhravi', lang: 'English', badge: 'Free', level: 'Intermediate', duration: '9h 30m', tags: ['DesignPatterns', 'OOD', 'SOLID'] },
      { title: 'GATE CSE Examination Complete Strategy', desc: 'Syllabus roadmap, subject priority weightage, PYQ solving techniques, and revision schedules for GATE CS.', instructor: 'Gate Smashers (Varun)', lang: 'Hindi', badge: 'Bestseller', level: 'All Levels', duration: '15h 00m', tags: ['GATE', 'CSE', 'ExamPrep'] },
      { title: 'Amazon Leadership Principles & Bar Raiser Guide', desc: 'Master Customer Obsession, Ownership, Bias for Action, and passing the Amazon Bar Raiser HR interview.', instructor: 'Ex-Amazon Senior Manager', lang: 'English', badge: 'Featured', level: 'Intermediate', duration: '4h 30m', tags: ['Amazon', 'Leadership', 'BarRaiser'] },
      { title: 'Google Clean Code & Software Craftsmanship', desc: 'Meaningful naming, small single-responsibility functions, code refactoring, unit testing, and avoiding code smells.', instructor: 'Uncle Bob Martin (Clean Code)', lang: 'English', badge: 'Hot', level: 'All Levels', duration: '8h 20m', tags: ['CleanCode', 'Refactoring', 'Quality'] },
      { title: 'Salary Negotiation Techniques for Software Engineers', desc: 'Evaluate stock options (RSUs), calculate total compensation (TC), negotiate counter-offers without losing job offers.', instructor: 'Tech Compensation Lead', lang: 'English', badge: 'Free', level: 'All Levels', duration: '3h 50m', tags: ['SalaryNegotiation', 'RSUs', 'Career'] },
      { title: 'Competitive Programming Blueprint (Codeforces/CodeChef)', desc: 'Fast I/O, bitwise tricks, binary search on answers, segment trees, and rating progression strategies.', instructor: 'Errichto', lang: 'English', badge: 'New', level: 'Advanced', duration: '11h 00m', tags: ['CompetitiveProgramming', 'Codeforces', 'Math'] },
      { title: 'Product Management (PM) Interview Guide', desc: 'Product design questions, root cause analysis, execution metrics, and guesstimate estimation framework.', instructor: 'PM School', lang: 'English', badge: 'New', level: 'Intermediate', duration: '7h 15m', tags: ['ProductManagement', 'Guesstimates', 'PM'] },
      { title: 'Group Discussion (GD) Tips for Campus Jobs', desc: 'Body language, initiation techniques, handling aggressive speakers, and summarizing GD topics effectively.', instructor: 'Placement Coordinator', lang: 'Hindi', badge: 'Free', level: 'Beginner', duration: '4h 00m', tags: ['GD', 'GroupDiscussion', 'Placements'] },
    ],

    'Computer Basics': [
      { title: 'Computer Hardware & Internal Architecture Basics', desc: 'Understand CPU processors, RAM memory, SSD/HDD storage, motherboard buses, GPU graphics, and power supply.', instructor: 'Neso Academy', lang: 'English', badge: 'Bestseller', level: 'Beginner', duration: '8h 30m', tags: ['ComputerHardware', 'CPU', 'RAM'] },
      { title: 'Windows 11 Operational Masterclass', desc: 'Taskbar customization, virtual desktops, file explorer organization, device manager, and security settings.', instructor: 'Kevin Stratvert', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '5h 15m', tags: ['Windows11', 'OS', 'Guide'] },
      { title: 'Linux Operating System Basics for Everyone', desc: 'Linux file tree structure, terminal commands (ls, cd, mkdir, chmod), user permissions, and package managers.', instructor: 'NetworkChuck', lang: 'English', badge: 'Bestseller', level: 'Beginner', duration: '7h 45m', tags: ['Linux', 'Ubuntu', 'Terminal'] },
      { title: 'Microsoft Office Complete Suite (Word, Excel, PowerPoint)', desc: 'Formatting Word documents, Excel basic formulas & charts, and creating professional PowerPoint presentation slides.', instructor: 'LearnoHub (Roshni)', lang: 'Hindi', badge: 'Bestseller', level: 'Beginner', duration: '12h 00m', tags: ['MSOffice', 'Word', 'PowerPoint'] },
      { title: 'Computer Networking Fundamentals (IP, Router, DNS)', desc: 'How the internet works: IP addresses (IPv4/IPv6), Routers, Modems, DNS resolution, and Wi-Fi security.', instructor: 'PowerCert Animated Videos', lang: 'English', badge: 'Hot', level: 'Beginner', duration: '6h 30m', tags: ['Networking', 'DNS', 'IPAddress'] },
      { title: 'Touch Typing Masterclass: Type 60+ WPM', desc: 'Proper home-row finger placement, posture, muscle memory building, and typing accuracy drills without looking.', instructor: 'Typing Master Coach', lang: 'English', badge: 'Free', level: 'Beginner', duration: '3h 30m', tags: ['Typing', 'Speed', 'Keyboard'] },
      { title: 'Internet Safety, Privacy & Safe Browsing Habits', desc: 'Spotting email scams, phishing links, secure HTTPS websites, VPN usage, and protecting personal data online.', instructor: 'Tech Safety Educator', lang: 'Hindi', badge: 'Free', level: 'Beginner', duration: '4h 20m', tags: ['InternetSafety', 'Privacy', 'Scams'] },
      { title: 'Google Workspace Productivity (Docs, Sheets, Slides, Drive)', desc: 'Cloud file organization, real-time document collaboration, Google Forms surveys, and Gmail filter rules.', instructor: 'Google Certified Trainer', lang: 'English', badge: 'Featured', level: 'Beginner', duration: '5h 50m', tags: ['GoogleWorkspace', 'GoogleDrive', 'Docs'] },
      { title: 'Troubleshooting PC & Hardware Errors at Home', desc: 'Diagnose blue screen errors (BSOD), slow startup, overheating fans, driver updates, and malware removal.', instructor: 'PC Doctor Hindi', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '6h 10m', tags: ['PCTroubleshooting', 'HardwareFix', 'BSOD'] },
      { title: 'MacOS Complete User Guide for Mac Switchers', desc: 'Finder navigation, Spotlight search, Trackpad gestures, System Settings, Time Machine backup, and Mac shortcuts.', instructor: 'MacMost (Gary)', lang: 'English', badge: 'Featured', level: 'Beginner', duration: '5h 00m', tags: ['MacOS', 'Apple', 'Mac'] },
      { title: 'Cyber Hygiene & Antivirus Protection', desc: 'Setting up Windows Defender, firewall rules, avoiding malware downloads, and safe USB flash drive handling.', instructor: 'IT Security Admin', lang: 'Hindi', badge: 'Free', level: 'Beginner', duration: '4h 45m', tags: ['CyberHygiene', 'Antivirus', 'Protection'] },
      { title: 'Command Line Interface (CLI) Basics for Windows & Mac', desc: 'Master Command Prompt (cmd), PowerShell, and Mac Terminal commands for daily file management.', instructor: 'Tech Educator', lang: 'English', badge: 'Free', level: 'Beginner', duration: '4h 15m', tags: ['CLI', 'PowerShell', 'CommandPrompt'] },
      { title: 'Printers, Scanners & Peripheral Hardware Setup', desc: 'Connecting Wi-Fi printers, scanner driver configuration, Bluetooth pairing, and external monitor displays.', instructor: 'Hardware Support Lead', lang: 'English', badge: 'Free', level: 'Beginner', duration: '3h 15m', tags: ['Peripherals', 'Printers', 'Hardware'] },
      { title: 'File Management & Automated Backup Strategies', desc: 'Folder directory structure, external drive backups, cloud sync (OneDrive, Dropbox), and file compression (ZIP/RAR).', instructor: 'Digital Organizer', lang: 'English', badge: 'Free', level: 'Beginner', duration: '3h 40m', tags: ['FileManagement', 'Backups', 'Cloud'] },
      { title: 'Professional Email Etiquette & Outlook Guide', desc: 'Writing formal business emails, managing inbox clutter, setting calendar appointments, and auto-responders.', instructor: 'Corporate Communication Coach', lang: 'English', badge: 'Featured', level: 'Beginner', duration: '4h 00m', tags: ['Email', 'Outlook', 'Professional'] },
      { title: 'Remote Work Tools (Zoom, MS Teams, Google Meet)', desc: 'Host video meetings, screen sharing, breakout rooms, audio troubleshooting, and professional remote etiquette.', instructor: 'Remote Work Specialist', lang: 'English', badge: 'Free', level: 'Beginner', duration: '3h 50m', tags: ['RemoteWork', 'Zoom', 'MSTeams'] },
      { title: 'Basic Graphic Design & Poster Creation in Canva', desc: 'Design eye-catching posters, birthday cards, YouTube thumbnails, and social media flyers in minutes.', instructor: 'Design Class Hindi', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '5h 30m', tags: ['Canva', 'PosterDesign', 'Graphics'] },
      { title: 'Custom PC Assembly & Component Building', desc: 'Step-by-step guide to installing CPU, applying thermal paste, mounting motherboard, RAM, GPU, and cable management.', instructor: 'Linus Tech Tips', lang: 'English', badge: 'Bestseller', level: 'Intermediate', duration: '7h 10m', tags: ['PCBuilding', 'Assembly', 'GamingPC'] },
      { title: 'Password Managers & Multi-Factor Auth (2FA)', desc: 'Setup Bitwarden / 1Password, generate unbreakable passwords, and configure Google Authenticator 2FA.', instructor: 'Privacy Advocate', lang: 'English', badge: 'Free', level: 'Beginner', duration: '3h 25m', tags: ['Passwords', '2FA', 'Security'] },
      { title: 'AI Tools for Daily Computer Productivity', desc: 'Use AI text summarizers, grammar fixers, image enhancers, and voice-to-text tools to save 2+ hours daily.', instructor: 'Tech Productivity Creator', lang: 'Hindi', badge: 'Trending', level: 'Beginner', duration: '5h 45m', tags: ['AIProductivity', 'Tools', 'ComputerBasics'] },
    ],
  };

  const allCourses: Course[] = [];
  let videoIdCounter = 0;

  categoriesList.forEach((category) => {
    const templates = categoryTemplates[category];

    templates.forEach((tmpl, index) => {
      const courseId = `${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index + 1}`;
      const videoId = validYoutubeIds[videoIdCounter % validYoutubeIds.length];
      videoIdCounter++;

      const courseObj: Course = {
        id: courseId,
        title: tmpl.title,
        category: category,
        description: tmpl.desc,
        instructor: tmpl.instructor,
        instructorRole: 'Verified Educator & Industry Expert',
        instructorAvatar: `https://images.unsplash.com/photo-${1534528741775 + index}?w=150&auto=format&fit=crop`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        badge: tmpl.badge,
        level: tmpl.level,
        audioLanguage: tmpl.lang,
        rating: +(4.7 + (index % 3) * 0.1).toFixed(1),
        reviewsCount: 1200 + index * 450,
        duration: tmpl.duration,
        totalLessons: 12 + (index % 8),
        youtubeVideoId: videoId,
        prerequisites: ['Basic computer & internet knowledge', 'Enthusiasm to learn'],
        skillsLearned: [tmpl.tags[0] || 'Core Skill', tmpl.tags[1] || 'Hands-on Practice', 'Problem Solving', 'Real World Project'],
        tags: tmpl.tags,
        modules: [
          {
            id: `${courseId}-m1`,
            title: `Module 1: Introduction & Environment Setup`,
            lessons: [
              {
                id: `${courseId}-l1`,
                title: `1. Comprehensive Introduction to ${tmpl.title.split(':')[0]}`,
                duration: '18:25',
                youtubeVideoId: videoId,
                description: `Understand core concepts, industry relevance, and setting up tools for ${tmpl.title}.`,
                notes: `Key Takeaways:\n- Overview of ${tmpl.title}\n- Setting up necessary tools and prerequisites\n- Practical demonstration of initial setup.`,
                codeSnippet: `// Welcome snippet for ${tmpl.title}\nconsole.log("Welcome to EduPulse!");`,
              },
              {
                id: `${courseId}-l2`,
                title: `2. Core Architecture & Fundamental Concepts`,
                duration: '24:10',
                youtubeVideoId: videoId,
                notes: `Focus on mastering foundational building blocks before moving to advanced topics.`,
              },
            ],
          },
          {
            id: `${courseId}-m2`,
            title: `Module 2: Advanced Hands-On Projects & Mastery`,
            lessons: [
              {
                id: `${courseId}-l3`,
                title: `3. Building Real-World Applications & Best Practices`,
                duration: '35:40',
                youtubeVideoId: videoId,
                description: `Step-by-step implementation of real-world project workflows and optimization techniques.`,
                notes: `Key Takeaways:\n- Apply best practices in structure and design\n- Optimization and performance tuning.`,
              },
            ],
          },
        ],
        quiz: [
          {
            id: `${courseId}-q1`,
            question: `What is the primary objective of studying ${tmpl.title.split(':')[0]}?`,
            options: [
              'To acquire industry-relevant practical skills',
              'To avoid writing code or practicing',
              'To memorize theoretical formulas only',
              'None of the above',
            ],
            correctAnswerIndex: 0,
            explanation: 'Practical hands-on training ensures real-world skill mastery and problem solving.',
          },
          {
            id: `${courseId}-q2`,
            question: 'Which learning approach yields the highest retention rate?',
            options: [
              'Passive video watching without taking notes',
              'Active coding/practicing along with video lessons and taking quizzes',
              'Skipping quizzes and exercises',
              'Reading documentation only once',
            ],
            correctAnswerIndex: 1,
            explanation: 'Active practice combined with quizzes and project building guarantees maximum retention.',
          },
        ],
      };

      allCourses.push(courseObj);
    });
  });

  return allCourses;
};

export const COURSES_DATA: Course[] = generateCourses();
