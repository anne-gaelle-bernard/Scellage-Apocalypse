import { useState, useCallback } from 'react';
import { hexToRgba } from '../utils/colors';

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || fallback); }
  catch { return JSON.parse(fallback); }
}

export function useVerseStore() {
  const [selectedVerses, setSelectedVerses] = useState(() => load('apoc_selected', '{}'));
  const [highlightColors, setHighlightColors] = useState(() => load('apoc_highlights', '{}'));

  const toggleVerse = useCallback((chap, verse, text) => {
    const key = `${chap}:${verse}`;
    setSelectedVerses(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = { chap, verse, text };
      localStorage.setItem('apoc_selected', JSON.stringify(next));
      return next;
    });
  }, []);

  const setHighlight = useCallback((key, color) => {
    setHighlightColors(prev => {
      const next = { ...prev };
      if (color === null) delete next[key];
      else next[key] = color;
      localStorage.setItem('apoc_highlights', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeVerse = useCallback((key) => {
    setSelectedVerses(prev => {
      const next = { ...prev };
      delete next[key];
      localStorage.setItem('apoc_selected', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedVerses({});
    localStorage.setItem('apoc_selected', '{}');
  }, []);

  return { selectedVerses, highlightColors, toggleVerse, setHighlight, removeVerse, clearAll, hexToRgba };
}
