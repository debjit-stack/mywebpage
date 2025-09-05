import React, { useState, useEffect, useRef } from 'react';
import {
    Moon, Sun, Bot, Menu, Github, Linkedin, Code as CodeIcon, ExternalLink, X,
    ChevronRight, Send, Trash2, Download
} from 'lucide-react';

// --- Reusable Components ---

const LogoIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
);

const SectionHeading = ({ number, children }) => (
    <h2 className="flex items-center relative mb-10 w-full text-2xl md:text-3xl font-bold text-[var(--color-text-heading)]
                   after:content-[''] after:block after:relative after:top-px after:w-full sm:after:w-[300px] after:h-px after:ml-5 after:bg-[var(--color-surface-secondary)]">
        <span className="relative bottom-0.5 mr-2.5 text-[var(--color-text-accent)] font-mono text-lg md:text-xl font-normal">
            0{number}.
        </span>
        {children}
    </h2>
);

const GlassCard = ({ children, className = '' }) => (
    <div className={`bg-[var(--color-surface-primary)] border border-[var(--color-border)]
                     transition-transform duration-300 ease-out hover:-translate-y-2
                     shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]
                     hover:shadow-[0_20px_30px_-15px_rgba(2,12,27,0.7)]
                     hover:border-[var(--color-text-accent)]
                     dark:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),_0_4px_6px_-2px_rgba(0,0,0,0.04)]
                     dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.07),_0_10px_10px_-5px_rgba(0,0,0,0.04)]
                     ${className}`}>
        {children}
    </div>
);

// --- Main Components ---

