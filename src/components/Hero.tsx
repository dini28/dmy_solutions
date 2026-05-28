import { useState, useEffect } from 'react';
import './css/Hero.css';

const Hero = () => {
    const [visibleLines, setVisibleLines] = useState(0);

    // Typing animation for code lines
    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines(prev => prev < 4 ? prev + 1 : prev);
        }, 400);
        return () => clearInterval(timer);
    }, []);

    // Smooth scroll function
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    const codeLines = [
        { text: 'Initializing AI Engine...', type: 'info', color: 'blue' },
        { text: 'Neural weights loaded.', type: 'success', color: 'green' },
        { text: 'Optimizing React 19 builds.', type: 'info', color: 'blue' },
        { text: 'System online at 12ms latency.', type: 'ready', color: 'purple' }
    ];

    return (
        <section className="hero-container" aria-label="Hero section">
            <div className="hero-content-wrapper">
                <div className="hero-grid">
                    {/* Left Side: Content */}
                    <div className="hero-left">
                        <div className="status-pill" role="status" aria-live="polite">
                            <span className="dot" aria-hidden="true"></span>
                            <span>Available for Projects</span>
                        </div>

                        <h1>
                            Engineering <br />
                            <span className="highlight">Digital Precision</span>
                        </h1>

                        <p className="hero-description">
                            We build high-performance web applications by bridging the gap
                            between advanced AI infrastructure and intuitive user interface design.
                            No templates. No fluff. Just code.
                        </p>

                        <div className="hero-btns">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="btn-main"
                                aria-label="View our architecture projects"
                            >
                                View Architecture
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="btn-link"
                                aria-label="Schedule a consultation call"
                            >
                                Schedule a Call <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Technical Visual */}
                    <div className="hero-right">
                        <div className="tech-card" role="img" aria-label="Terminal deployment log">
                            <div className="card-header">
                                <div className="window-dots" aria-hidden="true">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="card-title">deployment_v2.log</div>
                            </div>
                            <div className="card-body">
                                {codeLines.map((line, index) => (
                                    <code
                                        key={index}
                                        className={`code-line ${visibleLines > index ? 'visible' : ''}`}
                                        style={{ animationDelay: `${index * 0.4}s` }}
                                    >
                                        <span className={`code-${line.color}`}>{line.type}</span> {line.text}
                                    </code>
                                ))}
                            </div>
                        </div>
                        <div className="floating-stats" aria-label="Performance metric">
                            <div className="stat-item">
                                <span className="label">Performance</span>
                                <span className="value">99.9%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Grid Texture */}
            <div className="grid-overlay" aria-hidden="true"></div>
        </section>
    );
};

export default Hero;