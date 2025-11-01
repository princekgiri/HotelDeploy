import React from 'react';
import '../Css/About.css';

function About(){
  return(
    <>
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="profile-image-container">
            <div className="profile-image">
              <span className="profile-emoji">👨‍💻</span>
            </div>
            <div className="status-badge">
              <span className="status-dot"></span>
              Available for Opportunities
            </div>
          </div>
          <h1 className="hero-title">Prince Kumar Giri</h1>
          <p className="hero-subtitle">Full-Stack Developer | MERN Stack Enthusiast | BCA Final Year Student</p>
          <div className="hero-location">
            <span className="location-icon">📍</span>
            <span>Lovely Professional University, Punjab, India</span>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p className="about-text">
              Hello! I'm <strong>Prince Kumar Giri</strong>, a passionate Full-Stack Developer and final-year BCA student at 
              <strong> Lovely Professional University</strong>. With a strong foundation in modern web technologies and a 
              runner-up achievement in the Web-Ka-Hackathon, I specialize in building scalable, user-centric applications 
              using the MERN stack.
            </p>
            <p className="about-text">
              My journey in software development is driven by curiosity and a commitment to crafting elegant solutions to 
              complex problems. I thrive on transforming ideas into functional, beautiful applications that make a real impact.
            </p>
            <p className="about-text highlight-text">
              🎯 <strong>Career Goal:</strong> Aspiring to become a proficient Software Engineer, contributing to innovative 
              projects and continuously growing in the ever-evolving tech landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Current Project Section */}
      <section className="project-showcase">
        <div className="container">
          <h2 className="section-title">Featured Project</h2>
          <div className="project-card">
            <div className="project-header">
              <span className="project-icon">🏨</span>
              <h3 className="project-name">Hotel Booking Platform</h3>
              <span className="project-badge">Live Project</span>
            </div>
            <p className="project-description">
              A comprehensive hotel booking and property management system built with the MERN stack. This platform 
              connects property owners with travelers, offering a seamless booking experience with real-time availability, 
              secure payment integration, and intelligent search filters.
            </p>
            <div className="project-features">
              <h4 className="features-title">Key Features:</h4>
              <ul className="features-list">
                <li>🔐 Dual authentication system for hosts and guests</li>
                <li>☁️ Cloud-based media management with Cloudinary & Amazon S3</li>
                <li>💳 Integrated payment gateways (PhonePe, Paytm, Google Pay)</li>
                <li>🔍 Advanced filtering (location, price, amenities, environment)</li>
                <li>📱 Responsive design with modern UI/UX</li>
                <li>⚡ Real-time data synchronization with Redis caching</li>
                <li>📊 Host dashboard for property management and analytics</li>
                <li>🎨 Dynamic image and video uploads with size optimization</li>
              </ul>
            </div>
            <div className="tech-stack">
              <span className="tech-badge">React.js</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">MongoDB</span>
              <span className="tech-badge">Express.js</span>
              <span className="tech-badge">Cloudinary</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">💻</span>
                <h3>Languages</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">C</span>
                <span className="skill-tag">C++</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">⚛️</span>
                <h3>Frameworks & Libraries</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">Tailwind CSS</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">🗄️</span>
                <h3>Databases & Caching</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Redis</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">🛠️</span>
                <h3>Tools & Platforms</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Kubernetes</span>
                <span className="skill-tag">Apache Kafka</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">☁️</span>
                <h3>Cloud & Storage</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Cloudinary</span>
                <span className="skill-tag">Amazon S3</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">🤝</span>
                <h3>Soft Skills</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Problem Solving</span>
                <span className="skill-tag">Time Management</span>
                <span className="skill-tag">Team Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="achievement-section">
        <div className="container">
          <h2 className="section-title">Achievement</h2>
          <div className="achievement-card">
            <div className="achievement-ribbon">
              <span className="ribbon-icon">🏆</span>
            </div>
            <div className="achievement-content">
              <h3 className="achievement-title">Runner-Up | Web-Ka-Hackathon</h3>
              <p className="achievement-date">December 2024 • Lovely Professional University</p>
              <p className="achievement-description">
                Secured 2nd position in an intense 24-hour hackathon, competing against multiple talented teams. 
                Developed a comprehensive <strong>Finance Management System</strong> using the MERN stack, featuring:
              </p>
              <ul className="achievement-highlights">
                <li>Real-time expense tracking and categorization</li>
                <li>Budget management with intelligent alerts</li>
                <li>Data visualization with interactive charts</li>
                <li>Responsive design for cross-platform compatibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="education-timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="education-header">
                  <h3 className="education-degree">Bachelor of Computer Applications (BCA)</h3>
                  <span className="education-year">2023 - Present</span>
                </div>
                <p className="education-institution">Lovely Professional University</p>
                <p className="education-location">Jalandhar, Punjab</p>
                <p className="education-grade">CGPA: 7.3</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="education-header">
                  <h3 className="education-degree">12th Grade (Science Stream)</h3>
                  <span className="education-year">2022 - 2023</span>
                </div>
                <p className="education-institution">Sri Krishna Public School</p>
                <p className="education-location">Jamshedpur, Jharkhand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="interests-section">
        <div className="container">
          <h2 className="section-title">Beyond Code</h2>
          <div className="interests-grid">
            <div className="interest-card">
              <span className="interest-icon">💻</span>
              <h3>Coding</h3>
              <p>Building full-stack applications and exploring system architecture</p>
            </div>
            <div className="interest-card">
              <span className="interest-icon">📚</span>
              <h3>Reading</h3>
              <p>Staying updated with tech trends and best practices</p>
            </div>
            <div className="interest-card">
              <span className="interest-icon">🏗️</span>
              <h3>Architecture</h3>
              <p>Designing scalable and efficient system architectures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-subtitle">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="contact-links">
            <a href="mailto:princekumargiri4378@gmail.com" className="contact-link email-link">
              <span className="link-icon">📧</span>
              <span className="link-text">princekumargiri4378@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/princekumargiri/" target="_blank" rel="noopener noreferrer" className="contact-link linkedin-link">
              <span className="link-icon">💼</span>
              <span className="link-text">LinkedIn Profile</span>
            </a>
            <a href="https://github.com/Prince161724" target="_blank" rel="noopener noreferrer" className="contact-link github-link">
              <span className="link-icon">⚡</span>
              <span className="link-text">GitHub Portfolio</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2025 Prince Kumar Giri. Built with ❤️ using React.js</p>
      </footer>
    </div>
    </>
  )
}

export default About