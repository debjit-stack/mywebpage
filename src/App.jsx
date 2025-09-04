import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Code, ExternalLink, Moon, Sun, Bot, Menu, ChevronRight, ChevronDown, Trash2, Send } from 'lucide-react';

// --- Main App Component ---
function App() {
  // --- State Management ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatboxRef = useRef(null);

  // --- Effects ---

  // Theme effect
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Auto-scroll chatbox effect
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);


  // --- Event Handlers ---
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    // Gemini API call logic
    await generateResponse(userInput);
  };

  const clearChat = () => {
    setMessages([]);
  }

  // --- Gemini API Call ---
  const generateResponse = async (currentInput) => {
      const apiKey = ""; // API key is handled by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const systemPrompt = `You are DG-AI, a specialized, professional AI assistant for the portfolio of Debjit Ghosh, a Full Stack Developer. Your single most important goal is to answer questions from potential employers, recruiters, and collaborators based exclusively on the resume data provided below. Do not, under any circumstances, use external knowledge or make up information. When a user asks a question that is not related to Debjit's professional profile, you MUST politely decline and guide them back. Maintain a friendly, helpful, and highly professional tone. Be concise. --- RESUME DATA --- ${RESUME_DATA}`;

      const payload = {
          contents: [{ parts: [{ text: currentInput }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
      };

      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          const result = await response.json();
          
          let botMessage = "Oops! Something went wrong. Please try again.";
          if (result.candidates && result.candidates.length > 0) {
              botMessage = result.candidates[0].content.parts[0].text;
          }
          setMessages(prev => [...prev, { sender: 'bot', text: botMessage }]);

      } catch (error) {
          console.error("Error calling Gemini API:", error);
          setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
      } finally {
          setIsTyping(false);
      }
  };

  // --- Render ---
  return (
    <div className="antialiased">
      {/* Side Bars */}
      <div className="hidden md:block fixed bottom-0 left-10 z-10">
        <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-[var(--color-text-body)] after:mt-6">
          <a href="https://github.com/debjit-stack" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-transform"><Github /></a>
          <a href="https://www.linkedin.com/in/debjit-ghosh007/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-transform"><Linkedin /></a>
          <a href="https://leetcode.com/u/debjit7" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-transform"><Code /></a>
        </div>
      </div>
      <div className="hidden md:block fixed bottom-0 right-10 z-10">
        <div className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-[var(--color-text-body)] after:mt-6">
          <a href="mailto:deb.sh02@gmail.com" className="font-mono text-sm tracking-widest [writing-mode:vertical-rl] hover:text-[var(--color-text-accent)] hover:-translate-y-1 transition-all">
            deb.sh02@gmail.com
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
             <a href="#" className="text-[var(--color-text-accent)]">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">01. About</a>
              <a href="#experience" className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">02. Experience</a>
              <a href="#projects" className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">03. Work</a>
              <a href="#contact" className="text-[var(--color-text-accent)] border border-[var(--color-text-accent)] px-5 py-2 rounded-md font-mono hover:bg-[var(--color-accent-bg-hover)] transition-colors">Contact</a>
              <button type="button" onClick={() => setIsWidgetVisible(!isWidgetVisible)} className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]" title="Toggle Chat Widget">
                <Bot className="w-5 h-5" />
              </button>
              <button type="button" onClick={handleThemeToggle} className="p-2 rounded-md text-[var(--color-text-accent)] hover:bg-[var(--color-accent-bg-hover)]">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <button className="md:hidden p-2 rounded-lg text-[var(--color-text-accent)]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[var(--color-surface-primary)] p-6 mx-4 mb-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 text-center">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">01. About</a>
              <a href="#experience" onClick={() => setIsMenuOpen(false)} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">02. Experience</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">03. Work</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono">04. Contact</a>
              <button onClick={() => {setIsWidgetVisible(true); setIsChatOpen(true); setIsMenuOpen(false);}} className="text-[var(--color-text-body)] hover:text-[var(--color-text-accent)] transition-colors font-mono flex items-center justify-center gap-2 pt-4 mt-2 border-t border-[var(--color-border)]">
                <Bot className="w-4 h-4" /> Chat with AI
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6">
        <section className="min-h-screen flex flex-col justify-center">
            <div className="fade-in-up opacity-0 translate-y-5 transition-all duration-500">
                <p className="text-[var(--color-text-accent)] font-mono text-lg mb-4">Hi, my name is</p>
                <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-text-heading)]">Debjit Ghosh.</h1>
                <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-body)] mt-2">I build intelligent web solutions.</h2>
                <p className="mt-6 max-w-xl text-lg">
                    I'm a Full Stack Developer specializing in fusing scalable backend architecture with AI-driven features. Currently, I’m focused on building accessible, human-centered products and pushing the boundaries of what's possible on the web.
                </p>
                <a href="mailto:deb.sh02@gmail.com" className="inline-block mt-12 text-[var(--color-text-accent)] border border-[var(--color-text-accent)] px-8 py-4 rounded-md font-mono text-lg hover:bg-[var(--color-accent-bg-hover)] transition-colors">
                    Get In Touch
                </a>
            </div>
        </section>
        
        <section id="about" className="py-24">
            <h2 className="section-heading numbered-heading">About Me</h2>
            <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-3 text-lg space-y-4">
                    <p>Hello! I'm Debjit. My fascination with technology began not with code, but with circuits and systems during my Electrical Engineering studies. This foundation in logical problem-solving naturally led me to the world of software development, where I discovered a passion for building dynamic and intelligent applications.</p>
                    <p>Today, I have over a year of experience creating robust solutions with the <span className="text-[var(--color-text-accent)]">MERN stack</span>. I thrive on the challenge of integrating complex technologies like <span className="text-[var(--color-text-accent)]">Generative AI</span> to create seamless, intuitive user experiences. My goal is to not just write code, but to engineer solutions that are efficient, scalable, and impactful.</p>
                    <p>Here are a few technologies I’ve been working with recently:</p>
                    <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]" />JavaScript (ES6+)</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]" />TypeScript</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]" />React & Next.js</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]" />Node.js</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]" />MongoDB</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-[var(--color-text-accent)]" />AWS</li>
                    </ul>
                </div>
                <div className="md:col-span-2">
                    <div className="relative w-full h-80 rounded-lg group">
                        <div className="absolute inset-0 bg-[var(--color-text-accent)] opacity-80 rounded-lg transform transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                        <img src="/profile.png" alt="Debjit Ghosh" className="relative w-full h-full object-cover rounded-lg z-10" />
                    </div>
                </div>
            </div>
        </section>

        <section id="experience" className="py-24">
          <h2 className="section-heading numbered-heading">Where I've Worked</h2>
          <div className="glass-card p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[var(--color-text-heading)]">Analyst <span className="text-[var(--color-text-accent)]">@ Virtusa Consulting</span></h3>
            <p className="font-mono my-2 text-sm">March 2024 - May 2025</p>
            <ul className="list-disc list-inside space-y-3 mt-4 text-lg">
              <li>Engineered GenAI image moderation systems for Google, significantly improving system accuracy through rigorous data analysis and pattern recognition.</li>
              <li>Collaborated in an agile environment with cross-functional teams to optimize business processes, achieving a 15% boost in operational efficiency.</li>
              <li>Maintained a consistent 100% accuracy rate in high-volume QA tasks, processing over 1000 data points daily.</li>
            </ul>
          </div>
        </section>

        <section id="projects" className="py-24">
            <h2 className="section-heading numbered-heading">Things I've Built</h2>
            <div className="space-y-20">
              {/* Project 1 */}
              <div className="grid grid-cols-12 gap-4 items-center fade-in-up opacity-0 translate-y-5 transition-all duration-500">
                  <div className="col-span-12 md:col-span-7">
                      <a href="https://concise-content.vercel.app/" target="_blank" rel="noopener noreferrer" className="block w-full h-full glass-card rounded-lg overflow-hidden group">
                         <img src="/aicontent.png" alt="AI Content Summarizer Screenshot" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
                      </a>
                  </div>
                  <div className="col-span-12 md:col-span-5 text-right">
                      <p className="font-mono text-[var(--color-text-accent)]">Featured Project</p>
                      <h3 className="text-3xl font-bold text-[var(--color-text-heading)] my-2">AI Content Summarizer</h3>
                      <div className="p-6 my-4 bg-[var(--color-surface-secondary)] shadow-lg rounded-md">
                          <p>A scalable web app using the Google Gemini API for intelligent text summarization. Features a responsive UI, customizable length options, and persistent history with MongoDB.</p>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-end my-4 font-mono text-sm">
                          <span>React</span><span>Node.js</span><span>MongoDB</span><span>Gemini API</span><span>Tailwind CSS</span>
                      </div>
                      <div className="flex items-center space-x-4 justify-end">
                          <a href="https://github.com/debjit-stack/Ai-Content-Summarizer" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Github className="w-6 h-6" /></a>
                          <a href="https://concise-content.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><ExternalLink className="w-6 h-6" /></a>
                      </div>
                  </div>
              </div>
               {/* Project 2 */}
              <div className="grid grid-cols-12 gap-4 items-center fade-in-up opacity-0 translate-y-5 transition-all duration-500">
                   <div className="col-span-12 md:col-span-5 text-left z-10">
                      <p className="font-mono text-[var(--color-text-accent)]">Featured Project</p>
                      <h3 className="text-3xl font-bold text-[var(--color-text-heading)] my-2">CareConnect Healthcare</h3>
                      <div className="p-6 my-4 bg-[var(--color-surface-secondary)] shadow-lg rounded-md">
                          <p>A comprehensive healthcare platform with role-based access control. Implemented secure JWT authentication and an automated appointment booking and notification system.</p>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start my-4 font-mono text-sm">
                          <span>MERN Stack</span><span>JWT Auth</span><span>Context API</span>
                      </div>
                      <div className="flex items-center space-x-4 justify-start">
                          <a href="https://github.com/debjit-stack/care-connect" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Github className="w-6 h-6" /></a>
                          <a href="https://ccmanagement.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><ExternalLink className="w-6 h-6" /></a>
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-7 md:order-first">
                       <a href="https://ccmanagement.netlify.app/" target="_blank" rel="noopener noreferrer" className="block w-full h-full glass-card rounded-lg overflow-hidden group">
                         <img src="/careconnect.png" alt="CareConnect Healthcare Screenshot" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
                      </a>
                  </div>
              </div>
               {/* Project 3 */}
              <div className="grid grid-cols-12 gap-4 items-center fade-in-up opacity-0 translate-y-5 transition-all duration-500">
                  <div className="col-span-12 md:col-span-7">
                      <a href="https://github.com/debjit-stack/AudioInsights" target="_blank" rel="noopener noreferrer" className="block w-full h-full glass-card rounded-lg overflow-hidden group">
                         <div className="w-full h-full bg-[var(--color-surface-primary)] flex items-center justify-center aspect-video p-8 opacity-75 group-hover:opacity-100 transition-opacity">
                              <span className="font-mono text-2xl text-[var(--color-text-accent)]">Chrome Extension</span>
                         </div>
                      </a>
                  </div>
                  <div className="col-span-12 md:col-span-5 text-right">
                      <p className="font-mono text-[var(--color-text-accent)]">Featured Project</p>
                      <h3 className="text-3xl font-bold text-[var(--color-text-heading)] my-2">AudioInsights AI Analysis</h3>
                      <div className="p-6 my-4 bg-[var(--color-surface-secondary)] shadow-lg rounded-md">
                          <p>A Chrome extension for audio capture from browser tabs with real-time analysis, using AssemblyAI for transcription and Gemini API for comprehensive content insights.</p>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-end my-4 font-mono text-sm">
                         <span>Chrome Extension</span><span>AssemblyAI</span><span>Gemini API</span>
                      </div>
                      <div className="flex items-center space-x-4 justify-end">
                          <a href="https://github.com/debjit-stack/AudioInsights" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Github className="w-6 h-6" /></a>
                      </div>
                  </div>
              </div>
            </div>
        </section>

        <section id="contact" className="py-24 text-center">
            <h2 className="font-mono text-[var(--color-text-accent)] text-lg">04. What's Next?</h2>
            <h3 className="text-5xl font-bold text-[var(--color-text-heading)] mt-4">Get In Touch</h3>
            <p className="text-lg mt-6 max-w-xl mx-auto">
                I'm actively seeking new opportunities to leverage my skills in a challenging environment. Whether you have a project in mind, a question, or just want to connect, my inbox is always open.
            </p>
            <a href="mailto:deb.sh02@gmail.com" className="inline-block mt-12 text-[var(--color-text-accent)] border border-[var(--color-text-accent)] px-8 py-4 rounded-md font-mono text-lg hover:bg-[var(--color-accent-bg-hover)] transition-colors">
                Say Hello
            </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-[var(--color-text-body)]">
            <div className="flex justify-center space-x-6 mb-4 md:hidden">
              <a href="https://github.com/debjit-stack" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Github /></a>
              <a href="https://www.linkedin.com/in/debjit-ghosh007/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Linkedin /></a>
              <a href="https://leetcode.com/u/debjit7" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-accent)]"><Code /></a>
            </div>
            <p className="font-mono text-sm">Designed & Built by Debjit Ghosh</p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <div id="chatbot-widget" className={`fixed bottom-10 right-10 z-50 transition-opacity duration-300 ${isWidgetVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Collapsed state button */}
          <button id="chatbot-opener" onClick={() => setIsChatOpen(true)} className={`bg-[var(--color-surface-primary)] border border-[var(--color-border)] rounded-lg shadow-xl p-4 transition-all duration-300 ${isChatOpen ? 'hidden' : 'flex'} items-center gap-4`}>
              <div className="flex-shrink-0">
                  <span className="text-xs text-left opacity-70">Chat with</span>
                  <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <strong className="text-lg font-bold text-[var(--color-text-heading)]">DG-AI</strong>
                  </div>
              </div>
              <ChevronDown className="w-6 h-6 text-[var(--color-text-body)] opacity-70" />
          </button>

          {/* Expanded state window */}
          <div className={`chatbot transition-all duration-300 ${isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} w-[calc(100vw-40px)] max-w-sm bg-[var(--color-surface-primary)] border border-[var(--color-border)] rounded-xl shadow-2xl flex flex-col`}>
              <header className="p-4 border-b border-[var(--color-border)] flex justify-between items-center">
                  <h2 className="text-lg font-bold text-[var(--color-text-heading)]">Chat with <strong>DG-AI</strong></h2>
                  <button type="button" onClick={() => setIsChatOpen(false)} className="text-[var(--color-text-body)]"><ChevronDown /></button>
              </header>
              <ul ref={chatboxRef} className="chatbox overflow-y-auto h-80 p-4 space-y-4">
                  {messages.length === 0 && (
                      <div className="initial-view flex flex-col justify-center items-center h-full text-center">
                          <Bot className="w-20 h-20 mx-auto mb-4 text-[var(--color-text-body)] opacity-30" />
                          <h3 className="font-semibold text-lg text-[var(--color-text-heading)]">Send a message to start the chat!</h3>
                          <p className="text-sm mt-2 opacity-80">You can ask me anything about Debjit and I'll find the relevant information!</p>
                      </div>
                  )}
                  {messages.map((msg, index) => (
                      <li key={index} className={`chat flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <p className={`max-w-[75%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[var(--color-text-accent)] text-[var(--color-bg)] rounded-br-none' : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-body)] rounded-bl-none'}`}>
                              {msg.text}
                          </p>
                      </li>
                  ))}
                  {isTyping && (
                      <li className="chat flex justify-start">
                          <div className="typing-indicator flex items-center gap-2 p-3 bg-[var(--color-surface-secondary)] rounded-2xl rounded-bl-none">
                              <span></span><span></span><span></span>
                          </div>
                      </li>
                  )}
              </ul>
              <form onSubmit={handleChatSubmit} className="chat-input p-4 border-t border-[var(--color-border)] flex items-center gap-3">
                  <button type="button" onClick={clearChat} title="Clear chat" className="text-[var(--color-text-body)] hover:text-red-500"><Trash2/></button>
                  <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask something..." className="flex-1 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-full px-4 py-2 outline-none focus:border-[var(--color-text-accent)] resize-none" onKeyDown={(e) => {if(e.key === 'Enter' && !e.shiftKey) {e.preventDefault(); handleChatSubmit(e);}}}></textarea>
                  <button type="submit" title="Send" className="bg-[var(--color-text-accent)] text-[var(--color-bg)] p-2 rounded-full disabled:opacity-50" disabled={!userInput.trim() || isTyping}><Send /></button>
              </form>
          </div>
      </div>
    </div>
  );
}

