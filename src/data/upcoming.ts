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
    date: '2026-08-30T20:00:00',
    dateLabel: '30 августа 2026, 20:00',
    title: "Сольный концерт M'Dee",
    description:
      "Большой сольный концерт M'Dee в Астане — живые хиты, атмосфера и мы вдвоём. Два билета уже у меня, тебе остаётся только прийти и насладиться вечером.",
    emoji: '🎤',
    location: {
      name: 'Конгресс-центр',
      address: 'ул. Гейдара Алиева, 12, Астана',
      mapUrl: 'https://2gis.kz/astana/firm/70000001033293245',
      venueUrl: 'https://ticketon.kz/concerts/event/tckt2-solnyy-kontsert-mdee-astana',
    },
    isSurprise: true,
    note: 'Будь готова к 19:30 — заберу тебя. Наряд, в котором захочется петь и танцевать всю ночь. 🎶',
  },
];
