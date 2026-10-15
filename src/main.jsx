import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import "./styles.css";

const emailConfig = {
  serviceId: "service_8ll93ii",
  templateId: "template_go0jz2s",
  publicKey: "kzivRay5IPvy4cyFq",
};

const navItems = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const skillGroups = [
  { title: "Frontend", items: ["React", "JavaScript", "HTML", "CSS", "Responsive UI"] },
  { title: "Backend", items: ["Node.js", "Express", "Python", "Django", "Flask", "Ruby on Rails"] },
  { title: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "SQL"] },
  { title: "AI-enabled workflow", items: ["AI-assisted coding", "Prompting and iteration", "Code review support", "Machine learning fundamentals"] },
];

const projects = [
  {
    title: "Courier Service Management",
    category: "Full Stack",
    tags: ["Flask", "PostgreSQL", "Python", "HTML", "CSS"],
    image: "/assets/courier.png",
    summary:
      "A management system for handling courier records, customer details, delivery status, and billing calculations in one place.",
  },
  {
    title: "E-Learning Application",
    category: "Full Stack",
    tags: ["Django", "HTML", "CSS", "JavaScript"],
    image: "/assets/elearn.png",
    summary:
      "An online learning portal with classes, shared study material, attendance support, career guidance, and a built-in coding compiler.",
  },
  {
    title: "Fake News Detection Using ML",
    category: "Machine Learning",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    image: "/assets/fake-news.png",
    summary:
      "A machine learning project that analyzes article text and classifies news as real or fake using trained models.",
  },
  {
    title: "Quiz Application",
    category: "MERN",
    tags: ["React", "MongoDB", "Node.js", "Express"],
    image: "/assets/quiz.png",
    summary:
      "A MERN-based quiz platform with timed questions, topic selection, score tracking, and answer review.",
    github: "https://github.com/sowjanya-ck/Quiz-using-MERN.git",
  },
  {
    title: "Weather Forecast",
    category: "Frontend",
    tags: ["HTML", "CSS", "JavaScript", "API"],
    image: "/assets/weather.png",
    summary:
      "A weather dashboard that shows live temperature, humidity, and wind details from a location-based API.",
    github: "https://github.com/sowjanya-ck/weather-forecast",
  },
  {
    title: "ChatterBot",
    category: "Software",
    tags: ["C++"],
    image: "/assets/chatbot.png",
    summary:
      "A C++ chatbot that reads user input, matches keywords, and responds from a simple knowledge base.",
    github: "https://github.com/sowjanya-ck/Chatbot",
  },
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailForm, setEmailForm] = useState({ name: "", subject: "", message: "" });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setEmailModalOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = emailModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [emailModalOpen]);

  const openEmailModal = () => {
    setEmailStatus("");
    setEmailModalOpen(true);
  };

  const submitEmail = async (event) => {
    event.preventDefault();
    setEmailStatus("Sending...");

    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
        user_name: emailForm.name,
        subject: emailForm.subject,
        message: emailForm.message,
      }, emailConfig.publicKey);
      setEmailForm({ name: "", subject: "", message: "" });
      setEmailStatus("Message sent.");
    } catch {
      setEmailStatus("Send failed. Use the email link instead.");
    }
  };

  return (
    <>
      <nav className="navbar">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <span>SK</span>
          Sowjanya Kumari
        </a>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      <main>
        <header className="hero page-shell" id="home">
          <section className="hero-copy">
            <p className="hello">Software Developer | Bengaluru, India</p>
            <h1>I build reliable software that makes everyday work simpler.</h1>
            <p className="hero-text">
              I am Sowjanya Kumari, a software developer at Dayspring. I work across application interfaces,
              backend logic, and data, and use AI tools to explore solutions and move through implementation
              faster, with review and engineering judgment in the loop.
            </p>
            <div className="social-row">
              <a href="https://github.com/sowjanya-ck" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={21} />
              </a>
              <a href="https://www.linkedin.com/in/sowjanya-kulal-741911223/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={21} />
              </a>
              <a href="mailto:sowjanyakulal2293@gmail.com" aria-label="Email">
                <Mail size={21} />
              </a>
            </div>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={openEmailModal}>
                Contact Me
                <Mail size={18} />
              </button>
              <a className="button secondary" href="/assets/SowjanyaKumari.pdf" download>
                Download Resume
                <Download size={18} />
              </a>
            </div>
          </section>

          <section className="hero-visual" aria-label="Animated software workspace">
            <img className="hero-workspace-image" src="/assets/software-workspace.svg" alt="Animated project dashboard connected to code, API, and data panels" />
          </section>
        </header>

        <section className="section page-shell" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Technical Stack</p>
            <h2>Tools and fundamentals I use to build complete applications.</h2>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="chip-row">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
          <aside className="ai-note">
            <Sparkles size={21} />
            <div>
              <h3>AI is part of my everyday toolkit</h3>
              <p>I use AI to explore approaches and move through implementation faster, while keeping code review, testing, and engineering judgment in the loop.</p>
            </div>
          </aside>
        </section>

        <section className="section page-shell" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Work Experience</p>
            <h2>Building and improving software with a product-minded team.</h2>
          </div>
          <article className="experience-card">
            <div className="company-mark">D</div>
            <div>
              <div className="experience-title">
                <div>
                  <h3>Software Developer</h3>
                  <p>Dayspring</p>
                </div>
                <span>Current</span>
              </div>
              <ul>
                <li>Contribute to end-to-end feature delivery, from understanding requirements through implementation and refinement.</li>
                <li>Work across UI, application logic, APIs, and data while debugging issues and collaborating with teammates.</li>
                <li>Use company-approved AI tools to accelerate exploration and coding, then validate and refine the results.</li>
              </ul>
            </div>
          </article>
        </section>

        <section className="section page-shell" id="projects">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>Project work across web development, databases, and applied ML.</h2>
            </div>
            <a className="inline-link" href="https://github.com/sowjanya-ck" target="_blank" rel="noreferrer">
              More on GitHub
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-image">
                  <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                </div>
                <div className="project-content">
                  <span className="category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="chip-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.github && (
                    <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                      <Github size={18} />
                      Source Code
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-shell education-section" id="education">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic background.</h2>
          </div>
          <article className="education-card">
            <GraduationCap size={34} />
            <div>
              <h3>B.Tech in Computer Science Engineering</h3>
              <p>PES University, 2023</p>
              <span>Built a foundation in programming, DBMS, computer networks, software engineering, web development, and core computer science subjects.</span>
            </div>
          </article>
        </section>

        <section className="section page-shell contact-section" id="contact">
          <div className="contact-card">
            <p className="eyebrow">Contact Me</p>
            <h2>Have a role, project, or collaboration in mind?</h2>
            <p className="contact-copy">
              I am available for software developer opportunities and technical conversations.
              You can contact me by email, connect on LinkedIn, or download my resume here.
            </p>
            <div className="contact-actions">
              <button className="button primary" type="button" onClick={openEmailModal}>
                <Mail size={18} />
                Email Me
              </button>
              <a className="button secondary" href="/assets/SowjanyaKumari.pdf" download>
                <Download size={18} />
                Download Resume
              </a>
              <a className="button secondary" href="https://www.linkedin.com/in/sowjanya-kulal-741911223/" target="_blank" rel="noreferrer">
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer page-shell">
        <p>Copyright (c) 2026 Sowjanya Kumari</p>
        <p>All rights reserved.</p>
      </footer>

      {emailModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Email me form">
          <button className="modal-scrim" type="button" aria-label="Close email modal" onClick={() => setEmailModalOpen(false)} />
          <form className="modal-card" onSubmit={submitEmail}>
            <div className="modal-head">
              <div>
                <p className="eyebrow">Email Me</p>
                <h3>Send a message</h3>
              </div>
              <button className="icon-button" type="button" aria-label="Close modal" onClick={() => setEmailModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <label>
              Name
              <input
                type="text"
                value={emailForm.name}
                onChange={(event) => setEmailForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>
            <label>
              Subject
              <input
                type="text"
                value={emailForm.subject}
                onChange={(event) => setEmailForm((current) => ({ ...current, subject: event.target.value }))}
                required
              />
            </label>
            <label>
              Content
              <textarea
                rows="5"
                value={emailForm.message}
                onChange={(event) => setEmailForm((current) => ({ ...current, message: event.target.value }))}
                required
              />
            </label>
            <button className="button primary" type="submit">
              <Send size={18} />
              Submit
            </button>
            <p className="form-status" role="status">
              {emailStatus}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
