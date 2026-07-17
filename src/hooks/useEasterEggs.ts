import { useEffect, useCallback } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonamiCode(onActivate: () => void) {
  useEffect(() => {
    let index = 0;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI[index]) {
        index += 1;
        if (index === KONAMI.length) {
          onActivate();
          index = 0;
        }
      } else {
        index = e.key === KONAMI[0] ? 1 : 0;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onActivate]);
}

export function useLongPress(
  callback: () => void,
  ms = 500
): {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const start = useCallback(() => {
    timer = setTimeout(callback, ms);
  }, [callback, ms]);

  const stop = useCallback(() => {
    if (timer) clearTimeout(timer);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}
