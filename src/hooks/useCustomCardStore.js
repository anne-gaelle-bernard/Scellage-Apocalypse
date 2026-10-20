import { useState, useCallback } from 'react';

const STORAGE_KEY = 'apoc_custom_cards';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function useCustomCardStore() {
  const [customCards, setCustomCards] = useState(load);

  const addCard = useCallback((front, back) => {
    setCustomCards(prev => {
      const next = [...prev, { id: uid(), front: front.trim(), back: back.trim(), addedAt: Date.now() }];
      save(next);
      return next;
    });
  }, []);

  const removeCard = useCallback((id) => {
    setCustomCards(prev => {
      const next = prev.filter(c => c.id !== id);
      save(next);
      return next;
    });
  }, []);

  return { customCards, addCard, removeCard };
}