const Header = ({ onChatbotToggle, isChatbotOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    const navLinks = [
        { href: "#about", number: "01", label: "About" },
        { href: "#experience", number: "02", label: "Experience" },
        { href: "#projects", number: "03", label: "Work" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const resumeLink = "/Debjit_Resume.pdf";

    return (
        <nav id="navbar" className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                    <a href="#">
                        <LogoIcon className="w-12 h-12 text-[var(--color-text-accent)]" />
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                             <a key={link.number} href={link.href} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">{link.number}. {link.label}</a>
                        ))}
                        <a href="#contact" className="text-[var(--color-text-accent)] border border-[var(--color-text-accent)] px-5 py-2 rounded-md font-mono hover:bg-[var(--color-accent-bg-hover)] transition-colors">Contact</a>
                        <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Download Resume">
                            <Download className="w-5 h-5" />
                        </a>
                        <button type="button" onClick={onChatbotToggle} className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Toggle Chat">
                           {isChatbotOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </button>
                        <button type="button" onClick={toggleTheme} className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Toggle Theme">
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                    </div>
                    <button className="md:hidden p-2 rounded-lg text-[var(--color-text-accent)]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X/> : <Menu />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-[var(--color-surface-primary)] p-6 mx-4 mb-4 rounded-lg shadow-lg animate-fade-in-up">
                    <div className="flex flex-col space-y-4 text-center">
                        {[...navLinks, {href: "#contact", number: "04", label: "Contact"}].map(link => (
                            <a key={link.number} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono py-2">{link.number}. {link.label}</a>
                        ))}
                        <div className="flex justify-center items-center gap-4 pt-4 mt-2 border-t border-[var(--color-border)]">
                             <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Download Resume">
                                <Download className="w-6 h-6" />
                            </a>
                            <button onClick={() => { onChatbotToggle(); setIsMenuOpen(false); }} className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Toggle Chat">
                                <Bot className="w-6 h-6" />
                            </button>
                             <button type="button" onClick={toggleTheme} className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Toggle Theme">
                                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => (
    <section className="min-h-screen flex flex-col justify-center">
        <div>
            <p className="text-[var(--color-text-accent)] font-mono text-lg mb-4">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--color-text-heading)]">Debjit Ghosh.</h1>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--color-text-body)] mt-2">I build intelligent web solutions.</h2>
            <p className="mt-6 max-w-xl text-base sm:text-lg">
                I'm a Full Stack Developer specializing in fusing scalable backend architecture with AI-driven features. Currently, I’m focused on building accessible, human-centered products and pushing the boundaries of what's possible on the web.
            </p>
            <a href="mailto:deb.sh02@gmail.com" className="inline-block mt-12 text-[var(--color-text-accent)] border border-[var(--color-text-accent)] px-8 py-4 rounded-md font-mono text-base sm:text-lg hover:bg-[var(--color-accent-bg-hover)] transition-colors">
                Get In Touch
            </a>
        </div>
    </section>
);

const About = () => (
     <section id="about" className="py-24">
        <SectionHeading number="1">About Me</SectionHeading>
        <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 text-lg space-y-4">
                <p>Hello! I'm Debjit. My fascination with technology began not with code, but with circuits and systems during my Electrical Engineering studies. This foundation in logical problem-solving naturally led me to the world of software development, where I discovered a passion for building dynamic and intelligent applications.</p>
                <p>Today, I have over a year of experience creating robust solutions with the <span className="text-[var(--color-text-accent)]">MERN stack</span>. I thrive on the challenge of integrating complex technologies like <span className="text-[var(--color-text-accent)]">Generative AI</span> to create seamless, intuitive user experiences. My goal is to not just write code, but to engineer solutions that are efficient, scalable, and impactful.</p>
                <p>Here are a few technologies I’ve been working with recently:</p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                    {["JavaScript (ES6+)", "TypeScript", "React & Next.js", "Node.js", "MongoDB", "AWS"].map(tech => (
                         <li key={tech} className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]"/>{tech}</li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-2">
                <div className="relative w-full max-w-xs mx-auto md:max-w-none h-80 rounded-lg group">
                    <div className="absolute inset-0 bg-[var(--color-text-accent)] opacity-80 rounded-lg transform transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <img src="/profile.png" onError={(e) => e.target.src='https://placehold.co/400x400/18181b/5eead4?text=DG'} alt="Debjit Ghosh" className="relative w-full h-full object-cover rounded-lg z-10"/>
                </div>
            </div>
        </div>
    </section>
);

const Experience = () => (
    <section id="experience" className="py-24">
        <SectionHeading number="2">Where I've Worked</SectionHeading>
        <GlassCard className="p-6 md:p-8 rounded-lg">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-heading)]">Analyst <span className="text-[var(--color-text-accent)]">@ Virtusa Consulting</span></h3>
            <p className="font-mono my-2 text-sm">March 2024 - Present</p>
            <ul className="list-disc list-inside space-y-3 mt-4 text-base md:text-lg">
                <li>Engineered GenAI image moderation systems for Google, significantly improving system accuracy through rigorous data analysis and pattern recognition.</li>
                <li>Collaborated in an agile environment with cross-functional teams to optimize business processes, achieving a 15% boost in operational efficiency.</li>
                <li>Maintained a consistent 100% accuracy rate in high-volume QA tasks, processing over 1000 data points daily.</li>
            </ul>
        </GlassCard>
    </section>
);

const Projects = () => {
    const projectData = [
        {
            title: "AI Content Summarizer",
            image: "/aicontent.png",
            description: "A scalable web app using the Google Gemini API for intelligent text summarization. Features a responsive UI, customizable length options, and persistent history with MongoDB.",
            tags: ["React", "Node.js", "MongoDB", "Gemini API", "Tailwind CSS"],
            github: "https://github.com/debjit-stack/Ai-Content-Summarizer",
            live: "https://concise-content.vercel.app/",
            align: 'right'
        },
        {
            title: "CareConnect Healthcare",
            image: "/careconnect.png",
            description: "A comprehensive healthcare platform with role-based access control. Implemented secure JWT authentication and an automated appointment booking and notification system.",
            tags: ["MERN Stack", "JWT Auth", "Context API"],
            github: "https://github.com/debjit-stack/care-connect",
            live: "https://ccmanagement.netlify.app/",
            align: 'left'
        },
        {
            title: "AudioInsights AI Analysis",
            image: null,
            description: "A Chrome extension for audio capture from browser tabs with real-time analysis, using AssemblyAI for transcription and Gemini API for comprehensive content insights.",
            tags: ["Chrome Extension", "AssemblyAI", "Gemini API"],
            github: "https://github.com/debjit-stack/AudioInsights",
            live: null,
            align: 'right'
        },
    ];

    return (
         <section id="projects" className="py-24">
            <SectionHeading number="3">Things I've Built</SectionHeading>
            <div className="space-y-20">
                {projectData.map(p => <ProjectCard key={p.title} {...p} />)}
            </div>
        </section>
    );
};

const ProjectCard = ({ title, image, description, tags, github, live, align }) => {
    const isRightAlignedOnDesktop = align === 'right';

    const imageContent = (
         <a href={live || github} target="_blank" rel="noopener noreferrer" className="block w-full h-full glass-card rounded-lg overflow-hidden group">
            {image ? (
                <img src={image} onError={(e) => e.target.src=`https://placehold.co/600x400/27272a/5eead4?text=${title.replace(' ','+')}`} alt={`${title} Screenshot`} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
            ) : (
                <div className="w-full h-full bg-[var(--color-surface-primary)] flex items-center justify-center aspect-video p-8 opacity-75 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-2xl text-[var(--color-text-accent)]">Chrome Extension</span>
                </div>
            )}
        </a>
    );

    const textContent = (
        <div>
            <p className="font-mono text-[var(--color-text-accent)] mt-4 md:mt-0 md:text-right">Featured Project</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] my-2 md:text-right">{title}</h3>
            <div className="p-6 my-4 bg-[var(--color-surface-secondary)] shadow-lg rounded-md text-left">
                <p>{description}</p>
            </div>
            <div className="flex flex-wrap gap-3 my-4 font-mono text-sm justify-start md:justify-end">
                {tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
            <div className="flex items-center space-x-4 justify-start md:justify-end">
                {github && <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Github className="w-6 h-6" /></a>}
                {live && <a href={live} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><ExternalLink className="w-6 h-6" /></a>}
            </div>
        </div>
    );
    
    // For mobile, image is always on top. For desktop, order depends on `align`.
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 items-center">
             <div className={`md:col-span-7 ${isRightAlignedOnDesktop ? '' : 'md:order-last'}`}>
                 {imageContent}
             </div>
             <div className={`md:col-span-5 ${isRightAlignedOnDesktop ? 'md:text-right' : 'md:text-left'}`}>
                 {textContent}
             </div>
        </div>
    );
}


