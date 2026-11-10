import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface LogoIntroProps {
  onComplete?: () => void;
  totalFrames?: number;
  fps?: number;
  holdDurationMs?: number;
  framesBasePath?: string;
  storageKey?: string;
  forcePlay?: boolean; // For testing or resetting intro
}

export const LogoIntro: React.FC<LogoIntroProps> = ({
  onComplete,
  totalFrames = 239,
  fps = 24,
  holdDurationMs = 1500,
  framesBasePath = '/wanderlux-logo-frames',
  storageKey = 'wanderlux_intro_seen',
  forcePlay = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forcePlay) return true;
    try {
      return sessionStorage.getItem(storageKey) !== 'true';
    } catch {
      return true;
    }
  });

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isReadyToPlay, setIsReadyToPlay] = useState<boolean>(false);

  // Frame image cache: index 1 to totalFrames
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const animationFrameIdRef = useRef<number | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // Helper to format frame filename with cache-busting
  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(4, '0');
      return `${framesBasePath}/frame_${padded}.png?v=clean2`;
    },
    [framesBasePath]
  );

  // Complete and fade into homepage
  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    try {
      sessionStorage.setItem(storageKey, 'true');
    } catch {
      // Ignore storage errors (e.g. private mode)
    }

    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 800);
  }, [storageKey, onComplete]);

  // Lock body scroll while intro is visible to prevent scrollbars
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Initial check: if already seen, immediately trigger onComplete
  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
    }
  }, [isVisible, onComplete]);

  // Preloading & Streaming Frames
  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, load only final frame and complete quickly
    if (prefersReducedMotion) {
      const finalImg = new Image();
      finalImg.src = getFrameUrl(totalFrames);
      finalImg.onload = () => {
        if (!isMounted) return;
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(finalImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(finalImg, 855, 930, 210, 30, 855, 965, 210, 55);
          }
        }
        setIsReadyToPlay(true);
        setTimeout(() => {
          if (isMounted) finishIntro();
        }, 1200);
      };
      return;
    }

    // Preload initial buffer (first 30 frames) to start playback without stutter
    const INITIAL_BUFFER = Math.min(30, totalFrames);
    let loadedCount = 0;

    const loadSingleImage = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesCacheRef.current.has(idx)) {
          resolve(imagesCacheRef.current.get(idx)!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (isMounted) {
            imagesCacheRef.current.set(idx, img);
            loadedCount++;
            setLoadingProgress(Math.min(100, Math.round((loadedCount / totalFrames) * 100)));
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img); // Don't hang on single frame error
        };
      });
    };

    // Load initial buffer first
    const initialPromises: Promise<HTMLImageElement>[] = [];
    for (let i = 1; i <= INITIAL_BUFFER; i++) {
      initialPromises.push(loadSingleImage(i));
    }

    Promise.all(initialPromises).then(() => {
      if (!isMounted) return;
      setIsReadyToPlay(true);

      // Stream the remaining frames in background chunks of 15
      const streamRemaining = async () => {
        const chunkSize = 15;
        for (let i = INITIAL_BUFFER + 1; i <= totalFrames; i += chunkSize) {
          if (!isMounted || hasFinishedRef.current) break;
          const chunkPromises: Promise<HTMLImageElement>[] = [];
          for (let j = i; j < Math.min(i + chunkSize, totalFrames + 1); j++) {
            chunkPromises.push(loadSingleImage(j));
          }
          await Promise.all(chunkPromises);
        }
      };

      streamRemaining();
    });

    return () => {
      isMounted = false;
    };
  }, [isVisible, totalFrames, getFrameUrl, finishIntro]);

  // Main Animation Loop
  useEffect(() => {
    if (!isVisible || !isReadyToPlay) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let startTime: number | null = null;
    let lastRenderedFrame = 0;
    const frameIntervalMs = 1000 / fps;
    const totalDurationMs = (totalFrames / fps) * 1000;

    const render = (timestamp: number) => {
      if (hasFinishedRef.current) return;

      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed <= totalDurationMs) {
        // Calculate current frame (1-based)
        const targetFrame = Math.min(
          totalFrames,
          Math.max(1, Math.floor(elapsed / frameIntervalMs) + 1)
        );

        if (targetFrame !== lastRenderedFrame) {
          const img = imagesCacheRef.current.get(targetFrame);
          if (img && img.complete) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 855, 930, 210, 30, 855, 965, 210, 55);
            lastRenderedFrame = targetFrame;
          }
        }

        animationFrameIdRef.current = requestAnimationFrame(render);
      } else {
        // Ensure final frame is rendered
        const finalImg = imagesCacheRef.current.get(totalFrames);
        if (finalImg && finalImg.complete) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(finalImg, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(finalImg, 855, 930, 210, 30, 855, 965, 210, 55);
        }

        // Hold the final logo frame briefly, then smoothly fade out
        setTimeout(() => {
          finishIntro();
        }, holdDurationMs);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isVisible, isReadyToPlay, fps, totalFrames, holdDurationMs, finishIntro]);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="WanderLux Logo Introduction"
      className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-white select-none transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* True Full-Screen Canvas */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#FFFFFF' }}
        />

        {/* Subtle Luxury Preload Indicator while initial buffer fills */}
        {!isReadyToPlay && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white transition-opacity duration-300">
            <div className="w-12 h-12 border-2 border-neutral-200 border-t-gold-500 rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
              WANDERLUX
            </p>
            {loadingProgress > 0 && (
              <span className="text-[11px] text-neutral-400 mt-1 font-mono">
                {loadingProgress}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoIntro;

