import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SECRET_CLICKS = 7;

export function Footer() {
  const [clicks, setClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const reduced = useReducedMotion();

  function handleHeartClick() {
    const next = clicks + 1;
    setClicks(next);
    if (next >= SECRET_CLICKS) {
      setShowSecret(true);
      setClicks(0);
    }
  }

  return (
    <footer className="relative py-16 px-6 text-center bg-warm-50 dark:bg-warm-900 border-t border-stone-200/60 dark:border-stone-800/60">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="space-y-4"
      >
        <p className="font-serif text-2xl md:text-3xl italic text-warm-800 dark:text-warm-50">
          Навсегда начинается сегодня ❤️
        </p>

        <button
          onClick={handleHeartClick}
          aria-label="Сердечко"
          className="inline-block focus:outline-none"
        >
          <motion.span
            className="text-3xl inline-block cursor-pointer select-none"
            animate={reduced ? {} : { scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            whileTap={{ scale: 1.4 }}
          >
            ❤️
          </motion.span>
        </button>

        <p className="text-sm text-stone-400 dark:text-stone-500 font-sans">
          Создано с любовью для самой лучшей Морковки во вселенной ✨
        </p>
      </motion.div>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecret(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-3xl p-10 max-w-sm w-full text-center border border-rose-primary/20 shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">💕</div>
              <p className="font-serif text-xl italic text-warm-800 dark:text-warm-50 leading-relaxed">
                Ты нашла секрет!<br />
                Я тебя очень люблю!
              </p>
              <button
                onClick={() => setShowSecret(false)}
                className="mt-6 px-6 py-2 rounded-full bg-rose-primary text-white text-sm font-medium hover:bg-rose-700 transition-colors duration-200"
              >
                Закрыть 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
