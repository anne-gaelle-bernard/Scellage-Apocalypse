import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useQRStore } from '../hooks/useQRStore';
import {
  Plus, Trash2, ClipboardPaste, Image, CheckCircle, XCircle,
  RotateCcw, ChevronLeft, ChevronRight, Eye, Sparkles, AlertCircle,
} from 'lucide-react';

// ─── Text parser ──────────────────────────────────────────────────────────────
function parseQA(raw) {
  const text = raw.trim();
  if (!text) return [];

  // 1) Tab-separated pairs (one per line): "question\tréponse"
  if (text.includes('\t')) {
    const pairs = text.split('\n')
      .map(l => l.split('\t'))
      .filter(p => p.length >= 2 && p[0].trim())
      .map(p => ({ q: p[0].trim(), a: p.slice(1).join('\t').trim() }));
    if (pairs.length) return pairs;
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // 2) Labeled lines: Q: / R: or Question: / Réponse:
  const isQLine = l => /^(q|question)\s*[:.)\-]/i.test(l);
  const isALine = l => /^(r|a|réponse|reponse|answer)\s*[:.)\-]/i.test(l);
  if (lines.some(isQLine)) {
    const pairs = [];
    let cur = null;
    for (const l of lines) {
      if (isQLine(l)) {
        if (cur) pairs.push(cur);
        cur = { q: l.replace(/^[^:.)\-]+[:.)\-]\s*/i, ''), a: '' };
      } else if (isALine(l) && cur) {
        cur.a = l.replace(/^[^:.)\-]+[:.)\-]\s*/i, '');
        pairs.push(cur);
        cur = null;
      } else if (cur && !cur.a) {
        cur.a += (cur.a ? ' ' : '') + l;
      }
    }
    if (cur && cur.q) pairs.push(cur);
    if (pairs.filter(p => p.q && p.a).length) return pairs.filter(p => p.q && p.a);
  }

  // 3) Blank-line separated blocks: first line = Q, rest = A
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  if (blocks.length > 1) {
    const pairs = blocks.map(b => {
      const bLines = b.split('\n').map(l => l.trim()).filter(Boolean);
      return { q: bLines[0], a: bLines.slice(1).join(' ') };
    }).filter(p => p.q && p.a);
    if (pairs.length) return pairs;
  }

  // 4) Lines where odd = question (ends with ?) + even = answer
  const qPairs = [];
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].endsWith('?') || /^(\d+[.)]\s*)/.test(lines[i])) {
      qPairs.push({ q: lines[i].replace(/^\d+[.)]\s*/, ''), a: lines[i + 1] });
      i++;
    }
  }
  if (qPairs.length) return qPairs;

  // 5) Fallback: pairs of consecutive lines
  const fallback = [];
  for (let i = 0; i < lines.length - 1; i += 2) {
    fallback.push({ q: lines[i], a: lines[i + 1] });
  }
  return fallback;
}

// ─── OCR via OCR.space free API ───────────────────────────────────────────────
async function ocrImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('apikey', 'helloworld');
  fd.append('language', 'fre');
  fd.append('isOverlayRequired', 'false');
  fd.append('detectOrientation', 'true');
  fd.append('scale', 'true');
  const res = await fetch('https://api.ocr.space/parse/image', { method: 'POST', body: fd });
  if (!res.ok) throw new Error('Erreur réseau OCR');
  const json = await res.json();
  if (json.IsErroredOnProcessing) throw new Error(json.ErrorMessage?.[0] || 'Erreur OCR');
  return json.ParsedResults?.[0]?.ParsedText || '';
}

