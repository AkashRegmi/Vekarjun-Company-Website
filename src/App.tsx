import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ArticlePage from './components/ArticlePage';
import ScrollReveal from './components/ScrollReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import FeaturedAI from './components/FeaturedAI';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Industries from './components/Industries';
import Portfolio from './components/Portfolio';
import Technology from './components/Technology';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] font-body">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ScrollReveal><Trust /></ScrollReveal>
                <ScrollReveal><Services /></ScrollReveal>
                <ScrollReveal><FeaturedAI /></ScrollReveal>
                <ScrollReveal><Process /></ScrollReveal>
                <ScrollReveal><WhyUs /></ScrollReveal>
                <ScrollReveal><Industries /></ScrollReveal>
                <ScrollReveal><Portfolio /></ScrollReveal>
                <ScrollReveal><Technology /></ScrollReveal>
                <ScrollReveal><Testimonials /></ScrollReveal>
                <ScrollReveal><Insights /></ScrollReveal>
                <ScrollReveal><FinalCTA /></ScrollReveal>
                <ScrollReveal><Contact /></ScrollReveal>
              </>
            }
          />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="*" element={<ArticlePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
