import { useState, useEffect, useRef } from 'react';
import { Cpu, Globe, Zap, Cloud, ArrowRight } from 'lucide-react';
import './css/Services.css';

const Services = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const sectionRef = useRef(null);

    const services = [
        {
            id: "SRV_01",
            title: "Neural Integration",
            description: "Implementation of custom LLM wrappers, vector databases, and autonomous agents into existing enterprise architecture.",
            icon: Cpu,
            tags: ["OpenAI", "LangChain", "Pinecone"]
        },
        {
            id: "SRV_02",
            title: "High-Scale Web Systems",
            description: "Engineering low-latency, responsive interfaces using React 19 and Next.js for high-traffic environments.",
            icon: Globe,
            tags: ["React", "TypeScript", "Next.js"]
        },
        {
            id: "SRV_03",
            title: "Logic Automation",
            description: "Developing robust backend pipelines to automate repetitive business logic and reduce operational overhead.",
            icon: Zap,
            tags: ["Node.js", "Python", "Workflows"]
        },
        {
            id: "SRV_04",
            title: "Cloud Infrastructure",
            description: "Architecting serverless environments and CI/CD pipelines for secure, auto-scaling deployment.",
            icon: Cloud,
            tags: ["AWS", "Docker", "Terraform"]
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

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            const offset = 80;
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section
            id="services"
            className={`services-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
            aria-labelledby="services-heading"
        >
            <div className="services-container">
                <div className="services-header">
                    <span className="mono-label" aria-label="Section label: Capabilities">
                        // CAPABILITIES
                    </span>
                    <h2 id="services-heading">
                        Technical <span className="text-white">Expertise</span>
                    </h2>
                    <p className="services-lead">
                        We specialize in solving complex engineering problems through modern software patterns.
                    </p>
                </div>

                <div className="services-grid" role="list">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <article
                                key={index}
                                className={`service-card ${isVisible ? 'visible' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                aria-label={`${service.title} service`}
                                role="listitem"
                            >
                                <div className="service-card-top">
                                    <div className="service-icon-wrapper">
                                        <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <span className="service-id" aria-label={`Service ID: ${service.id}`}>
                                        {service.id}
                                    </span>
                                </div>

                                <div className="service-card-body">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>

                                <div className="service-card-footer">
                                    <div className="service-tags" role="list" aria-label="Technologies used">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="service-tag" role="listitem">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        className="service-cta"
                                        onClick={scrollToContact}
                                        aria-label={`Learn more about ${service.title}`}
                                    >
                                        Learn More
                                        <ArrowRight
                                            size={14}
                                            className={hoveredCard === index ? 'arrow-animated' : ''}
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Hover gradient overlay */}
                                <div className="card-glow" aria-hidden="true"></div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;