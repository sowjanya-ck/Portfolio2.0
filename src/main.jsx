import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Server,
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
  { id: "contact", label: "Contact" },
];

const focusAreas = [
  {
    icon: Code2,
    title: "Interface Development",
    detail: "React, JavaScript, HTML, CSS, responsive layouts",
  },
  {
    icon: Server,
    title: "Application Logic",
    detail: "Node.js, Express, Python, Flask, Django, Rails",
  },
  {
    icon: Database,
    title: "Data Foundations",
    detail: "SQL, DBMS, OOP, Java, C++, problem solving",
  },
];

const skillLogos = [
  { name: "HTML5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Stimulus", image: "https://cdn.simpleicons.org/stimulus/77E8B9" },
  { name: "Shopify", image: "https://cdn.simpleicons.org/shopify/7AB55C" },
  { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flask", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Django", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Ruby on Rails", image: "https://cdn.simpleicons.org/rubyonrails/CC0000" },
  { name: "PostgreSQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
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

  const featuredTags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).slice(0, 12),
    []
  );

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
            <p className="hello">Hi, I'm Sowjanya.</p>
            <h1>I design, develop, and deliver software solutions that solve real-world business challenges.</h1>
            <p className="hero-text">
              With experience across frontend interfaces, backend systems, APIs, databases, and application
              architecture, I enjoy building products that are both functional and scalable.
            </p>
            <p className="hero-text">
              My toolkit includes React, JavaScript, Python, Node.js, Django, Flask, Rails, and SQL, enabling
              me to transform ideas into reliable and efficient applications.
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

          <section className="hero-visual" aria-label="Developer illustration">
            <div className="profile-orbit">
              <img src="/assets/me.png" alt="Sowjanya Kumari" />
              <div className="orbit-card top">
                <Sparkles size={18} />
                Software Developer
              </div>
              <div className="orbit-card bottom">
                <BriefcaseBusiness size={18} />
                Dayspring
              </div>
            </div>
          </section>
        </header>

        <section className="section page-shell" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Technical Stack</p>
            <h2>Tools and fundamentals I use to build complete applications.</h2>
          </div>
          <div className="what-i-do">
            <div className="skill-visual" aria-hidden="true">
              <div className="screen-card">
                <div className="screen-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <code>const developer = "Sowjanya";</code>
                <code>developer.solve(["frontend", "backend", "data"]);</code>
                <code>developer.create(["apps", "systems", "workflows"]);</code>
                <div className="focus-bands">
                  {focusAreas.map(({ icon: Icon, title, detail }) => (
                    <div className="focus-band" key={title}>
                      <Icon size={18} />
                      <div>
                        <strong>{title}</strong>
                        <span>{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="logo-cloud" aria-label="Technology skills">
            {skillLogos.map((skill, index) => (
                <article className="logo-tile" style={{ animationDelay: `${index * 80}ms` }} key={skill.name}>
                  <img src={skill.image} alt={`${skill.name} logo`} aria-label={skill.name} loading="lazy" />
                  <span className="skill-tooltip" aria-hidden="true">{skill.name}</span>
                </article>
              ))}
          </div>
          <div className="tech-strip">
            {featuredTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="section page-shell" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Work Experience</p>
            <h2>Current role and hands-on development work.</h2>
          </div>
          <article className="experience-card">
            <div className="company-mark">D</div>
            <div>
              <div className="experience-title">
                <div>
                  <h3>Software Developer</h3>
                  <p>Dayspring</p>
                </div>
                <span>Current Role</span>
              </div>
              <ul>
                <li>Develop application features that support clear user flows, responsive screens, and reliable interactions.</li>
                <li>Contribute to frontend, backend, database, debugging, and integration tasks in a professional team environment.</li>
                <li>Use programming fundamentals and web technologies to improve real software used in day-to-day workflows.</li>
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

        <section className="section page-shell education-section">
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
        <p>Copyright © 2026 Sowjanya Kumari</p>
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
