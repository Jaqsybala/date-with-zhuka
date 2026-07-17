import { motion } from 'framer-motion';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-50 via-rose-50 to-warm-100 dark:from-warm-900 dark:via-stone-900 dark:to-warm-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,24,74,0.07),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,24,74,0.12),transparent)]" />

      {/* Floating decorative elements */}
      {!reduced && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-primary/5 dark:bg-rose-primary/8 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-rose-soft/10 dark:bg-rose-soft/6 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl"
        variants={reduced ? undefined : container}
        initial={reduced ? false : 'hidden'}
        animate={reduced ? undefined : 'show'}
      >
        <motion.p
          variants={reduced ? undefined : item}
          className="font-sans text-xs tracking-[0.3em] uppercase text-rose-primary/70 dark:text-rose-primary/60 mb-6"
        >
          для моей любимой
        </motion.p>

        <motion.h1
          variants={reduced ? undefined : item}
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] text-warm-800 dark:text-warm-50 tracking-tight"
        >
          Моя{' '}
          <em className="italic text-rose-primary not-italic" style={{ fontStyle: 'italic' }}>
            Морковка
          </em>
        </motion.h1>

        <motion.p
          variants={reduced ? undefined : item}
          className="mt-6 text-lg md:text-xl text-stone-500 dark:text-stone-400 font-sans font-light leading-relaxed max-w-md mx-auto"
        >
          Каждый день с тобой — это подарок, который я не устану ценить
        </motion.p>

        <motion.div
          variants={reduced ? undefined : item}
          className="flex justify-center w-full"
        >
          <ScrollIndicator targetId="counter" />
        </motion.div>
      </motion.div>
    </section>
  );
}
