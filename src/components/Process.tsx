import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './css/Process.css';

const Process = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
    const sectionRef = useRef(null);

    const steps = [
        {
            id: "01",
            title: "Technical Audit",
            label: "Discovery",
            description: "Deep dive into your current infrastructure to identify bottlenecks and high-impact AI opportunities.",
            duration: "1-2 weeks",
            deliverables: ["Infrastructure Report", "Bottleneck Analysis", "AI Opportunity Map"]
        },
        {
            id: "02",
            title: "Architecture Design",
            label: "Strategy",
            description: "Developing a robust blueprint mapping out data flow, model selection, and frontend scalability.",
            duration: "2-3 weeks",
            deliverables: ["System Blueprint", "Tech Stack Selection", "Scalability Plan"]
        },
        {
            id: "03",
            title: "Core Engineering",
            label: "Build",
            description: "Iterative development cycles using modern tech stacks and custom-trained neural networks.",
            duration: "6-8 weeks",
            deliverables: ["MVP Build", "Neural Networks", "API Integration"]
        },
        {
            id: "04",
            title: "Production Release",
            label: "Launch",
            description: "Automated CI/CD deployment followed by real-time monitoring and latency optimization.",
            duration: "1-2 weeks",
            deliverables: ["Live Deployment", "Monitoring Setup", "Performance Tuning"]
        }
    ];

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="process"
            className={`process-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
            aria-labelledby="process-heading"
        >
            <div className="process-container">
                {/* Header */}
                <div className="process-header">
                    <div className="header-top">
                        <span className="mono-label" aria-label="Section label: How we work">
                            // HOW_WE_WORK
                        </span>
                    </div>
                    <h2 id="process-heading">
                        Systematic <span className="text-gradient">Execution</span>
                    </h2>
                    <p className="header-description">
                        A battle-tested methodology that transforms complex requirements into production-ready solutions
                    </p>
                </div>

                {/* Process Grid */}
                <div className="process-grid" role="list">
                    {steps.map((item, index) => (
                        <article
                            key={index}
                            className={`phase-card ${isVisible ? 'visible' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setHoveredPhase(index)}
                            onMouseLeave={() => setHoveredPhase(null)}
                            aria-label={`Phase ${item.id}: ${item.title}`}
                        >
                            {/* Card Header */}
                            <div className="card-header">
                                <div className="phase-number-wrapper">
                                    <span className="phase-number">{item.id}</span>
                                    <div className="number-glow"></div>
                                </div>
                                <span className="phase-label">{item.label}</span>
                            </div>

                            {/* Card Body */}
                            <div className="card-body">
                                <h3 className="phase-title">{item.title}</h3>
                                <p className="phase-description">{item.description}</p>

                                {/* Duration */}
                                <div className="phase-meta">
                                    <div className="meta-item">
                                        <span className="meta-icon">⏱</span>
                                        <span className="meta-text">{item.duration}</span>
                                    </div>
                                </div>

                                {/* Deliverables */}
                                <div className="deliverables">
                                    <span className="deliverables-label">Key Deliverables</span>
                                    <ul className="deliverables-list">
                                        {item.deliverables.map((deliverable, idx) => (
                                            <li key={idx}>
                                                <ArrowRight size={14} aria-hidden="true" />
                                                {deliverable}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className={`card-overlay ${hoveredPhase === index ? 'active' : ''}`}></div>
                        </article>
                    ))}
                </div>

                {/* Flow Indicator */}
                <div className="flow-indicator" aria-hidden="true">
                    <span className="flow-text">End-to-End Process Flow</span>
                    <div className="flow-line"></div>
                </div>
            </div>
        </section>
    );
};

export default Process;