// Resume data to be used by the chatbot
const RESUME_DATA = `
DEBJIT GHOSH - Full Stack Developer | MERN Stack Specialist
- Email: deb.sh02@gmail.com
- Phone: +91 8509060187
- Links: LinkedIn (linkedin.com/in/debjit-ghosh007/), GitHub (github.com/debjit-stack), LeetCode (leetcode.com/u/debjit7)

PROFESSIONAL SUMMARY:
Full Stack Developer with over 1 year of experience in the MERN stack and JavaScript technologies. Expertise in scalable web applications, AI integration, and user-focused solutions. Proven ability to improve operational efficiency by 15% through GenAI implementation and cross-functional collaboration.

TECHNICAL SKILLS:
- Programming Languages: JavaScript ES6+, TypeScript
- Frontend Development: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit, Responsive Design
- Backend Development: Node.js, Express.js, RESTful API Development, JWT Authentication, Microservices
- Database Management: MongoDB, MySQL, MongoDB Atlas, Database Design, Query Optimization
- Cloud & DevOps: Amazon Web Services (AWS EC2, S3, Lambda), Docker, Git, GitHub, CI/CD Pipelines, Vercel, Render
- Development Tools: Visual Studio Code, Postman, npm, Webpack, Babel

KEY PROJECTS:
1. AI-Powered Content Summarizer:
   - Tech: React.js, Node.js, MongoDB, Gemini API
   - Description: Built a scalable web application with Google Gemini API for intelligent text summarization with customizable length options. Implemented MongoDB Atlas for persistent history with search, filter, and deletion functionality. Deployed on Vercel and Render.
2. CareConnect Healthcare Management:
   - Tech: MERN Stack, JWT, Context API
   - Description: Developed a healthcare platform with role-based access control for 4 user types (Admin, Doctors, Patients, Receptionists). Implemented secure JWT authentication, protected routes, and an appointment booking system with automated scheduling and notifications.
3. AudioInsights AI Audio Analysis:
   - Tech: Chrome Extension, AssemblyAI, Gemini API
   - Description: Developed a Chrome extension for audio capture from browser tabs. Engineered a backend pipeline with AssemblyAI for speech-to-text transcription and integrated Google Gemini API for comprehensive content analysis. Includes a dynamic dashboard with a MongoDB backend.

PROFESSIONAL EXPERIENCE:
- Role: Analyst
- Company: Virtusa Consulting Services
- Duration: March 2024 - May 2025
- Location: Hyderabad, India
- Responsibilities:
  - Developed GenAI image moderation systems for Google, improving system accuracy through data analysis.
  - Collaborated with cross-functional teams to optimize business processes, improving operational efficiency by 15%.
  - Maintained 100% accuracy in quality assurance tasks, processing 1000+ daily data points.

EDUCATION:
- Bachelor of Technology - Electrical Engineering, Academy of Technology (CGPA: 8.87/10), 2019-2023.
- Higher Secondary Education, Ranaghat P.C High School (67.6%), 2019.

CERTIFICATIONS & ACHIEVEMENTS:
- AWS Cloud Practitioner: Currently pursuing.
- Python Programming: Coursera.
- Generative AI: Completed AI Fundamentals, LLMs, GitHub.
`;

export default App;

