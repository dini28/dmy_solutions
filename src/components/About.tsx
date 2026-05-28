import { useState, useEffect, useRef } from 'react';
import { Zap, Brain, ShieldCheck, LayoutTemplate } from 'lucide-react';
import './css/About.css';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const specItems = [
        {
            icon: Zap,
            title: 'Performance First',
            description: 'Engineered for sub-second LCP and 100/100 Lighthouse scores through edge computing.'
        },
        {
            icon: Brain,
            title: 'AI-Native Design',
            description: 'Native integration with vector databases and LLM orchestration layers from day one.'
        },
        {
            icon: ShieldCheck,
            title: 'Security-Hardened',
            description: 'Enterprise-grade SOC2 compliance patterns and encrypted data transmission protocols.'
        },
        {
            icon: LayoutTemplate,
            title: 'Atomic Precision',
            description: 'Systematic UI development focusing on accessibility and seamless motion curves.'
        }
    ];

    return (
        <section
            id="about"
            className={`about-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
            aria-labelledby="about-heading"
        >
            <div className="about-grid">
                {/* Left Side: Narrative */}
                <div className="about-left">
                    <span className="mono-label" aria-label="Section label: The Mission">
                        // THE_MISSION
                    </span>
                    <h2 id="about-heading">
                        More than just code.<br />
                        <span className="text-muted">We engineer growth.</span>
                    </h2>

                    <div className="about-content">
                        <p>
                            At DMY Solutions, we believe that the future of web development isn't just about making things look good—it's about making them <strong>think</strong>. We merge traditional software engineering with cutting-edge AI to create digital products that learn, adapt, and scale.
                        </p>
                        <p>
                            We don't rely on pre-built templates or bloated frameworks. Every line of code is written with purpose, optimized for performance, and designed to drive tangible business results.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="about-stats">
                        <div className="stat">
                            <span className="stat-value">99.9%</span>
                            <span className="stat-label">Uptime</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">12ms</span>
                            <span className="stat-label">Avg Latency</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">50+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Technical Features */}
                <div className="about-right">
                    <ul className="tech-spec-container" role="list">
                        {specItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={index}
                                    className="spec-item"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    <div className="spec-header">
                                        <div className="icon-wrapper">
                                            <Icon size={18} className="spec-icon" aria-hidden="true" />
                                        </div>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <p>{item.description}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;