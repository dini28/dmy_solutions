import { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';
import './css/Pricing.css';

const Pricing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const pricingTiers = [
        {
            id: 'starter',
            name: 'MVP Launch',
            tagline: 'For early-stage startups',
            price: '15,000',
            period: 'one-time',
            features: [
                'Single-page web application',
                'React + TypeScript foundation',
                'Responsive design (mobile-first)',
                'Basic AI integration (API wrapper)',
                '2 weeks delivery timeline',
                'Cloud deployment setup',
                '30 days post-launch support'
            ],
            specs: {
                delivery: '2-3 weeks',
                revisions: '2 rounds',
                support: '30 days'
            },
            highlighted: false
        },
        {
            id: 'professional',
            name: 'Full Stack Build',
            tagline: 'Most popular for growth-stage',
            price: '35,000',
            period: 'one-time',
            features: [
                'Multi-page web application',
                'Advanced AI features (LLM orchestration)',
                'Custom backend API development',
                'Database architecture & optimization',
                'Authentication & authorization',
                'CI/CD pipeline configuration',
                '6-8 weeks delivery timeline',
                '90 days priority support',
                'Performance monitoring setup'
            ],
            specs: {
                delivery: '6-8 weeks',
                revisions: 'Unlimited',
                support: '90 days'
            },
            highlighted: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise Scale',
            tagline: 'For established organizations',
            price: 'Custom',
            period: 'contact us',
            features: [
                'Complex multi-service architecture',
                'Custom ML model training & deployment',
                'Microservices with event-driven design',
                'Advanced security & compliance (SOC2)',
                'Real-time data processing pipelines',
                'Dedicated engineering team',
                'White-glove project management',
                '12+ weeks delivery timeline',
                '1 year premium support & maintenance'
            ],
            specs: {
                delivery: '12+ weeks',
                revisions: 'Unlimited',
                support: '1 year'
            },
            highlighted: false
        }
    ];

    // Intersection Observer
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
            id="pricing"
            className={`pricing-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
            aria-labelledby="pricing-heading"
        >
            <div className="pricing-container">
                {/* Header */}
                <div className="pricing-header">
                    <span className="mono-label" aria-label="Section label: Investment Models">
                        // PROJECT_PRICING
                    </span>
                    <h2 id="pricing-heading">
                        Transparent <span className="text-gradient">Pricing</span>
                    </h2>
                    <p className="pricing-description">
                        Project-based engagement with fixed scope and timeline. All packages include source code ownership and production deployment.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div id="pricing-grid" className="pricing-grid" role="tabpanel">
                    {pricingTiers.map((tier, index) => (
                        <article
                            key={tier.id}
                            className={`pricing-card ${tier.highlighted ? 'highlighted' : ''} ${isVisible ? 'visible' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            aria-label={`${tier.name} pricing tier`}
                        >
                            {tier.highlighted && (
                                <div className="popular-badge">
                                    <Zap size={14} aria-hidden="true" />
                                    <span>Most Popular</span>
                                </div>
                            )}

                            <div className="card-header">
                                <div className="tier-info">
                                    <h3>{tier.name}</h3>
                                    <p className="tier-tagline">{tier.tagline}</p>
                                </div>

                                <div className="price-display">
                                    <span className="currency">$</span>
                                    <span className="amount">{tier.price}</span>
                                    <span className="period">{tier.period}</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <ul className="features-list" role="list">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} role="listitem">
                                            <Check size={18} className="check-icon" aria-hidden="true" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-footer">
                                <div className="specs-grid">
                                    <div className="spec-item">
                                        <span className="spec-label">Delivery</span>
                                        <span className="spec-value">{tier.specs.delivery}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Revisions</span>
                                        <span className="spec-value">{tier.specs.revisions}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Support</span>
                                        <span className="spec-value">{tier.specs.support}</span>
                                    </div>
                                </div>

                                <button
                                    className={`cta-button ${tier.highlighted ? 'primary' : 'secondary'}`}
                                    onClick={scrollToContact}
                                    aria-label={`Get started with ${tier.name} tier`}
                                >
                                    {tier.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                                    <ArrowRight size={16} aria-hidden="true" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="pricing-footer">
                    <p>
                        All pricing is indicative and subject to scope confirmation.
                        <button onClick={scrollToContact} className="footer-link">
                            Schedule a technical discovery call
                        </button>
                        to get a detailed quote.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;