import { useState, useCallback } from 'react';
import { loadSrs, saveSrs, getEntry, isDue as isDueFn, review as reviewFn } from '../utils/srs';

export function useSrsStore(storageKey) {
  const [data, setData] = useState(() => loadSrs(storageKey));

  const markReview = useCallback((id, known) => {
    setData(prev => {
      const next = reviewFn(prev, id, known);
      saveSrs(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const isDue = useCallback((id) => isDueFn(data, id), [data]);
  const getBox = useCallback((id) => getEntry(data, id).box, [data]);

  return { srsData: data, markReview, isDue, getBox };
}
