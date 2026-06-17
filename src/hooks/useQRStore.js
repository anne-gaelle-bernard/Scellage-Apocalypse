import { useState, useCallback } from 'react';

function load() {
  try { return JSON.parse(localStorage.getItem('apoc_qr') || '[]'); }
  catch { return []; }
}

function save(list) {
  localStorage.setItem('apoc_qr', JSON.stringify(list));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function useQRStore() {
  const [questions, setQuestions] = useState(load);

  const addQuestions = useCallback((pairs) => {
    setQuestions(prev => {
      const next = [
        ...prev,
        ...pairs.map(p => ({ id: uid(), q: p.q.trim(), a: p.a.trim(), addedAt: Date.now() })),
      ];
      save(next);
      return next;
    });
  }, []);

  const removeQuestion = useCallback((id) => {
    setQuestions(prev => {
      const next = prev.filter(q => q.id !== id);
      save(next);
      return next;
    });
  }, []);

  const clearAllQuestions = useCallback(() => {
    setQuestions([]);
    localStorage.removeItem('apoc_qr');
  }, []);

  return { questions, addQuestions, removeQuestion, clearAllQuestions };
}
