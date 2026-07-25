/**
 * Будущие события
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

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    date: '2026-08-09T19:00:00',
    dateLabel: '09.08.2026',
    title: 'Наша годовщина',
    description: 'Один из важных дней в нашей жизни',
    emoji: '💖',
    location: {
      name: 'Ginza',
      address: 'Проспект Туран, 15',
      mapUrl: 'https://2gis.kz/astana/firm/70000001036217339?m=71.411566%2C51.147466%2F16',
      venueUrl: 'https://www.instagram.com/ginza.astana',
    },
    note: 'Платье, в котором ты будешь сиять, как настоящая звезда. ✨',
  }
];
