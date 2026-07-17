import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

const LETTER_TEXT = `Моя дорогая Морковка,

я хочу, чтобы ты знала: каждый день рядом с тобой — это подарок, который я не перестаю ценить.

Ты вошла в мою жизнь и сделала её теплее, ярче и наполненней. Твоя улыбка — это первое, о чём я думаю утром. Твой смех — лучший звук, который я когда-либо слышал.

Ты поддерживаешь меня в трудные моменты и разделяешь радость в лёгкие. Ты — моя опора, моя тишина, моё вдохновение.

Я не знаю, как правильно выразить словами то, что чувствую. Но я знаю одно точно: ты — самое важное, что есть в моей жизни.

Спасибо тебе за всё. За твою любовь, твою заботу и просто за то, что ты есть.

Я люблю тебя. Сегодня, завтра и всегда.

Твой`;

export function LoveLetter() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useLockBodyScroll(open);

  const letterModal =
    open &&
    createPortal(
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm touch-none" />

          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain"
            initial={reduced ? false : { y: 60, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduced ? {} : { y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-warm-50 dark:bg-stone-900 rounded-3xl shadow-2xl border border-rose-primary/10 overflow-hidden">
              <div className="bg-rose-primary/8 dark:bg-rose-primary/10 px-8 pt-8 pb-4 border-b border-rose-primary/10">
                <p className="font-serif text-xs tracking-widest uppercase text-rose-primary/70">
                  Письмо для Морковки
                </p>
                <div className="mt-1 text-2xl">💌</div>
              </div>

              <div className="px-8 py-8">
                {LETTER_TEXT.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    className={`font-serif leading-relaxed text-warm-800 dark:text-warm-50 ${
                      line === '' ? 'mb-4' : 'mb-0'
                    } ${i === 0 ? 'text-lg font-semibold mb-4' : 'text-base'} ${
                      line === 'Твой' ? 'italic mt-4' : ''
                    }`}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}
              </div>

              <div className="px-8 pb-8 pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-8 py-3 rounded-full bg-rose-primary text-white font-sans text-sm font-medium shadow-md shadow-rose-primary/30 hover:bg-rose-700 transition-colors duration-200 touch-manipulation"
                >
                  Закрыть письмо
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );

  return (
    <section
      id="letter"
      className="py-24 px-6 bg-warm-100 dark:bg-stone-900/50 border-t border-stone-200/60 dark:border-stone-800/60"
    >
      <div className="max-w-2xl mx-auto text-center">
        <SectionTitle title="Письмо для тебя" subtitle="Нажми, чтобы открыть" />

        <div className="flex justify-center">
          <div className="relative" style={{ perspective: '800px' }}>
            {/* Envelope */}
            <motion.div
              className="relative w-72 cursor-pointer touch-manipulation"
              onClick={() => setOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setOpen(true);
              }}
              whileHover={reduced || open ? {} : { y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Envelope body */}
              <div className="relative bg-white dark:bg-stone-800 rounded-2xl shadow-xl shadow-stone-300/50 dark:shadow-stone-900/60 border border-stone-300/80 dark:border-stone-700/40 overflow-hidden">
                {/* Envelope back face (chevron) */}
                <svg
                  viewBox="0 0 288 100"
                  className="w-full"
                  preserveAspectRatio="none"
                  style={{ height: '100px' }}
                >
                  <polygon
                    points="0,0 288,0 288,100 144,40 0,100"
                    fill="currentColor"
                    className="text-stone-200 dark:text-stone-700"
                  />
                  <polygon
                    points="0,0 288,0 144,60"
                    fill="currentColor"
                    className="text-rose-primary/40 dark:text-rose-primary/15"
                  />
                  <polyline
                    points="0,0 144,60 288,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-rose-primary/25 dark:text-rose-primary/20"
                  />
                </svg>

                <div className="px-8 pt-2 pb-8 space-y-3 bg-white dark:bg-stone-800">
                  <div className="text-5xl select-none">💌</div>
                  {!open && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
                      Нажми, чтобы прочитать
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {letterModal}
      </div>
    </section>
  );
}
