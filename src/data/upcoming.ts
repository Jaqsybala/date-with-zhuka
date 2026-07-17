/**
 * Будущие события — редактируй здесь, затем:
 * git add → git commit → git push → Vercel пересоберёт сайт автоматически
 */

export interface UpcomingEvent {
  id: string;
  /** ISO-дата для сортировки и обратного отсчёта, напр. '2026-08-09T19:00:00' */
  date: string;
  /** Как показывать дату на сайте */
  dateLabel: string;
  title: string;
  description: string;
  emoji: string;
  location: {
    name: string;
    address?: string;
    /** Ссылка на Google Maps, 2GIS или Yandex */
    mapUrl?: string;
    /** Instagram, сайт или 2GIS заведения */
    venueUrl?: string;
  };
  /** true — детали скрыты до наступления даты */
  isSurprise?: boolean;
  /** Заметка: «оденься тепло», «будь готова в 18:30» и т.п. */
  note?: string;
}

export const upcomingEvents: UpcomingEvent[] = [];