const Contact = () => (
    <section id="contact" className="py-24 text-center">
        <h2 className="font-mono text-[var(--color-text-accent)] text-lg">04. What's Next?</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] mt-4">Get In Touch</h3>
        <p className="text-lg mt-6 max-w-xl mx-auto">
            I'm actively seeking new opportunities to leverage my skills in a challenging environment. Whether you have a project in mind, a question, or just want to connect, my inbox is always open.
        </p>
        <a href="mailto:deb.sh02@gmail.com" className="inline-block mt-12 text-[var(--color-text-accent)] border border-[var(--color-text-accent)] px-8 py-4 rounded-md font-mono text-lg hover:bg-[var(--color-accent-bg-hover)] transition-colors">
            Say Hello
        </a>
    </section>
);

const Footer = () => (
    <footer className="py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-[var(--color-text-body)]">
             <div className="flex justify-center space-x-6 mb-4 md:hidden">
                <a href="https://github.com/debjit-stack" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Github/></a>
                <a href="https://www.linkedin.com/in/debjit-ghosh007/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Linkedin /></a>
                <a href="https://leetcode.com/u/debjit7" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><CodeIcon /></a>
            </div>
            <p className="font-mono text-sm">Designed & Built by Debjit Ghosh</p>
        </div>
    </footer>
);

