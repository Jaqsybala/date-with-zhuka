import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reasons } from '../../data/reasons';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function WhyILoveYou() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduced = useReducedMotion();

  function next() {
    setDir(1);
    setIndex((i) => (i + 1) % reasons.length);
  }

  function prev() {
    setDir(-1);
    setIndex((i) => (i - 1 + reasons.length) % reasons.length);
  }

  return (
    <section
      id="love"
      className="py-24 px-6 bg-warm-50 dark:bg-warm-900 border-t border-stone-200/60 dark:border-stone-800/60"
    >
      <div className="max-w-2xl mx-auto text-center">
        <SectionTitle title="Почему я тебя люблю" subtitle="Каждый день — новая причина" />

        <div className="relative min-h-[120px] flex items-center justify-center mb-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.p
              key={index}
              custom={dir}
              variants={{
                enter: (d: number) => ({
                  x: d * (reduced ? 0 : 40),
                  opacity: 0,
                }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({
                  x: d * (reduced ? 0 : -40),
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="absolute font-serif text-2xl md:text-3xl italic leading-relaxed text-warm-800 dark:text-warm-50 px-4"
            >
              {reasons[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-xs text-stone-400 dark:text-stone-500 font-sans mb-8 tracking-widest uppercase">
          {index + 1} из {reasons.length}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          {reasons.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Причина ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'bg-rose-primary w-4'
                  : 'bg-stone-300 dark:bg-stone-600 hover:bg-rose-primary/50'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <motion.button
            onClick={prev}
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={reduced ? {} : { scale: 0.95 }}
            className="px-6 py-3 rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-sans text-sm hover:border-rose-primary hover:text-rose-primary transition-colors duration-200"
          >
            ← Назад
          </motion.button>
          <motion.button
            onClick={next}
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={reduced ? {} : { scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-rose-primary text-white font-sans text-sm shadow-md shadow-rose-primary/30 hover:bg-rose-700 transition-colors duration-200"
          >
            Ещё одна причина →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
