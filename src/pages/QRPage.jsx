import React, { useState, useMemo } from 'react';
import { useQRStore } from '../hooks/useQRStore';
import { useSrsStore } from '../hooks/useSrsStore';
import {
  Trash2, CheckCircle, XCircle,
  RotateCcw, Clock,
} from 'lucide-react';

// ─── Add tab ──────────────────────────────────────────────────────────────────
function AddTab({ onAdded }) {
  const [pairs, setPairs] = useState([{ q: '', a: '' }]);

  function updatePair(i, field, val) {
    setPairs(prev => prev.map((p, j) => j === i ? { ...p, [field]: val } : p));
  }

  function removePair(i) {
    setPairs(prev => prev.filter((_, j) => j !== i));
  }

  function addBlank() {
    setPairs(prev => [...prev, { q: '', a: '' }]);
  }

  function confirmAdd() {
    const valid = pairs.filter(p => p.q.trim() && p.a.trim());
    if (!valid.length) return;
    onAdded(valid);
    setPairs([{ q: '', a: '' }]);
  }

  const validCount = pairs.filter(p => p.q.trim() && p.a.trim()).length;

  return (
    <div className="qr-add-flow">
      <div className="qr-preview">
        {pairs.map((pair, i) => (
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
            {pairs.length > 1 && (
              <button className="qr-rm-btn" onClick={() => removePair(i)} title="Supprimer">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}

        <button className="qr-add-pair-btn" onClick={addBlank}>+ Ajouter une question</button>

        {validCount > 0 && (
          <button className="btn-gold qr-confirm-btn" onClick={confirmAdd}>
            <CheckCircle size={16} />
            Ajouter {validCount} question{validCount !== 1 ? 's' : ''}
          </button>
        )}
      </div>
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
  const { markReview: markSrs, isDue } = useSrsStore('apoc_srs_qr');
  const [queue, setQueue]     = useState(() => [...questions]);
  const [pos, setPos]         = useState(0);
  const [revealed, setRev]    = useState(false);
  const [knownIds, setKnown]  = useState(new Set());
  const [missed, setMissed]   = useState([]);
  const [phase, setPhase]     = useState('study'); // 'study'|'review'|'done'
  const [shuffle, setShuffle] = useState(false);

  const dueCount = useMemo(() => questions.filter(q => isDue(q.id)).length, [questions, isDue]);

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
            : 'Continue à pratiquer, la répétition est la clé !'}
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
  const missedIds = new Set(missed.map(m => m.id));

  function markKnown() {
    markSrs(card.id, true);
    setKnown(s => new Set([...s, card.id]));
    advance(true);
  }

  function markReview() {
    markSrs(card.id, false);
    setMissed(m => [...m, card]);
    advance(false);
  }

  function advance(wasKnown) {
    setRev(false);
    if (pos + 1 >= total) {
      if (phase === 'review') { setPhase('done'); return; }
      const nextMissed = wasKnown ? [...missed] : [...missed, card];
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

      {dueCount > 0 && (
        <div className="qr-due-banner">
          <Clock size={13} strokeWidth={2} />
          {dueCount} question{dueCount > 1 ? 's' : ''} à réviser aujourd'hui (répétition espacée)
        </div>
      )}

      {/* Expandable list: answered items collapsed with a status icon,
          the current item open for review, upcoming items dimmed */}
      <div className="qr-study-list">
        {queue.map((q, i) => {
          const isDone   = i < pos;
          const isActive = i === pos;
          const isKnown  = knownIds.has(q.id);
          const isMissed = missedIds.has(q.id);

          return (
            <div
              key={q.id}
              className={`qr-study-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${!isDone && !isActive ? 'pending' : ''}`}
            >
              <div
                className="qr-study-item-head"
                onClick={() => { if (isActive) setRev(r => !r); }}
              >
                <span className="qr-study-num">
                  {isDone
                    ? (isKnown ? <CheckCircle size={15} className="qr-study-ic-hit" /> : <XCircle size={15} className="qr-study-ic-miss" />)
                    : i + 1}
                </span>
                <span className="qr-study-qtext">{q.q}</span>
                {isActive && <span className="qr-study-chevron">{revealed ? '▲' : '▼'}</span>}
              </div>

              {isActive && revealed && (
                <div className="qr-study-answer">
                  <span className="qr-study-alabel">Réponse</span>
                  <p className="qr-study-atext">{q.a}</p>
                  <div className="qr-verdict-row">
                    <button className="qr-verdict-btn qr-miss" onClick={markReview}>
                      <XCircle size={18} /> À revoir
                    </button>
                    <button className="qr-verdict-btn qr-hit" onClick={markKnown}>
                      <CheckCircle size={18} /> Je savais !
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
          Collez vos questions et révisez-les comme des cartes mémoire.
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
