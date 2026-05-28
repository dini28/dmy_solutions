import { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './css/Contact.css';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface Errors {
    [key: string]: string;
}

const Contact = () => {
    const [focused, setFocused] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
    const sectionRef = useRef(null);

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

    // Validation
    const validateForm = () => {
        const newErrors: Errors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Project brief is required';
        } else if (formData.message.trim().length < 20) {
            newErrors.message = 'Please provide more details (minimum 20 characters)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setErrors({});

            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const openCalendly = () => {
        window.open('https://calendly.com', '_blank', 'noopener,noreferrer');
    };

    return (
        <section
            id="contact"
            className={`contact-section ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
            aria-labelledby="contact-heading"
        >
            <div className="contact-grid">
                {/* Left: Form */}
                <div className="contact-form-area">
                    <div className="section-header">
                        <span className="mono-label" aria-label="Section label: Inquiry Form">
                            // INQUIRY_FORM
                        </span>
                        <h2 id="contact-heading">
                            Ready to <span className="text-white">scale?</span>
                        </h2>
                        <p>Fill out the technical brief below and our lead engineer will reach out within 24 hours.</p>
                    </div>

                    <div className="main-form" role="form">
                        <div className={`input-group ${focused === 'name' ? 'is-focused' : ''} ${errors.name ? 'has-error' : ''}`}>
                            <label htmlFor="name" className="mono-label">
                                FULL_NAME <span className="required">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                aria-required="true"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                            />
                            {errors.name && (
                                <span id="name-error" className="error-message" role="alert">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className={`input-group ${focused === 'email' ? 'is-focused' : ''} ${errors.email ? 'has-error' : ''}`}>
                            <label htmlFor="email" className="mono-label">
                                EMAIL_ADDRESS <span className="required">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                            />
                            {errors.email && (
                                <span id="email-error" className="error-message" role="alert">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className={`input-group ${focused === 'message' ? 'is-focused' : ''} ${errors.message ? 'has-error' : ''}`}>
                            <div className="label-row">
                                <label htmlFor="message" className="mono-label">
                                    PROJECT_BRIEF <span className="required">*</span>
                                </label>
                                <span className="char-count">
                                    {formData.message.length} / 500
                                </span>
                            </div>
                            <textarea
                                id="message"
                                rows={4}
                                maxLength={500}
                                placeholder="Describe the technical requirements and goals..."
                                value={formData.message}
                                onChange={(e) => handleChange('message', e.target.value)}
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                                aria-required="true"
                                aria-invalid={!!errors.message}
                                aria-describedby={errors.message ? 'message-error' : undefined}
                            ></textarea>
                            {errors.message && (
                                <span id="message-error" className="error-message" role="alert">
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="submit-btn"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader size={18} className="spinner" aria-hidden="true" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Initialize Project <span aria-hidden="true">→</span>
                                </>
                            )}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="status-message success" role="status">
                                <CheckCircle size={20} aria-hidden="true" />
                                <span>Message sent successfully! We'll be in touch within 24 hours.</span>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="status-message error" role="alert">
                                <AlertCircle size={20} aria-hidden="true" />
                                <span>Something went wrong. Please try again or email us directly.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Info Card */}
                <div className="contact-info-area">
                    <div className="info-card">
                        <div className="info-card-header">
                            <div className="terminal-dots" aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="mono-label">COMMUNICATION_CHANNELS</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">EMAIL</span>
                            <a
                                href="mailto:hello@dmysolutions.com"
                                className="info-value info-link"
                                aria-label="Send email to hello@dmysolutions.com"
                            >
                                dmysolutions@outlook.com
                            </a>
                        </div>

                        <div className="info-item">
                            <span className="info-label">TIMEZONE</span>
                            <span className="info-value">GMT+5:30 (Udaipur)</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">AVAILABILITY</span>
                            <div className="availability-bar">
                                <div className="bar-fill" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}></div>
                                <span className="mono-label">Limited Slots (Q1)</span>
                            </div>
                        </div>

                        <div className="info-footer">
                            <p>
                                Prefer a direct call? <br />
                                <button
                                    onClick={openCalendly}
                                    className="calendly-link"
                                    aria-label="Book a call on Calendly"
                                >
                                    Book on Calendly
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;