// ─── Add tab ──────────────────────────────────────────────────────────────────
function AddTab({ onAdded }) {
  const [mode, setMode]         = useState(null); // 'text' | 'image'
  const [rawText, setRawText]   = useState('');
  const [preview, setPreview]   = useState(null); // [{q,a}]
  const [imgSrc, setImgSrc]     = useState(null);
  const [ocring, setOcring]     = useState(false);
  const [ocrErr, setOcrErr]     = useState(null);
  const fileRef                 = useRef(null);

  function handleParse() {
    const pairs = parseQA(rawText);
    setPreview(pairs);
  }

  async function handleImageFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgSrc(url);
    setOcring(true);
    setOcrErr(null);
    setRawText('');
    setPreview(null);
    try {
      const text = await ocrImage(file);
      setRawText(text);
      setPreview(parseQA(text));
    } catch (e) {
      setOcrErr(e.message);
    } finally {
      setOcring(false);
    }
  }

  function updatePair(i, field, val) {
    setPreview(prev => prev.map((p, j) => j === i ? { ...p, [field]: val } : p));
  }

  function removePair(i) {
    setPreview(prev => prev.filter((_, j) => j !== i));
  }

  function addBlank() {
    setPreview(prev => [...(prev || []), { q: '', a: '' }]);
  }

  function confirmAdd() {
    const valid = (preview || []).filter(p => p.q.trim() && p.a.trim());
    if (!valid.length) return;
    onAdded(valid);
    setMode(null); setRawText(''); setPreview(null); setImgSrc(null);
  }

  if (!mode) return (
    <div className="qr-add-methods">
      <button className="qr-method-card" onClick={() => setMode('text')}>
        <ClipboardPaste size={28} strokeWidth={1.5} />
        <span className="qrm-title">Coller du texte</span>
        <span className="qrm-sub">Copiez vos questions depuis n'importe quelle source</span>
      </button>
      <button className="qr-method-card" onClick={() => { setMode('image'); setTimeout(() => fileRef.current?.click(), 50); }}>
        <Image size={28} strokeWidth={1.5} />
        <span className="qrm-title">Importer une image</span>
        <span className="qrm-sub">Photo d'une fiche, capture d'écran — l'IA extrait le texte</span>
      </button>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleImageFile(e.target.files?.[0])} />
    </div>
  );

  return (
    <div className="qr-add-flow">
      <button className="qr-back-btn" onClick={() => { setMode(null); setPreview(null); setRawText(''); setImgSrc(null); setOcrErr(null); }}>
        ← Retour
      </button>

      {mode === 'image' && (
        <div className="qr-img-section">
          {imgSrc && <img src={imgSrc} alt="Importée" className="qr-img-preview" />}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => handleImageFile(e.target.files?.[0])} />
          {!imgSrc && (
            <button className="qr-img-pick" onClick={() => fileRef.current?.click()}>
              <Image size={20} /> Choisir une image
            </button>
          )}
          {imgSrc && <button className="qr-img-change btn-outline" onClick={() => fileRef.current?.click()}>Changer d'image</button>}
          {ocring && (
            <div className="qr-ocr-status">
              <span className="qr-ocr-spinner" />
              Lecture du texte en cours…
            </div>
          )}
          {ocrErr && (
            <div className="qr-ocr-err">
              <AlertCircle size={16} />
              {ocrErr} — Vérifiez votre connexion internet.
            </div>
          )}
        </div>
      )}

      {mode === 'text' && (
        <div className="qr-text-section">
          <label className="qr-label">
            Collez vos questions ici&thinsp;:
            <span className="qr-format-hint">Formats reconnus : Q: / R:, lignes alternées, blocs séparés par une ligne vide, onglets…</span>
          </label>
          <textarea
            className="qr-ta"
            value={rawText}
            onChange={e => { setRawText(e.target.value); setPreview(null); }}
            placeholder={"Q: Qu'est-ce que la grâce ?\nR: Le don gratuit de Dieu.\n\nQ: ...\nR: ..."}
            rows={8}
          />
          <button className="btn-gold qr-parse-btn" onClick={handleParse} disabled={!rawText.trim()}>
            <Sparkles size={15} /> Analyser le texte
          </button>
        </div>
      )}

      {/* Preview / edit */}
      {preview !== null && (
        <div className="qr-preview">
          <div className="qr-preview-header">
            <span className="qr-preview-count">
              {preview.filter(p => p.q && p.a).length} paire{preview.filter(p=>p.q&&p.a).length!==1?'s':''} détectée{preview.filter(p=>p.q&&p.a).length!==1?'s':''}
            </span>
            <button className="qr-add-pair-btn" onClick={addBlank}>+ Ajouter une paire</button>
          </div>

          {preview.length === 0 && (
            <p className="qr-no-pairs">Aucune paire Q/R détectée. Ajoutez-en manuellement ou modifiez le texte.</p>
          )}

          {preview.map((pair, i) => (
            <div key={i} className="qr-pair-row">
              <div className="qr-pair-fields">
                <div className="qr-pair-field">
                  <span className="qr-pair-badge qr-q">Q</span>
                  <input
                    className="qr-pair-input"
                    value={pair.q}
                    onChange={e => updatePair(i, 'q', e.target.value)}
                    placeholder="Question…"
                  />
                </div>
                <div className="qr-pair-field">
                  <span className="qr-pair-badge qr-a">R</span>
                  <textarea
                    className="qr-pair-input qr-pair-ta"
                    value={pair.a}
                    onChange={e => updatePair(i, 'a', e.target.value)}
                    placeholder="Réponse…"
                    rows={2}
                  />
                </div>
              </div>
              <button className="qr-rm-btn" onClick={() => removePair(i)} title="Supprimer">
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {preview.filter(p => p.q.trim() && p.a.trim()).length > 0 && (
            <button className="btn-gold qr-confirm-btn" onClick={confirmAdd}>
              <CheckCircle size={16} />
              Ajouter {preview.filter(p => p.q.trim() && p.a.trim()).length} question{preview.filter(p=>p.q.trim()&&p.a.trim()).length!==1?'s':''}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Question list tab ────────────────────────────────────────────────────────
function ListTab({ questions, onRemove, onClear }) {
  const [expanded, setExpanded] = useState(null);

  if (!questions.length) return (
    <div className="qr-empty">
      <p>Aucune question ajoutée.</p>
      <p>Utilisez l'onglet <strong>Ajouter</strong> pour importer vos questions.</p>
    </div>
  );

  return (
    <div className="qr-list">
      <div className="qr-list-header">
        <span className="qr-list-count">{questions.length} question{questions.length!==1?'s':''}</span>
        <button className="qr-clear-btn" onClick={() => { if (confirm('Supprimer toutes les questions ?')) onClear(); }}>
          <Trash2 size={13} /> Tout supprimer
        </button>
      </div>
      {questions.map((q, i) => (
        <div key={q.id} className={`qr-list-item ${expanded === q.id ? 'open' : ''}`}>
          <div className="qr-list-q" onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
            <span className="qr-list-num">{i + 1}</span>
            <span className="qr-list-qtext">{q.q}</span>
            <span className="qr-list-chevron">{expanded === q.id ? '▲' : '▼'}</span>
          </div>
          {expanded === q.id && (
            <div className="qr-list-a">
              <span className="qr-list-alabel">Réponse</span>
              <p className="qr-list-atext">{q.a}</p>
              <button className="qr-rm-inline" onClick={() => onRemove(q.id)}>
                <Trash2 size={13} /> Supprimer cette question
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Study tab ────────────────────────────────────────────────────────────────
function StudyTab({ questions }) {
  const [queue, setQueue]     = useState(() => [...questions]);
  const [pos, setPos]         = useState(0);
  const [revealed, setRev]    = useState(false);
  const [knownIds, setKnown]  = useState(new Set());
  const [missed, setMissed]   = useState([]);
  const [phase, setPhase]     = useState('study'); // 'study'|'review'|'done'
  const [shuffle, setShuffle] = useState(false);

  function restart(qs) {
    const list = shuffle ? [...qs].sort(() => Math.random() - 0.5) : [...qs];
    setQueue(list);
    setPos(0);
    setRev(false);
    setKnown(new Set());
    setMissed([]);
    setPhase('study');
  }

  // Re-init if questions prop changes (e.g. new import)
  React.useEffect(() => {
    if (phase === 'done') return;
    setQueue(shuffle ? [...questions].sort(() => Math.random() - 0.5) : [...questions]);
  }, [questions]);

  if (!questions.length) return (
    <div className="qr-empty">
      <p>Ajoutez d'abord des questions via l'onglet <strong>Ajouter</strong>.</p>
    </div>
  );

  if (phase === 'done') {
    const total  = questions.length;
    const score  = knownIds.size;
    const pct    = Math.round(score / total * 100);
    return (
      <div className="qr-done">
        <div className="qr-done-score" style={{ color: pct >= 80 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626' }}>
          {pct} %
        </div>
        <div className="qr-done-label">
          {score}/{total} questions maîtrisées
        </div>
        <div className="qr-done-msg">
          {pct === 100 ? '🎉 Parfait ! Toutes les questions sont maîtrisées !'
            : pct >= 80 ? 'Excellent ! Encore quelques révisions et ce sera parfait.'
            : pct >= 50 ? 'Bon travail ! Continue à réviser les questions manquées.'
            : 'Continue à pratiquer — la répétition est la clé !'}
        </div>
        {missed.length > 0 && (
          <div className="qr-done-actions">
            <button className="btn-outline qr-restart-btn" onClick={() => restart(missed)}>
              <RotateCcw size={15} /> Réviser les {missed.length} ratées
            </button>
          </div>
        )}
        <button className="btn-gold qr-restart-btn" onClick={() => restart(questions)}>
          <RotateCcw size={15} /> Recommencer tout
        </button>
      </div>
    );
  }

  const card   = queue[pos];
  const total  = queue.length;
  const pct    = Math.round(pos / total * 100);

  function markKnown() {
    setKnown(s => new Set([...s, card.id]));
    advance();
  }

  function markReview() {
    setMissed(m => [...m, card]);
    advance();
  }

  function advance() {
    setRev(false);
    if (pos + 1 >= total) {
      if (phase === 'review') { setPhase('done'); return; }
      const nextMissed = [...missed, ...(revealed && !knownIds.has(card.id) ? [card] : [])];
      if (nextMissed.length > 0) {
        setMissed([]);
        setQueue(nextMissed);
        setPos(0);
        setRev(false);
        setPhase('review');
      } else {
        setPhase('done');
      }
    } else {
      setPos(p => p + 1);
    }
  }

  return (
    <div className="qr-study">
      {/* Progress */}
      <div className="qr-progress-row">
        <span className="qr-progress-label">
          {phase === 'review' ? 'Révision' : 'Séance'} {pos + 1}/{total}
        </span>
        <div className="qr-progress-bar">
          <div className="qr-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="qr-progress-known">{knownIds.size} ✓</span>
      </div>

      {/* Card */}
      <div className={`qr-card ${revealed ? 'flipped' : ''}`} onClick={() => !revealed && setRev(true)}>
        <div className="qr-card-face qr-card-front">
          <div className="qr-card-label">Question</div>
          <p className="qr-card-text">{card.q}</p>
          {!revealed && <div className="qr-card-hint">Appuyer pour révéler la réponse</div>}
        </div>
        {revealed && (
          <div className="qr-card-face qr-card-back">
            <div className="qr-card-label" style={{ color: '#2563eb' }}>Réponse</div>
            <p className="qr-card-text">{card.a}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {revealed ? (
        <div className="qr-verdict-row">
          <button className="qr-verdict-btn qr-miss" onClick={markReview}>
            <XCircle size={18} /> À revoir
          </button>
          <button className="qr-verdict-btn qr-hit" onClick={markKnown}>
            <CheckCircle size={18} /> Je savais !
          </button>
        </div>
      ) : (
        <button className="qr-reveal-btn" onClick={() => setRev(true)}>
          <Eye size={16} /> Révéler la réponse
        </button>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function QRPage() {
  const { questions, addQuestions, removeQuestion, clearAllQuestions } = useQRStore();
  const [tab, setTab] = useState('reviser');

  function handleAdded(pairs) {
    addQuestions(pairs);
    setTab('reviser');
  }

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Mémorisation</span>
        <div className="training-header-title">Questions &amp; Réponses</div>
        <p className="training-header-sub">
          Importez vos questions par texte ou photo et révisez-les comme des cartes mémoire.
        </p>
      </div>

      <div className="qr-tabs">
        {[
          { id: 'reviser',   label: 'Réviser' },
          { id: 'questions', label: `Questions${questions.length ? ` (${questions.length})` : ''}` },
          { id: 'ajouter',   label: '+ Ajouter' },
        ].map(t => (
          <button
            key={t.id}
            className={`qr-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="qr-panel">
        {tab === 'reviser'   && <StudyTab questions={questions} />}
        {tab === 'questions' && <ListTab questions={questions} onRemove={removeQuestion} onClear={clearAllQuestions} />}
        {tab === 'ajouter'   && <AddTab onAdded={handleAdded} />}
      </div>
    </>
  );
}
