import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents, type TimelineEvent } from '../../data/timeline';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
  reduced: boolean;
}

function TimelineItem({ event, index, isLeft, reduced }: TimelineItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={reduced ? false : { opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'} pl-12 md:pl-0`}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left group"
          aria-expanded={open}
        >
          <div
            className={`inline-block px-6 py-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-sm border border-stone-200/60 dark:border-stone-700/40 shadow-sm hover:shadow-md hover:border-rose-primary/30 transition-all duration-300 ${
              isLeft ? 'md:text-right' : 'md:text-left'
            }`}
          >
            <span className="text-xs tracking-widest uppercase font-sans text-rose-primary/70 font-medium">
              {event.date}
            </span>
            <div className={`flex items-center gap-2 mt-1 ${isLeft ? 'md:justify-end' : ''}`}>
              <span className="text-xl">{event.emoji}</span>
              <h3 className="font-serif text-lg font-semibold text-warm-800 dark:text-warm-50 group-hover:text-rose-primary transition-colors duration-200">
                {event.title}
              </h3>
            </div>
            <div
              className={`flex items-center gap-1 mt-2 text-xs text-stone-400 dark:text-stone-500 ${
                isLeft ? 'md:justify-end' : ''
              }`}
            >
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M19 9l-7 7-7-7" />
              </motion.svg>
              <span>{open ? 'скрыть' : 'подробнее'}</span>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div
                className={`mt-3 relative overflow-hidden rounded-xl border border-stone-200/50 dark:border-stone-700/40 bg-white/50 dark:bg-stone-900/40 backdrop-blur-sm ${
                  isLeft ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-primary/[0.05] to-transparent pointer-events-none" />
                <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-rose-primary/30 rounded-full" />

                <div className="relative px-4 py-3.5 pl-5">
                  {event.photo && (
                    <div className={`mb-3 flex justify-center ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      <img
                        src={event.photo}
                        alt={event.title}
                        loading="lazy"
                        className="w-full max-w-[160px] h-[100px] rounded-lg object-cover shadow-sm ring-1 ring-white/10 dark:ring-stone-700/40"
                      />
                    </div>
                  )}

                  <span
                    className="absolute top-2 left-3 font-serif text-2xl leading-none text-rose-primary/15 select-none"
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="font-serif text-sm italic leading-relaxed text-stone-600 dark:text-stone-300">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center dot */}
      <div className="absolute left-0 md:relative md:left-auto flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-rose-primary border-4 border-warm-50 dark:border-warm-900 shadow-md shadow-rose-primary/30 z-10"
          whileHover={reduced ? {} : { scale: 1.5 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export function Timeline() {
  const reduced = useReducedMotion();

  return (
    <section id="timeline" className="py-24 px-6 bg-warm-50 dark:bg-warm-900">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="Наша История" subtitle="Каждый момент — бесценен" />

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-primary/20 to-transparent -translate-x-1/2" />
          {/* Mobile line */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-primary/20 to-transparent" />

          <div className="space-y-10">
            {timelineEvents.map((event, i) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={i}
                isLeft={i % 2 === 0}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