const SideBars = () => (
    <>
        <div className="hidden md:block fixed bottom-0 left-10 z-10">
            <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-[var(--color-text-body)] after:mt-6">
                <a href="https://github.com/debjit-stack" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-transform"><Github/></a>
                <a href="https://www.linkedin.com/in/debjit-ghosh007/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-transform"><Linkedin /></a>
                <a href="https://leetcode.com/u/debjit7" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-transform"><CodeIcon /></a>
            </div>
        </div>
        <div className="hidden md:block fixed bottom-0 right-10 z-10">
            <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-[var(--color-text-body)] after:mt-6">
                <a href="mailto:deb.sh02@gmail.com" className="font-mono text-sm tracking-widest [writing-mode:vertical-rl] hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-all">
                    deb.sh02@gmail.com
                </a>
            </div>
        </div>
    </>
);

const Chatbot = ({ isChatbotOpen, onChatbotToggle }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatboxRef = useRef(null);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const RESUME_DATA = `
    DEBJIT GHOSH - Full Stack Developer | MERN Stack Specialist - Email: deb.sh02@gmail.com, Phone: +91 8509060187, Links: LinkedIn (linkedin.com/in/debjit-ghosh007/), GitHub (github.com/debjit-stack), LeetCode (leetcode.com/u/debjit7)
    PROFESSIONAL SUMMARY: Full Stack Developer with over 1 year of experience in the MERN stack and JavaScript technologies. Expertise in scalable web applications, AI integration, and user-focused solutions. Proven ability to improve operational efficiency by 15% through GenAI implementation and cross-functional collaboration.
    TECHNICAL SKILLS: JavaScript ES6+, TypeScript, React.js, Next.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit, Node.js, Express.js, RESTful APIs, JWT Authentication, Microservices, MongoDB, MySQL, AWS (EC2, S3, Lambda), Docker, Git, GitHub, CI/CD, Vercel, Render.
    KEY PROJECTS: 1. AI Content Summarizer (React, Node, MongoDB, Gemini API): Scalable web app for intelligent text summarization. 2. CareConnect Healthcare (MERN, JWT): Healthcare platform with role-based access. 3. AudioInsights AI (Chrome Extension, AssemblyAI, Gemini API): Chrome extension for audio capture and analysis.
    PROFESSIONAL EXPERIENCE: Analyst @ Virtusa (March 2024 - Present): Developed GenAI image moderation systems for Google, improving system accuracy. Optimized business processes, improving efficiency by 15%.
    EDUCATION: B.Tech - Electrical Engineering, Academy of Technology (CGPA: 8.87/10), 2019-2023.
    `;

    const systemPrompt = `You are DG-AI, a smart, professional, and friendly AI assistant representing Debjit Ghosh. Your primary role is to engage with potential employers and collaborators by providing helpful information based *exclusively* on the professional details provided below.

**Core Directives:**

1.  **Natural Conversation:** Communicate in a helpful, conversational tone. Avoid sounding robotic or repetitive. **Do not use the word "resume"**. Instead, refer to the information you have with phrases like, "Based on his profile...", "I can see that...", or "The information I have shows...".

2.  **Be Proactively Helpful:** If a user asks a broad question like "Can I get his professional summary?", don't just ask for specifics. Proactively provide a concise summary of his key skills, latest role, and technical expertise.

3.  **Intelligent Redirection:** When asked a question you can't directly answer from the data (e.g., subjective questions like "Is he a good coder?"), don't simply refuse. Instead, pivot to relevant, factual information. For example, you could say: "While I can't speak to his personal style, his projects demonstrate strong capabilities in technologies like React and Node.js. For instance, in his AI Content Summarizer, he integrated the Gemini API to build a scalable application."

4.  **Stay On-Topic:** If a user asks a completely unrelated question (e.g., "What's the weather like?"), politely steer the conversation back to Debjit's professional profile. A good response would be: "I'm focused on providing information about Debjit's professional background. I'd be happy to tell you about the technologies he uses or the projects he's built."

5.  **Formatting Rule:** **DO NOT use any Markdown formatting in your responses.** No asterisks for bolding or lists. Present information in clean, simple text and paragraphs. For lists of skills, group them under a heading and list them separated by commas.
`;

    const generateResponse = async (userMessage) => {
        setIsTyping(true);
        if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
             setMessages(prev => [...prev, { sender: 'bot', text: "API Key not configured. Please add your VITE_GEMINI_API_KEY to the .env file." }]);
             setIsTyping(false);
             return;
        }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
        const payload = {
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            const result = await response.json();
            const botMessage = result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
            setMessages(prev => [...prev, { sender: 'bot', text: botMessage }]);
        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "A network error occurred. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        generateResponse(input);
    };

    if (!isChatbotOpen) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="w-[90vw] max-w-sm bg-[var(--color-surface-primary)] rounded-lg overflow-hidden shadow-2xl border border-[var(--color-border)] flex flex-col animate-fade-in-up">
                <header className="p-3 px-4 relative text-[var(--color-text-heading)] bg-[var(--color-surface-primary)] border-b border-[var(--color-border)] flex justify-between items-center flex-shrink-0">
                    <h2 className="text-md font-semibold">Chat with <strong>DG-AI</strong></h2>
                    <button type="button" onClick={onChatbotToggle} className="p-1 rounded-full hover:bg-[var(--color-surface-secondary)]"><X size={18}/></button>
                </header>
                <ul ref={chatboxRef} className="overflow-y-auto h-[320px] p-4 space-y-4">
                    {messages.length === 0 && !isTyping ? (
                        <div className="flex flex-col justify-center items-center h-full text-center">
                            <Bot className="w-16 h-16 mx-auto mb-3 text-[var(--color-text-body)] opacity-30" />
                            <h3 className="font-semibold text-md text-[var(--color-text-heading)]">Send a message to start!</h3>
                            <p className="text-xs mt-1 opacity-80">Ask me anything about Debjit!</p>
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <li key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <p className={`whitespace-pre-wrap py-2 px-3.5 max-w-[80%] text-sm ${msg.sender === 'user' ? 'rounded-[16px_16px_4px_16px] bg-[var(--color-text-accent)] text-[var(--color-bg)]' : 'rounded-[16px_16px_16px_4px] bg-[var(--color-surface-secondary)] text-[var(--color-text-body)]'}`}>
                                    {msg.text}
                                </p>
                            </li>
                        ))
                    )}
                    {isTyping && (
                        <li className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1.5">
                                {[...Array(3)].map((_, i) => (
                                    <span key={i} className="w-2 h-2 bg-[var(--color-text-body)] rounded-full opacity-70 animate-bounce" style={{animationDelay: `${i * 0.2}s`}}></span>
                                ))}
                            </div>
                        </li>
                    )}
                </ul>
                <div className="flex gap-2 items-center w-full bg-[var(--color-surface-primary)] p-2.5 border-t border-[var(--color-border)] flex-shrink-0">
                    <button onClick={() => setMessages([])} title="Clear chat" className="p-2 rounded-full text-[var(--color-text-body)] hover:text-red-500"><Trash2 size={20}/></button>
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())} placeholder="Ask something..." className="flex-1 h-10 border border-[var(--color-border)] outline-none resize-none rounded-full px-4 py-2 text-sm bg-[var(--color-surface-secondary)] text-[var(--color-text-body)] focus:border-[var(--color-text-accent)]"></textarea>
                    <button onClick={handleSend} title="Send" className="h-10 w-10 flex-shrink-0 flex items-center justify-center border-none outline-none cursor-pointer rounded-full bg-[var(--color-text-accent)] text-[var(--color-bg)] hover:opacity-90 disabled:opacity-50" disabled={isTyping}><Send size={20}/></button>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    
    const toggleChatbot = () => {
        setIsChatbotOpen(prev => !prev);
    };

    return (
        <>
            <Header onChatbotToggle={toggleChatbot} isChatbotOpen={isChatbotOpen} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <main>
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <Contact />
                </main>
            </div>
            <Footer />
            <SideBars />
            <Chatbot onChatbotToggle={toggleChatbot} isChatbotOpen={isChatbotOpen} />
        </>
    );
}