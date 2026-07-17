import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`mb-16 ${centered ? 'text-center' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <h2 className="font-serif text-4xl md:text-5xl font-semibold text-warm-800 dark:text-warm-50 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-stone-500 dark:text-stone-400 font-sans font-light">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-px w-16 bg-rose-primary/40 ${centered ? 'mx-auto' : ''}`}
      />
    </motion.div>
  );
}
