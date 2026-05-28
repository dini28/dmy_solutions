
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Throttled scroll handler for performance
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update active section for router links
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') setActiveSection('home');
        else if (location.pathname === '/about') setActiveSection('about');
        else if (location.pathname === '/services') setActiveSection('services');
        else if (location.pathname === '/process') setActiveSection('process');
    }, [location]);

    // Fixed scroll calculation
    const scrollToSection = (id: any) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });

            // Close mobile menu after navigation
            setMobileMenuOpen(false);
        }
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (mobileMenuOpen && !e.target.closest('.navbar')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
            <div className="navbar-container">
                {/* Brand Logo - Left */}
                <button
                    className="logo"
                    onClick={() => scrollToSection('home')}
                    aria-label="Return to home"
                >
                    <span className="logo-accent">DMY</span>
                    <span className="logo-text">SOLUTIONS</span>
                </button>

                {/* Navigation Links - Center */}
                <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link
                        to="/about"
                        className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
                        aria-label="Navigate to About page"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className={`nav-item ${activeSection === 'services' ? 'active' : ''}`}
                        aria-label="Navigate to Services page"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Services
                    </Link>
                    <Link
                        to="/process"
                        className={`nav-item ${activeSection === 'process' ? 'active' : ''}`}
                        aria-label="Navigate to Process page"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Process
                    </Link>

                    {/* Mobile-only CTA */}
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="btn-nav-primary mobile-only"
                    >
                        Start Project
                    </button>
                </div>

                {/* Right Side - Action Button */}
                <div className="nav-actions">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="btn-nav-primary desktop-only"
                    >
                        Start Project
                    </button>

                    {/* Hamburger Menu */}
                    <button
                        className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;