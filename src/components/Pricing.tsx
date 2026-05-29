import { useState, useEffect, useRef } from 'react';
import { 
    Check, 
    ArrowRight, 
    Zap, 
    SlidersHorizontal, 
    Layers, 
    Cpu, 
    Database, 
    Shield, 
    ChevronDown, 
    HelpCircle,
    Info
} from 'lucide-react';
import './css/Pricing.css';

// Interfaces for structured data
interface SpecItem {
    label: string;
    starter: string;
    professional: string;
    enterprise: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

const Pricing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [billingModel, setBillingModel] = useState<'project' | 'retainer'>('project');
    const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Interactive Scope Estimator State
    const [viewsCount, setViewsCount] = useState<number>(5);
    const [aiSophistication, setAiSophistication] = useState<'none' | 'basic' | 'agentic'>('basic');
    const [databaseScale, setDatabaseScale] = useState<'sqlite' | 'sql' | 'distributed'>('sql');
    const [devOpsConfig, setDevOpsConfig] = useState<'basic' | 'cicd' | 'terraform'>('cicd');

    // Dynamic mouse tracking coordinates for glowing hover effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    // Pricing Tiers (Fixed Scope Projects)
    const projectTiers = [
        {
            id: 'starter',
            name: 'MVP Launch',
            tagline: 'Ideal for early-stage ventures',
            price: '15,000',
            period: 'one-time starting at',
            features: [
                'Single-page web application',
                'React 19 + TypeScript foundation',
                'Responsive design (mobile-first)',
                'Basic AI integration (API wrapper)',
                'Clean styling design system',
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
            tagline: 'Perfect for fast-growing platforms',
            price: '35,000',
            period: 'one-time starting at',
            features: [
                'Multi-page responsive application',
                'Advanced AI (LLM orchestration & RAG)',
                'Custom secure backend API development',
                'Optimized database architecture',
                'JWT Authentication & access roles',
                'Automated CI/CD deployment pipelines',
                '90 days priority support',
                'Comprehensive audit & logs'
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
            tagline: 'For critical global digital systems',
            price: '65,000',
            period: 'one-time starting at',
            features: [
                'Complex multi-service architecture',
                'Custom ML model pipeline integrations',
                'Microservices with event-driven design',
                'SOC2-ready secure design layers',
                'Distributed real-time data pipelines',
                'Fully multi-region cloud clustering',
                'Dedicated engineering squad',
                '1 year premium SLA & maintenance'
            ],
            specs: {
                delivery: '12+ weeks',
                revisions: 'Unlimited',
                support: '1 year'
            },
            highlighted: false
        }
    ];

    // Retainer Tiers (Ongoing Dedicated Sprint Pods)
    const retainerTiers = [
        {
            id: 'ret-starter',
            name: 'Developer Sprint',
            tagline: 'Ongoing sprint capacity',
            price: '9,500',
            period: 'month',
            features: [
                '80 hours/mo dedicated capacity',
                'Full-stack engineering focus',
                'Weekly delivery sprint reviews',
                'Direct Slack communications',
                'Standard SLA (24h response time)',
                'Source code ownership',
                'Flexible scope adjustments'
            ],
            specs: {
                delivery: 'Bi-weekly cycle',
                revisions: 'Continuous',
                support: 'Standard SLA'
            },
            highlighted: false
        },
        {
            id: 'ret-professional',
            name: 'Scale-Up Pod',
            tagline: 'Our most popular retainer team',
            price: '18,000',
            period: 'month',
            features: [
                '160 hours/mo dedicated capacity',
                'Cross-functional team execution',
                'Weekly architecture reviews',
                'Priority ticket queue placement',
                'Fast response SLA (12h response)',
                'CI/CD & DevOps configuration',
                'Dedicated Technical Project Manager'
            ],
            specs: {
                delivery: 'Weekly cycles',
                revisions: 'Continuous',
                support: 'Priority SLA'
            },
            highlighted: true
        },
        {
            id: 'ret-enterprise',
            name: 'Enterprise Core',
            tagline: 'Fully managed engineering squad',
            price: '35,000',
            period: 'month',
            features: [
                'Fully managed multi-person squad',
                '320 hours/mo cross-stack execution',
                'Continuous system monitoring',
                'Critical Response SLA (4h response)',
                'Multi-region Terraform DevOps',
                'SOC2 auditing readiness protocols',
                'Dedicated Solutions Architect oversight'
            ],
            specs: {
                delivery: 'Daily cycles',
                revisions: 'Continuous',
                support: '4h Critical SLA'
            },
            highlighted: false
        }
    ];

    // Specs comparison matrix columns
    const specItems: SpecItem[] = [
        { label: 'Repository Ownership', starter: '100% Transfer', professional: '100% Transfer', enterprise: '100% Transfer' },
        { label: 'Technology Stack', starter: 'React / Vite / TS', professional: 'React / Next.js / Node.js', enterprise: 'Microservices / Custom' },
        { label: 'AI Sophistication', starter: 'Direct API Wrapper', professional: 'LangChain / RAG / Vector DB', enterprise: 'Custom ML & Autonomous Agents' },
        { label: 'Database Architecture', starter: 'Local / SQLite', professional: 'Relational (Postgres/Mongo)', enterprise: 'Multi-region Distributed NoSQL' },
        { label: 'Security & Compliance', starter: 'Standard HTTPS / JWT', professional: 'Role-based Access / Encrypted', enterprise: 'SOC2 / HIPAA Audit Readiness' },
        { label: 'DevOps & Deployment', starter: 'Single-instance Cloud', professional: 'Automated CI/CD Pipeline', enterprise: 'Terraform Multi-region Cluster' },
        { label: 'Response Time SLA', starter: 'N/A', professional: '24 Hours', enterprise: '4 Hours Critical SLA' },
        { label: 'Assigned Engineers', starter: '1 Engineer', professional: '2-3 Core Engineers', enterprise: 'Dedicated Managed Squad' }
    ];

    // FAQ Accordion Data
    const faqItems: FAQItem[] = [
        {
            question: 'Who owns the intellectual property and source code?',
            answer: 'You do. Upon project completion and final payment, 100% of the repository ownership, intellectual property rights, and code assets are transferred directly to your organization under standard MIT or proprietary licenses.'
        },
        {
            question: 'Can we transition from a Fixed-Scope project to a Retainer model later?',
            answer: 'Absolutely. Many of our clients launch their custom products under a Fixed-Scope Build to align budgets and deliverables, then seamlessly transition to a Dedicated Retainer Sprint pod for continuous updates and feature scaling.'
        },
        {
            question: 'What happens if the scope changes mid-project?',
            answer: 'For Fixed-Scope builds, we document scope adjustments through brief change orders, calculating shifts in price and timeline. For Retainers, scope is completely flexible—priorities are adjusted at the start of each weekly sprint.'
        },
        {
            question: 'How do you handle post-launch security and compliance issues?',
            answer: 'Our professional and enterprise tiers include comprehensive security architecture and testing. Post-launch support handles critical updates. For highly compliant environments (SOC2, HIPAA), we recommend our Enterprise tier or Retainer Pods for ongoing compliance audits.'
        }
    ];

    // Intersection Observer for animation entrance
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Calculator Pricing Logic
    const calculateProjectPrice = () => {
        let basePrice = 10000;
        
        // Views count cost
        if (viewsCount <= 3) basePrice += 3000;
        else if (viewsCount <= 8) basePrice += 12000;
        else basePrice += 25000;

        // AI Sophistication cost
        if (aiSophistication === 'basic') basePrice += 5000;
        else if (aiSophistication === 'agentic') basePrice += 12000;

        // Database setup cost
        if (databaseScale === 'sql') basePrice += 5000;
        else if (databaseScale === 'distributed') basePrice += 15000;

        // DevOps cost
        if (devOpsConfig === 'cicd') basePrice += 4000;
        else if (devOpsConfig === 'terraform') basePrice += 10000;

        return basePrice;
    };

    const calculateProjectTimeline = () => {
        let baseWeeks = 2;
        
        if (viewsCount > 3 && viewsCount <= 8) baseWeeks += 3;
        else if (viewsCount > 8) baseWeeks += 6;

        if (aiSophistication === 'basic') baseWeeks += 1;
        else if (aiSophistication === 'agentic') baseWeeks += 2;

        if (databaseScale === 'sql') baseWeeks += 1;
        else if (databaseScale === 'distributed') baseWeeks += 3;

        if (devOpsConfig === 'cicd') baseWeeks += 1;
        else if (devOpsConfig === 'terraform') baseWeeks += 2;

        return baseWeeks;
    };

    const currentEstimatedPrice = calculateProjectPrice();
    const currentEstimatedTimeline = calculateProjectTimeline();

    // Determines which tier best fits the user's estimated project configuration
    const getRecommendedTierId = () => {
        if (currentEstimatedPrice <= 20000) return 'starter';
        if (currentEstimatedPrice > 20000 && currentEstimatedPrice <= 48000) return 'professional';
        return 'enterprise';
    };

    const recommendedTierId = getRecommendedTierId();

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

    const activeTiers = billingModel === 'project' ? projectTiers : retainerTiers;

    return (
        <section
            id="pricing"
            className={`pricing-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
            aria-labelledby="pricing-heading"
        >
            {/* Grid overlay aesthetics */}
            <div className="pricing-grid-overlay" aria-hidden="true"></div>

            <div className="pricing-container">
                {/* Header */}
                <div className="pricing-header">
                    <span className="mono-label" aria-label="Section: Investment Models">
                        // INVESTMENT_MODELS
                    </span>
                    <h2 id="pricing-heading">
                        Predictable <span className="text-gradient">Engagement</span>
                    </h2>
                    <p className="pricing-description">
                        Transparent engineering investment models tailored for hyper-growth startups and critical enterprise platforms.
                    </p>

                    {/* Model Switch Toggle */}
                    <div className="model-toggle-container">
                        <button
                            className={`model-toggle-btn ${billingModel === 'project' ? 'active' : ''}`}
                            onClick={() => setBillingModel('project')}
                            aria-pressed={billingModel === 'project'}
                        >
                            Fixed-Scope Builds
                        </button>
                        <button
                            className={`model-toggle-btn ${billingModel === 'retainer' ? 'active' : ''}`}
                            onClick={() => setBillingModel('retainer')}
                            aria-pressed={billingModel === 'retainer'}
                        >
                            Dedicated Sprint Pods
                        </button>
                        <div 
                            className="model-toggle-slider" 
                            style={{ 
                                transform: billingModel === 'project' ? 'translateX(0)' : 'translateX(100%)' 
                            }}
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Pricing Grid */}
                <div id="pricing-grid" className="pricing-grid" role="tabpanel">
                    {activeTiers.map((tier, index) => {
                        const isRecommended = billingModel === 'project' && tier.id === recommendedTierId;
                        const showPopularHighlight = tier.highlighted || isRecommended;
                        
                        return (
                            <article
                                key={tier.id}
                                className={`pricing-card ${showPopularHighlight ? 'highlighted' : ''} ${isVisible ? 'visible' : ''}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                                onMouseMove={handleMouseMove}
                                aria-label={`${tier.name} pricing tier`}
                            >
                                {/* Active coordination mouse tracking light */}
                                <div className="card-glow" aria-hidden="true"></div>

                                {showPopularHighlight && (
                                    <div className="popular-badge">
                                        <Zap size={14} aria-hidden="true" />
                                        <span>{isRecommended ? 'Recommended Fit' : 'Most Popular'}</span>
                                    </div>
                                )}

                                <div className="pricing-card-header">
                                    <div className="tier-info">
                                        <h3>{tier.name}</h3>
                                        <p className="tier-tagline">{tier.tagline}</p>
                                    </div>

                                    <div className="price-display">
                                        <span className="currency">$</span>
                                        <span className="amount">{tier.price}</span>
                                        <span className="period">/{tier.period}</span>
                                    </div>
                                </div>

                                <div className="pricing-card-body">
                                    <ul className="features-list" role="list">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} role="listitem">
                                                <Check size={16} className="check-icon" aria-hidden="true" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pricing-card-footer">
                                    <div className="pricing-specs-grid">
                                        <div className="pricing-spec-item">
                                            <span className="pricing-spec-label">Cycle/Time</span>
                                            <span className="pricing-spec-value">{tier.specs.delivery}</span>
                                        </div>
                                        <div className="pricing-spec-item">
                                            <span className="pricing-spec-label">Scope Scope</span>
                                            <span className="pricing-spec-value">{tier.specs.revisions}</span>
                                        </div>
                                        <div className="pricing-spec-item">
                                            <span className="pricing-spec-label">Support</span>
                                            <span className="pricing-spec-value">{tier.specs.support}</span>
                                        </div>
                                    </div>

                                    <button
                                        className={`cta-button ${showPopularHighlight ? 'primary' : 'secondary'}`}
                                        onClick={scrollToContact}
                                        aria-label={`Select ${tier.name} engagement model`}
                                    >
                                        {tier.id.includes('enterprise') || tier.id === 'enterprise' ? 'Request Consultation' : 'Select Engagement'}
                                        <ArrowRight size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Scope Calculator section (Visible only for Fixed-Scope selection) */}
                {billingModel === 'project' && (
                    <div className="estimator-section">
                        <div className="estimator-inner">
                            <div className="estimator-header">
                                <div className="header-badge">
                                    <SlidersHorizontal size={14} />
                                    <span>Interactive Scope Estimator</span>
                                </div>
                                <h3>Configure Your Custom Blueprint</h3>
                                <p>Tune our technical variables dynamically to map out resources, pricing, and project scope schedules.</p>
                            </div>

                            <div className="estimator-grid">
                                {/* Left Parameters column */}
                                <div className="estimator-controls">
                                    {/* Slider for views */}
                                    <div className="control-group">
                                        <div className="control-label">
                                            <div className="label-title">
                                                <Layers size={16} />
                                                <span>Application Views / Screens</span>
                                            </div>
                                            <span className="control-val-badge">{viewsCount} Views</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
                                            value={viewsCount}
                                            onChange={(e) => setViewsCount(parseInt(e.target.value))}
                                            className="custom-range-slider"
                                            aria-label="Number of Views"
                                        />
                                        <div className="range-labels">
                                            <span>1 view (Simple)</span>
                                            <span>20 views (Complex Platform)</span>
                                        </div>
                                    </div>

                                    {/* Select for AI Sophistication */}
                                    <div className="control-group">
                                        <div className="control-label">
                                            <div className="label-title">
                                                <Cpu size={16} />
                                                <span>AI Sophistication Layer</span>
                                            </div>
                                        </div>
                                        <div className="custom-segmented-control">
                                            <button
                                                className={`segment-btn ${aiSophistication === 'none' ? 'active' : ''}`}
                                                onClick={() => setAiSophistication('none')}
                                            >
                                                Standard (No AI)
                                            </button>
                                            <button
                                                className={`segment-btn ${aiSophistication === 'basic' ? 'active' : ''}`}
                                                onClick={() => setAiSophistication('basic')}
                                            >
                                                LLM Wrapper
                                            </button>
                                            <button
                                                className={`segment-btn ${aiSophistication === 'agentic' ? 'active' : ''}`}
                                                onClick={() => setAiSophistication('agentic')}
                                            >
                                                Multi-Agent RAG
                                            </button>
                                        </div>
                                    </div>

                                    {/* Database Scaling */}
                                    <div className="control-group">
                                        <div className="control-label">
                                            <div className="label-title">
                                                <Database size={16} />
                                                <span>Database & State Storage</span>
                                            </div>
                                        </div>
                                        <div className="custom-segmented-control">
                                            <button
                                                className={`segment-btn ${databaseScale === 'sqlite' ? 'active' : ''}`}
                                                onClick={() => setDatabaseScale('sqlite')}
                                            >
                                                Lightweight / SQL
                                            </button>
                                            <button
                                                className={`segment-btn ${databaseScale === 'sql' ? 'active' : ''}`}
                                                onClick={() => setDatabaseScale('sql')}
                                            >
                                                Secure Scaled API
                                            </button>
                                            <button
                                                className={`segment-btn ${databaseScale === 'distributed' ? 'active' : ''}`}
                                                onClick={() => setDatabaseScale('distributed')}
                                            >
                                                Global Sync Cluster
                                            </button>
                                        </div>
                                    </div>

                                    {/* DevOps & Cloud setup */}
                                    <div className="control-group">
                                        <div className="control-label">
                                            <div className="label-title">
                                                <Shield size={16} />
                                                <span>DevOps & Security Compliance</span>
                                            </div>
                                        </div>
                                        <div className="custom-segmented-control">
                                            <button
                                                className={`segment-btn ${devOpsConfig === 'basic' ? 'active' : ''}`}
                                                onClick={() => setDevOpsConfig('basic')}
                                            >
                                                Direct Hosting
                                            </button>
                                            <button
                                                className={`segment-btn ${devOpsConfig === 'cicd' ? 'active' : ''}`}
                                                onClick={() => setDevOpsConfig('cicd')}
                                            >
                                                Automated CI/CD
                                            </button>
                                            <button
                                                className={`segment-btn ${devOpsConfig === 'terraform' ? 'active' : ''}`}
                                                onClick={() => setDevOpsConfig('terraform')}
                                            >
                                                Terraform / SOC2
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Output column */}
                                <div className="estimator-outputs">
                                    <div className="output-card">
                                        <div className="output-top">
                                            <div className="output-item">
                                                <span className="output-lbl">Indicative Pricing</span>
                                                <div className="val-group">
                                                    <span className="curr">$</span>
                                                    <span className="val-pricing text-gradient">
                                                        {currentEstimatedPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="output-item">
                                                <span className="output-lbl">Projected Schedule</span>
                                                <span className="val-duration">
                                                    {currentEstimatedTimeline} Weeks
                                                </span>
                                            </div>
                                        </div>

                                        <div className="output-match-badge">
                                            <Info size={14} />
                                            <span>
                                                Matches Model Recommendation:{' '}
                                                <strong>
                                                    {projectTiers.find((t) => t.id === recommendedTierId)?.name}
                                                </strong>
                                            </span>
                                        </div>

                                        <p className="output-notice">
                                            *This estimator computes project pricing based on typical developer allocations, server integrations, and scoping cycles. A technical architect will confirm absolute specifications during discovery.
                                        </p>

                                        <button
                                            className="cta-button primary"
                                            onClick={scrollToContact}
                                            aria-label="Confirm estimated architecture"
                                        >
                                            Lock In This Scoped Blueprint
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Specs comparison accordion */}
                <div className="specs-accordion-container">
                    <button
                        className="specs-accordion-trigger"
                        onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                        aria-expanded={isSpecsExpanded}
                        aria-controls="specs-comparison-matrix"
                    >
                        <span>{isSpecsExpanded ? 'Hide Technical Spec Matrix' : 'Expand Technical Spec Matrix'}</span>
                        <ChevronDown 
                            className={`chevron-icon ${isSpecsExpanded ? 'rotated' : ''}`} 
                            size={18} 
                        />
                    </button>

                    <div
                        id="specs-comparison-matrix"
                        className={`specs-accordion-content ${isSpecsExpanded ? 'open' : ''}`}
                    >
                        <div className="specs-table-wrapper">
                            <table className="specs-table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-feat">Engine Core Variable</th>
                                        <th scope="col">MVP Launch</th>
                                        <th scope="col">Full Stack Build</th>
                                        <th scope="col">Enterprise Scale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specItems.map((spec, index) => (
                                        <tr key={index}>
                                            <td className="col-feat">{spec.label}</td>
                                            <td>{spec.starter}</td>
                                            <td className="highlighted-col">{spec.professional}</td>
                                            <td>{spec.enterprise}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <div className="faq-header">
                        <span className="mono-label" aria-label="FAQ label">
                            // COMMON_QUERIES
                        </span>
                        <h3>Frequently Scoped Variables</h3>
                    </div>

                    <div className="faq-accordion-grid" role="list">
                        {faqItems.map((faq, index) => {
                            const isOpen = activeFaq === index;
                            return (
                                <article
                                    key={index}
                                    className={`faq-card ${isOpen ? 'open' : ''}`}
                                    role="listitem"
                                >
                                    <button
                                        className="faq-question-btn"
                                        onClick={() => setActiveFaq(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="question-text">
                                            <HelpCircle size={16} className="faq-icon" />
                                            <span>{faq.question}</span>
                                        </div>
                                        <ChevronDown className="faq-chevron" size={16} />
                                    </button>
                                    <div className="faq-answer-container">
                                        <div className="faq-answer-content">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="pricing-footer">
                    <p>
                        All engineering allocations are indicative.
                        <button onClick={scrollToContact} className="footer-link">
                            Schedule a technical discovery sprint
                        </button>
                        to solidify custom architectures.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;