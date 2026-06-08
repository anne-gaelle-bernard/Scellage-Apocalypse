import { useRef, useCallback } from 'react';

export function useSwipe(onLeft, onRight, threshold = 48) {
  const startX = useRef(null);
  const startY = useRef(null);

  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    startX.current = null;
    startY.current = null;
    if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll, ignore
    if (Math.abs(dx) < threshold) return;
    if (dx < 0) onLeft?.();
    else onRight?.();
  }, [onLeft, onRight, threshold]);

  return { onTouchStart, onTouchEnd };
}
