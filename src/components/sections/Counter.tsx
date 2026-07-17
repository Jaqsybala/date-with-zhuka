import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCounter } from '../../hooks/useCounter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SectionTitle } from '../ui/SectionTitle';

interface StatCardProps {
  value: number;
  label: string;
  delay: number;
  reduced: boolean;
}

function StatCard({ value, label, delay, reduced }: StatCardProps) {
  const prevRef = useRef<number>(value);
  const prev = prevRef.current;
  const changed = prev !== value;
  prevRef.current = value;

  return (
    <motion.div
      className="flex flex-col items-center gap-2 px-6 py-8 rounded-3xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-white/40 dark:border-stone-700/40 shadow-lg shadow-stone-200/30 dark:shadow-stone-900/40 min-w-[130px]"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.3 } }}
    >
      <div className="relative h-14 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {reduced ? (
            <span className="font-sans text-4xl font-bold tabular-nums text-rose-primary">
              {value}
            </span>
          ) : (
            <motion.span
              key={changed ? `${label}-${value}` : `${label}-${value}-stable`}
              className="font-sans text-4xl font-bold tabular-nums text-rose-primary absolute"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {value}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs tracking-[0.2em] uppercase font-sans font-medium text-stone-400 dark:text-stone-500">
        {label}
      </span>
    </motion.div>
  );
}

export function Counter() {
  const { days, hours, minutes, seconds } = useCounter();
  const reduced = useReducedMotion();

  return (
    <section
      id="counter"
      className="py-24 px-6 bg-warm-50 dark:bg-warm-900"
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Мы вместе" />

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <StatCard value={days} label="Дней" delay={0} reduced={reduced} />
          <StatCard value={hours} label="Часов" delay={0.08} reduced={reduced} />
          <StatCard value={minutes} label="Минут" delay={0.16} reduced={reduced} />
          <StatCard value={seconds} label="Секунд" delay={0.24} reduced={reduced} />
        </div>

        <motion.p
          className="mt-10 text-center font-serif text-xl italic text-stone-500 dark:text-stone-400"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          И это только начало ❤️
        </motion.p>
      </div>
    </section>
  );
}
