import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollIndicatorProps {
  targetId: string;
}

export function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const reduced = useReducedMotion();

  function scrollTo() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <motion.button
      onClick={scrollTo}
      aria-label="Прокрутить вниз"
      className="mt-16 mx-auto flex flex-col items-center gap-2 text-stone-400 dark:text-stone-500 hover:text-rose-primary dark:hover:text-rose-primary transition-colors duration-300 cursor-pointer"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="text-xs tracking-widest uppercase font-sans">прокрути</span>
      <motion.div
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
