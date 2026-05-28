import { useState, useEffect } from 'react';
import './css/Footer.css';


const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [showBackToTop, setShowBackToTop] = useState(false);

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

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Show/hide back to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <footer className="footer-container" role="contentinfo">
                <div className="footer-content">
                    <div className="footer-main-grid">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <button
                                className="logo"
                                onClick={scrollToTop}
                                aria-label="Scroll to top"
                            >
                                <span className="logo-accent">DMY</span>
                                <span className="logo-text">SOLUTIONS</span>
                            </button>
                            <p className="footer-tagline">
                                Architecting high-performance digital infrastructure
                                and AI-driven user experiences.
                            </p>
                            <div className="system-status" role="status" aria-live="polite">
                                <span className="status-indicator" aria-hidden="true"></span>
                                <span>All Systems Operational</span>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div className="footer-links-group">
                            <nav className="footer-col" aria-label="Platform navigation">
                                <h5>Platform</h5>
                                <button onClick={() => scrollToSection('home')}>Home</button>
                                <button onClick={() => scrollToSection('services')}>Services</button>
                                <button onClick={() => scrollToSection('process')}>Process</button>
                                <button onClick={() => scrollToSection('about')}>About Us</button>
                            </nav>

                            <nav className="footer-col" aria-label="Resources">
                                <h5>Resources</h5>
                                <button onClick={() => scrollToSection('contact')}>Contact</button>
                                <button onClick={() => scrollToSection('projects')}>Projects</button>
                                <a href="/privacy" aria-label="Privacy Policy">Privacy Policy</a>
                                <a href="/terms" aria-label="Terms of Service">Terms of Service</a>
                            </nav>

                            <nav className="footer-col" aria-label="Social media links">
                                <h5>Social</h5>
                                <a
                                    href="https://linkedin.com/company/dmy-solutions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit our LinkedIn profile (opens in new tab)"
                                >
                                    LinkedIn
                                    <span className="external-icon" aria-hidden="true">↗</span>
                                </a>
                                <a
                                    href="https://github.com/dmy-solutions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit our GitHub profile (opens in new tab)"
                                >
                                    GitHub
                                    <span className="external-icon" aria-hidden="true">↗</span>
                                </a>
                                <a
                                    href="https://twitter.com/dmy_solutions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit our Twitter profile (opens in new tab)"
                                >
                                    X / Twitter
                                    <span className="external-icon" aria-hidden="true">↗</span>
                                </a>
                            </nav>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="footer-bottom">
                        <div className="copyright">
                            © {currentYear} DMY Solutions LLC. Built with Precision.
                        </div>
                        <div
                            className="footer-version"
                            title="Last updated: December 2024"
                            aria-label="Application version 2.4.0-stable"
                        >
                            v2.4.0-stable
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <button
                className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                ↑
            </button>
        </>
    );
};

export default Footer;