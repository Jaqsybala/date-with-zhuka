import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useEasterEggs';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FlyingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

function createHearts(count = 30): FlyingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i,
    x: Math.random() * 100,
    size: Math.random() * 20 + 16,
    delay: Math.random() * 0.8,
    duration: Math.random() * 2 + 3,
    rotate: Math.random() * 360,
  }));
}

export function EasterEggs() {
  const [hearts, setHearts] = useState<FlyingHeart[]>([]);
  const reduced = useReducedMotion();

  const triggerKonami = useCallback(() => {
    if (reduced) return;
    setHearts(createHearts(40));
    setTimeout(() => setHearts([]), 6000);
  }, [reduced]);

  useKonamiCode(triggerKonami);

  return (
    <AnimatePresence>
      {hearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute select-none"
              style={{
                left: `${heart.x}vw`,
                fontSize: `${heart.size}px`,
                top: '-40px',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                opacity: [1, 1, 0],
                rotate: heart.rotate,
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                ease: 'linear',
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
