import React, { useState } from 'react';
import LogoIntro from './components/LogoIntro';
import HomePage from './components/HomePage';

export const App: React.FC = () => {
  const [introKey, setIntroKey] = useState<number>(0);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('wanderlux_intro_seen') !== 'true';
    } catch {
      return true;
    }
  });

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem('wanderlux_intro_seen');
    } catch {
      // Ignore
    }
    setIntroKey(prev => prev + 1);
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Logo Intro Animation (Full Screen Overlay with Ivory Background) */}
      {showIntro && (
        <LogoIntro
          key={introKey}
          forcePlay={introKey > 0}
          onComplete={handleIntroComplete}
          totalFrames={239}
          fps={24}
          holdDurationMs={1400}
          framesBasePath="/wanderlux-logo-frames"
          storageKey="wanderlux_intro_seen"
        />
      )}

      {/* Main Luxury Booking Homepage */}
      <main
        className={`transition-opacity duration-1000 ease-in-out ${
          showIntro ? 'opacity-90' : 'opacity-100'
        }`}
      >
        <HomePage onReplayIntro={handleReplayIntro} />
      </main>
    </div>
  );
};

export default App;

