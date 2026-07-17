import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Counter } from './components/sections/Counter';
import { SectionDivider } from './components/ui/SectionDivider';
import { Timeline } from './components/sections/Timeline';
import { UpcomingPlans } from './components/sections/UpcomingPlans';
import { WhyILoveYou } from './components/sections/WhyILoveYou';
import { LoveLetter } from './components/sections/LoveLetter';
import { EasterEggs } from './components/easter-eggs/EasterEggs';
import { ScrollToTop } from './components/ui/ScrollToTop';

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
  } catch {
    // ignore
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(getInitialDark);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('darkMode', String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <main>
        <Hero />
        <Counter />
        <SectionDivider />
        <Timeline />
        <WhyILoveYou />
        <LoveLetter />
        <UpcomingPlans />
      </main>

      <Footer />
      <ScrollToTop />
      <EasterEggs />
    </div>
  );
}
