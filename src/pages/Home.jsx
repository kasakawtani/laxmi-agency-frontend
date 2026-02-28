import React, { useEffect, useState, useRef } from 'react';
import { spacing, borderRadius } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { submitInquiry } from '../api/api';
import API from '../api/api';

export default function Home() {
  const { isDarkMode } = useTheme();
  const themeColors = getColors(isDarkMode);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [introStage, setIntroStage] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', contactNumber: '', brand: '', message: '' });
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    // If navigated with a scroll intent (from Navbar), scroll to contact
    if (location && (location.state?.scrollTo === 'contact' || location.hash === '#contact')) {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // clear the navigation state so we don't re-scroll on mount
        navigate(location.pathname, { replace: true, state: {} });
      }, 180);
    }
  }, [location, navigate]);
  // Intro sequence: show logo → tagline
  useEffect(() => {
    setIntroStage(1);
    const t1 = setTimeout(() => setIntroStage(2), 800);
    return () => clearTimeout(t1);
  }, []);

  // Fetch products for "We Sell" section
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const res = await API.get('/items');
        if (res.data && Array.isArray(res.data)) {
          // Deduplicate items
          const seen = new Set();
          const uniqueItems = res.data.filter((item) => {
            const key = `${item.itemName}__${item.category}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          // Limit to 6 items for preview
          setProducts(uniqueItems.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slideInUp');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('[data-animate]');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactError('');
    setContactSuccess('');

    // Validate required fields
    if (!contactForm.name.trim() || !contactForm.contactNumber.trim() || !contactForm.message.trim()) {
      setContactError('Name, Contact Number, and Message are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: contactForm.name.trim(),
        contactNumber: contactForm.contactNumber.trim(),
        brand: contactForm.brand.trim() || null,
        message: contactForm.message.trim(),
      });

      setContactSuccess('✅ Thank you for your inquiry! We\'ll get back to you soon.');
      setContactForm({ name: '', contactNumber: '', brand: '', message: '' });

      setTimeout(() => setContactSuccess(''), 4000);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setContactError('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const page = {
    container: { 
      minHeight: '100vh', 
      padding: spacing.xxxl, 
      background: themeColors.background.main,
      position: 'relative',
    },
    wrapper: { maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 },
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      marginBottom: spacing.xl,
      animation: 'slideInUpSmooth 800ms ease-out',
    },
    logo: {
      width: introStage === 1 ? 320 : 280,
      height: 'auto',
      objectFit: 'contain',
      transition: 'all 450ms cubic-bezier(0.2,0.9,0.2,1)',
      opacity: introStage >= 1 ? 1 : 0,
      transform: `scale(${introStage === 1 ? 1 : 0.95})`,
      marginBottom: 8,
      animation: 'logoFadeScale 800ms ease-out',
      filter: 'drop-shadow(0 8px 24px rgba(194, 24, 91, 0.15))',
    },
    tagline: {
      maxWidth: 600,
      color: themeColors.text.primary,
      opacity: introStage === 2 ? 1 : 0,
      transform: introStage === 2 ? 'translateY(0)' : 'translateY(8px)',
      transition: 'all 450ms 200ms cubic-bezier(0.2,0.9,0.2,1)',
      fontSize: 18,
      lineHeight: '1.6',
    },
    section: {
      marginTop: spacing.lg,
      marginBottom: spacing.lg,
      animation: 'slideInUpSmooth 600ms ease-out',
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 700,
      color: themeColors.brand.main,
      marginBottom: spacing.lg,
      letterSpacing: '-0.5px',
    },
    sectionText: {
      color: themeColors.text.secondary,
      lineHeight: 1.7,
      fontSize: 14,
      marginBottom: spacing.md,
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: spacing.lg,
      marginBottom: spacing.xxl,
      animation: 'slideInUpSmooth 700ms ease-out',
    },
    productCard: {
      backgroundColor: themeColors.background.card,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      boxShadow: themeColors.shadow.md,
      border: `1px solid ${themeColors.border.light}`,
      transition: 'all 300ms ease-out',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: themeColors.shadow.lg,
      },
    },
    productName: {
      fontSize: 16,
      fontWeight: 700,
      color: themeColors.text.primary,
      marginBottom: spacing.sm,
      lineHeight: 1.4,
    },
    productCategory: {
      display: 'inline-block',
      padding: `${spacing.xs} ${spacing.md}`,
      backgroundColor: themeColors.brand.lighter,
      color: themeColors.brand.dark,
      borderRadius: borderRadius.full,
      fontSize: 12,
      fontWeight: 600,
      border: `1px solid ${themeColors.brand.main}`,
    },
    viewMoreButton: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: spacing.xxl,
    },
    formCard: {
      backgroundColor: themeColors.background.card,
      borderRadius: borderRadius.lg,
      padding: spacing.xxl,
      boxShadow: themeColors.shadow.md,
      maxWidth: 600,
      margin: '0 auto',
      border: `1px solid ${themeColors.border.light}`,
      animation: 'slideInUpSmooth 700ms ease-out',
    },
    successMsg: {
      padding: spacing.lg,
      backgroundColor: themeColors.secondary.lighter,
      border: `1px solid ${themeColors.secondary.light}`,
      borderRadius: borderRadius.md,
      color: themeColors.secondary.dark,
      marginBottom: spacing.lg,
      fontSize: 14,
      fontWeight: 500,
      animation: 'slideInDown 300ms ease-out',
    },
    errorMsg: {
      padding: spacing.lg,
      backgroundColor: themeColors.danger.lighter,
      border: `1px solid ${themeColors.danger.light}`,
      borderRadius: borderRadius.md,
      color: themeColors.danger.dark,
      marginBottom: spacing.lg,
      fontSize: 14,
      fontWeight: 500,
      animation: 'slideInDown 300ms ease-out',
    },
  };

  return (
    <div style={page.container}>
      <div style={page.wrapper}>
        {/* Hero Section with Logo and Tagline */}
        <section style={page.heroSection}>
          <img
            src="/Modern_LAXMI_AGENCY_Logo_in_Pink_and_Green-removebg-preview.png"
            alt="Laxmi Agency"
            style={page.logo}
          />
          <div style={page.tagline}>
            <div style={{ fontSize: 16, color: themeColors.accent.main, marginBottom: 4, letterSpacing: '2px' }}>
              ★★★★★
            </div>
            <div style={{ fontWeight: 700, fontSize: 32, lineHeight: 1.3, color: themeColors.text.primary }}>
              Your Trusted Partner for Quality Fabrics
            </div>
          </div>
        </section>

        {/* We Sell Section */}
        <section style={page.section} data-animate>
          <h2 style={page.sectionTitle}>We Sell</h2>
          <p style={{ ...page.sectionText, textAlign: 'center', marginBottom: spacing.xl }}>
            Discover our curated selection of premium products sourced from trusted suppliers.
          </p>

          {isLoadingProducts ? (
            <div style={{ textAlign: 'center', padding: spacing.xxl, color: themeColors.text.secondary }}>
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: spacing.xxl, color: themeColors.text.secondary }}>
              No products available at the moment.
            </div>
          ) : (
            <>
              <div style={page.productGrid}>
                {products.map((product, index) => (
                  <div
                    key={product._id || index}
                    style={{
                      ...page.productCard,
                      animation: `slideInUpSmooth 600ms ease-out ${index * 100}ms both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = themeColors.shadow.lg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = themeColors.shadow.md;
                    }}
                  >
                    <div style={page.productName}>{product.itemName}</div>
                    {product.category && (
                      <div style={page.productCategory}>{product.category}</div>
                    )}
                  </div>
                ))}
              </div>

              <div style={page.viewMoreButton}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/customer')}
                >
                  View More Products →
                </Button>
              </div>
            </>
          )}
        </section>

        {/* About Us Section */}
        <section style={page.section} data-animate>
          <h2 style={page.sectionTitle}>About Us</h2>
          <p style={page.sectionText}>
            Laxmi Agency has been connecting businesses and customers to high-quality products
            for years. Our mission is to ensure transparent sourcing, reliable delivery, and
            responsive support. We work closely with vetted suppliers and maintain clear records
            so our customers can make informed purchasing decisions.
          </p>
          <p style={page.sectionText}>
            Whether you need single orders or bulk sourcing, Laxmi Agency offers flexible
            solutions tailored to your needs. Our team is committed to understanding your
            requirements and providing personalized service.
          </p>
          <p style={page.sectionText}>
            We pride ourselves on maintaining professional standards, fair pricing, and
            prompt communication. Your satisfaction is our priority.
          </p>
        </section>

        {/* Contact / Inquiry Section */}
        <section id="contact" style={page.section} data-animate>
          <h2 style={page.sectionTitle}>Get in Touch</h2>
          <p style={{ ...page.sectionText, textAlign: 'center', marginBottom: spacing.xl }}>
            Have questions or want to place an order? Send us a message and we'll respond promptly.
          </p>

          <div style={page.formCard}>
            {contactSuccess && <div style={page.successMsg}>{contactSuccess}</div>}
            {contactError && <div style={page.errorMsg}>{contactError}</div>}

            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: spacing.lg }}>
                <FormInput
                  label="Full Name"
                  name="name"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                />
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <FormInput
                  label="Contact Number"
                  name="contactNumber"
                  type="tel"
                  placeholder="e.g., +91 98765 43210"
                  value={contactForm.contactNumber}
                  onChange={handleContactChange}
                  required
                />
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <FormInput
                  label="Brand (Optional)"
                  name="brand"
                  placeholder="Your brand or company name"
                  value={contactForm.brand}
                  onChange={handleContactChange}
                />
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600, color: themeColors.text.primary }}>
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your inquiry..."
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: spacing.md,
                    border: `1px solid ${themeColors.border.light}`,
                    borderRadius: borderRadius.md,
                    fontFamily: 'inherit',
                    fontSize: 14,
                    resize: 'vertical',
                    backgroundColor: themeColors.background.main,
                    color: themeColors.text.primary,
                    transition: 'all 200ms ease-out',
                  }}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </section>

        {/* Footer Info */}
        <section style={{ ...page.section, textAlign: 'center', marginTop: spacing.xxl }}>
          <p style={{ color: themeColors.text.secondary, fontSize: 13 }}>
            © 2025 Laxmi Agency. All rights reserved.
          </p>
        </section>
      </div>
    </div>
  );
}
