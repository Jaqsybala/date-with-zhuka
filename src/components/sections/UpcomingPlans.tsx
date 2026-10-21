import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { upcomingEvents, type UpcomingEvent } from '../../data/upcoming';
import { SectionTitle } from '../ui/SectionTitle';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCountdown } from '../../hooks/useCountdown';

function isPast(event: UpcomingEvent): boolean {
  return new Date(event.date).getTime() < Date.now();
}

function isSurpriseHidden(event: UpcomingEvent): boolean {
  if (!event.isSurprise) return false;
  const eventDay = new Date(event.date);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today < eventDay;
}

function formatCountdown(days: number, hours: number, minutes: number): string {
  if (days > 0) return `через ${days} дн. ${hours} ч.`;
  if (hours > 0) return `через ${hours} ч. ${minutes} мин.`;
  return `через ${minutes} мин.`;
}

interface SpotifyEmbedProps {
  trackId: string;
}

function SpotifyEmbed({ trackId }: SpotifyEmbedProps) {
  return (
    <iframe
      title="Spotify player"
      src={`https://open.spotify.com/embed/track/${trackId}?theme=0`}
      width="100%"
      height="152"
      style={{ borderRadius: '12px', border: 'none' }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

interface ActionLinkProps {
  href: string;
  label: string;
  icon: string;
}

function ActionLink({ href, label, icon }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium bg-white/80 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/40 text-stone-600 dark:text-stone-300 hover:border-rose-primary/40 hover:text-rose-primary transition-colors duration-200"
    >
      <span>{icon}</span>
      {label}
    </a>
  );
}

interface FeaturedEventProps {
  event: UpcomingEvent;
  reduced: boolean;
}

function FeaturedEvent({ event, reduced }: FeaturedEventProps) {
  const countdown = useCountdown(new Date(event.date));
  const hidden = isSurpriseHidden(event);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-primary/10 via-white/70 to-rose-light/50 dark:from-rose-primary/15 dark:via-stone-900/70 dark:to-stone-900/50 border border-rose-primary/20 dark:border-rose-primary/15 p-8 md:p-10 shadow-lg shadow-rose-primary/5"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <p className="text-xs tracking-[0.25em] uppercase font-sans font-semibold text-rose-primary/80 mb-3">
        Ближайшее
      </p>

      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">{event.emoji}</span>
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-warm-800 dark:text-warm-50">
            {hidden ? 'У тебя сюрприз ✨' : event.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-sans">
            {event.dateLabel}
          </p>
        </div>
      </div>

      {!countdown.expired && (
        <p className="mb-5 font-serif text-lg italic text-rose-primary">
          {formatCountdown(countdown.days, countdown.hours, countdown.minutes)}
        </p>
      )}

      {hidden ? (
        <p className="text-stone-500 dark:text-stone-400 font-sans leading-relaxed">
          Детали откроются в день события. До встречи, моя Морковка.
        </p>
      ) : (
        <>
          <p className="text-stone-600 dark:text-stone-300 font-sans leading-relaxed mb-4">
            {event.description}
          </p>

          {event.note && (
            <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400 mb-5">
              {event.note}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mb-5">
            {event.location.name && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-stone-100/80 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300">
                📍 {event.location.name}
              </span>
            )}
            {event.location.mapUrl && (
              <ActionLink href={event.location.mapUrl} label="На карте" icon="🗺️" />
            )}
            {event.location.venueUrl && (
              <ActionLink href={event.location.venueUrl} label="Заведение" icon="🔗" />
            )}
          </div>

          {event.spotifyTrackId && (
            <div>
              <p className="text-base font-serif font-semibold text-rose-primary mb-2">
                Твоя самая любимая песня
              </p>
              <SpotifyEmbed trackId={event.spotifyTrackId} />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

interface EventCardProps {
  event: UpcomingEvent;
  index: number;
  reduced: boolean;
  past?: boolean;
}

function EventCard({ event, index, reduced, past = false }: EventCardProps) {
  const [open, setOpen] = useState(false);
  const hidden = !past && isSurpriseHidden(event);

  async function copyAddress() {
    if (!event.location.address) return;
    try {
      await navigator.clipboard.writeText(event.location.address);
    } catch {
      // ignore
    }
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={past ? 'opacity-60' : ''}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left group"
        aria-expanded={open}
      >
        <div
          className={`px-6 py-5 rounded-2xl border transition-all duration-300 ${
            past
              ? 'bg-stone-100/50 dark:bg-stone-900/30 border-stone-200/40 dark:border-stone-800/40'
              : 'bg-white/70 dark:bg-stone-900/60 border-stone-200/60 dark:border-stone-700/40 hover:border-rose-primary/30 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">{event.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs tracking-widest uppercase text-rose-primary/70 font-sans font-medium">
                  {event.dateLabel}
                </p>
                <h3 className="font-serif text-lg font-semibold text-warm-800 dark:text-warm-50 truncate group-hover:text-rose-primary transition-colors">
                  {hidden ? 'Сюрприз ✨' : event.title}
                </h3>
              </div>
            </div>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="flex-shrink-0 text-stone-400"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 px-6 py-5 rounded-2xl bg-rose-light/40 dark:bg-stone-900/40 border border-rose-primary/10 space-y-4">
              {hidden ? (
                <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
                  Подробности откроются в день события ❤️
                </p>
              ) : (
                <>
                  <p className="text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                    {event.description}
                  </p>
                  {event.note && (
                    <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400">
                      {event.note}
                    </p>
                  )}
                  {event.location.address && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 font-sans">
                      📍 {event.location.address}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {event.location.mapUrl && (
                      <ActionLink href={event.location.mapUrl} label="На карте" icon="🗺️" />
                    )}
                    {event.location.venueUrl && (
                      <ActionLink href={event.location.venueUrl} label="Заведение" icon="🔗" />
                    )}
                    {event.location.address && (
                      <button
                        type="button"
                        onClick={copyAddress}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium bg-white/80 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/40 text-stone-600 dark:text-stone-300 hover:border-rose-primary/40 hover:text-rose-primary transition-colors duration-200"
                      >
                        📋 Скопировать адрес
                      </button>
                    )}
                  </div>
                  {event.spotifyTrackId && (
                    <div>
                      <p className="text-base font-serif font-semibold text-rose-primary mb-2">
                        Твоя самая любимая песня
                      </p>
                      <SpotifyEmbed trackId={event.spotifyTrackId} />
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function UpcomingPlans() {
  const reduced = useReducedMotion();

  const { upcoming, past, next } = useMemo(() => {
    const sorted = [...upcomingEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const pastEvents = sorted.filter(isPast).reverse();
    const upcomingList = sorted.filter((e) => !isPast(e));
    return {
      upcoming: upcomingList,
      past: pastEvents,
      next: upcomingList[0] ?? null,
    };
  }, []);

  const rest = next ? upcoming.slice(1) : upcoming;

  return (
    <section
      id="events"
      className="py-24 px-6 bg-warm-50 dark:bg-warm-900 border-t border-stone-200/60 dark:border-stone-800/60"
    >
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Будущие события"
          subtitle="То, что мы ещё успеем пережить вместе"
        />

        {next ? (
          <div className="space-y-8">
            <FeaturedEvent event={next} reduced={reduced} />

            {rest.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 font-sans text-center">
                  Ещё впереди
                </p>
                {rest.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} reduced={reduced} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <motion.div
            className="text-center px-8 py-14 rounded-3xl bg-white/60 dark:bg-stone-900/50 border border-dashed border-stone-300/70 dark:border-stone-700/50"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-4xl mb-4 select-none">📅</p>
            <p className="font-serif text-xl md:text-2xl italic text-warm-800 dark:text-warm-50">
              События скоро появятся
            </p>
            <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 font-sans leading-relaxed max-w-sm mx-auto">
              Здесь будут наши планы — свидания, поездки и маленькие сюрпризы
            </p>
          </motion.div>
        )}

        {past.length > 0 && (
          <div className="mt-16 space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 font-sans text-center">
              Состоялось
            </p>
            {past.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} reduced={reduced} past />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
