import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { ChevronLeft, ChevronRight, BookOpen, Sigma, AlignLeft, Pilcrow } from 'lucide-react';
import {
  detectVerbs, detectGrammar, detectPunctuation, detectStructure,
  buildHighlightedTokens, TENSE_EXPL, GRAMMAR_CATS, PUNCT_RULES,
} from '../utils/grammarAnalysis';

const TABS = [
  { id: 'conjugaison', label: 'Conjugaison',  Icon: Sigma,     color: '#d97706' },
  { id: 'grammaire',   label: 'Grammaire',    Icon: BookOpen,  color: '#2563eb' },
  { id: 'ponctuation', label: 'Ponctuation',  Icon: Pilcrow,   color: '#7c3aed' },
  { id: 'structure',   label: 'Structure',    Icon: AlignLeft, color: '#059669' },
];

// ── Annotated verse text ──────────────────────────────────────────────────────
function AnnotatedText({ tokens }) {
  const [tooltip, setTooltip] = useState(null);
  return (
    <div className="cours-verse-text">
      {tokens.map((tok, i) => {
        if (tok.type === 'space') return <span key={i}> </span>;
        if (!tok.highlight) {
          return <span key={i} className="cours-tok">{tok.value}</span>;
        }
        return (
          <span
            key={i}
            className="cours-tok cours-tok-hi"
            style={{ background: tok.highlight.bg, color: tok.highlight.color, borderBottom: `2px solid ${tok.highlight.color}` }}
            title={tok.highlight.label}
          >
            {tok.value}
          </span>
        );
      })}
    </div>
  );
}

// ── Conjugaison panel ─────────────────────────────────────────────────────────
function ConjPanel({ verbs }) {
  if (!verbs.length) return <p className="cours-empty">Aucun verbe identifié dans ce verset.</p>;

  const grouped = {};
  verbs.forEach(v => {
    const key = v.inf;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(v);
  });

  return (
    <div className="cours-panel-list">
      {Object.entries(grouped).map(([inf, forms]) => (
        <div key={inf} className="cours-verb-card">
          <div className="cours-verb-header">
            <span className="cours-verb-inf">{ inf.toUpperCase() }</span>
          </div>
          {forms.map((v, i) => (
            <div key={i} className="cours-verb-row">
              <span className="cours-verb-form" style={{ background: 'rgba(217,119,6,.13)', color: '#92400e', border: '1.5px solid rgba(217,119,6,.3)' }}>
                {v.word}
              </span>
              <div className="cours-verb-meta">
                <span className="cours-verb-tense">{v.tense}</span>
                <span className="cours-verb-pers">{v.pers}</span>
              </div>
            </div>
          ))}
          {forms[0] && TENSE_EXPL[forms[0].tense.split(' / ')[0]] && (
            <p className="cours-expl">{TENSE_EXPL[forms[0].tense.split(' / ')[0]]}</p>
          )}
        </div>
      ))}

      <div className="cours-tip">
        <strong>Rappel des temps :</strong>
        <ul className="cours-tip-list">
          <li><em>Passé simple</em> → action passée ponctuelle dans un récit (très fréquent dans l'Apocalypse).</li>
          <li><em>Imparfait</em> → description, décor, répétition dans le passé.</li>
          <li><em>Présent</em> → vérité universelle, action en cours ou discours direct.</li>
          <li><em>Futur</em> → prophétie, promesse divine.</li>
          <li><em>Participe passé</em> → avec être/avoir pour former les temps composés, ou adjectif verbal.</li>
          <li><em>Subjonctif</em> → souhait, nécessité, après « que ».</li>
        </ul>
      </div>
    </div>
  );
}

// ── Grammaire panel ───────────────────────────────────────────────────────────
function GramPanel({ grammar }) {
  if (!grammar.length) return <p className="cours-empty">Aucun élément grammatical identifié.</p>;

  const grouped = {};
  grammar.forEach(g => {
    const k = g.cat.key;
    if (!grouped[k]) grouped[k] = { cat: g.cat, words: [] };
    if (!grouped[k].words.includes(g.word)) grouped[k].words.push(g.word);
  });

  return (
    <div className="cours-panel-list">
      {Object.entries(grouped).map(([key, { cat, words }]) => (
        <div key={key} className="cours-gram-card" style={{ borderLeft: `3px solid ${cat.color}` }}>
          <div className="cours-gram-header">
            <span className="cours-gram-label" style={{ color: cat.color }}>{cat.label}</span>
            <div className="cours-gram-words">
              {words.map((w, i) => (
                <span key={i} className="cours-gram-chip" style={{ background: cat.color + '18', color: cat.color, border: `1px solid ${cat.color}40` }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
          <p className="cours-expl">{cat.expl}</p>
        </div>
      ))}

      <div className="cours-tip">
        <strong>Ordre des mots en français :</strong> Sujet → Verbe → Complément (SVC).
        Les adjectifs qualificatifs se placent généralement <em>après</em> le nom (ex : « la prophétie divine »),
        sauf quelques adjectifs courts placés avant (beau, grand, bon, petit…).
      </div>
    </div>
  );
}

// ── Ponctuation panel ─────────────────────────────────────────────────────────
function PunctPanel({ punct }) {
  if (!punct.length) return <p className="cours-empty">Aucune ponctuation spécifique dans ce verset.</p>;

  const seen = new Set();
  const unique = punct.filter(p => {
    if (seen.has(p.char)) return false;
    seen.add(p.char); return true;
  });

  return (
    <div className="cours-panel-list">
      {unique.map((p, i) => (
        <div key={i} className="cours-punct-card" style={{ borderLeft: `3px solid ${p.rule.color}` }}>
          <div className="cours-punct-header">
            <span className="cours-punct-sym" style={{ color: p.rule.color }}>{p.char}</span>
            <span className="cours-punct-name" style={{ color: p.rule.color }}>{p.rule.name}</span>
          </div>
          <p className="cours-expl">{p.rule.expl}</p>
        </div>
      ))}

      <div className="cours-tip">
        <strong>Règle générale :</strong> En français, les signes <em>doubles</em> (? ! : ; « ») sont précédés
        d'une espace insécable. Les signes <em>simples</em> (virgule, point) s'attachent directement au mot précédent.
      </div>
    </div>
  );
}

// ── Structure panel ───────────────────────────────────────────────────────────
function StructPanel({ structure, text }) {
  const { sentences, connectors, relCount, coordCount, sentenceCount } = structure;

  return (
    <div className="cours-panel-list">
      {/* Sentence breakdown */}
      <div className="cours-struct-overview">
        <div className="cours-struct-stat">
          <span className="css-n">{sentenceCount}</span>
          <span className="css-l">phrase{sentenceCount > 1 ? 's' : ''}</span>
        </div>
        <div className="cours-struct-stat">
          <span className="css-n" style={{ color: '#d97706' }}>{coordCount}</span>
          <span className="css-l">coordination{coordCount > 1 ? 's' : ''}</span>
        </div>
        <div className="cours-struct-stat">
          <span className="css-n" style={{ color: '#7c3aed' }}>{relCount}</span>
          <span className="css-l">subordonnée{relCount > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Each sentence */}
      {sentences.map((s, i) => (
        <div key={i} className="cours-sent-card">
          <div className="cours-sent-label">Phrase {i + 1}</div>
          <p className="cours-sent-text">«&nbsp;{s}&nbsp;»</p>
          <p className="cours-expl">
            {s.endsWith('!') ? 'Phrase exclamative — exprime une louange, une injonction ou une émotion forte.' :
             s.endsWith('?') ? 'Phrase interrogative — pose une question.' :
             'Phrase déclarative — énonce un fait, une vérité ou une révélation.'}
          </p>
        </div>
      ))}

      {/* Connectors */}
      {connectors.length > 0 && (
        <div className="cours-conns">
          <div className="cours-conns-title">Connecteurs logiques</div>
          {connectors.map((c, i) => (
            <div key={i} className="cours-conn-row" style={{
              borderLeft: `3px solid ${c.type === 'coordination' ? '#d97706' : '#7c3aed'}`
            }}>
              <span className="cours-conn-word" style={{ color: c.type === 'coordination' ? '#d97706' : '#7c3aed' }}>
                {c.word}
              </span>
              <span className="cours-conn-expl">{c.expl}</span>
            </div>
          ))}
        </div>
      )}

      <div className="cours-tip">
        <strong>Types de propositions :</strong>
        <ul className="cours-tip-list">
          <li><em>Principale</em> → peut se lire seule, a un sens complet.</li>
          <li><em>Subordonnée relative</em> → introduite par qui, que, dont, où ; qualifie un nom antécédent.</li>
          <li><em>Subordonnée conjonctive</em> → introduite par que, si, quand… ; complète le verbe principal.</li>
          <li><em>Coordonnée</em> → reliée à une autre proposition par et, mais, car, donc, ou…</li>
        </ul>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CoursPage() {
  const { selectedVerses, navigate } = useApp();
  const [tab, setTab]   = useState('conjugaison');
  const [idx, setIdx]   = useState(0);

  const cards = useMemo(() =>
    Object.values(selectedVerses)
      .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse),
    [selectedVerses]);

  const card = cards[idx];

  const analysis = useMemo(() => {
    if (!card) return null;
    return {
      verbs:     detectVerbs(card.text),
      grammar:   detectGrammar(card.text),
      punct:     detectPunctuation(card.text),
      structure: detectStructure(card.text),
    };
  }, [card]);

  const tokens = useMemo(() =>
    card && analysis ? buildHighlightedTokens(card.text, tab, analysis) : [],
    [card, analysis, tab]);

  const total = cards.length;

  function goTo(newIdx) {
    setIdx(newIdx);
  }

  if (!cards.length) return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Français</span>
        <div className="training-header-title">Cours de français</div>
      </div>
      <div className="empty-msg">
        Aucun verset sélectionné.{' '}
        <span style={{ color: 'var(--action)', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('lecture')}>
          Allez lire et sélectionnez des versets →
        </span>
      </div>
    </>
  );

  const activeTab = TABS.find(t => t.id === tab);

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Français</span>
        <div className="training-header-title">Cours de français</div>
        <p className="training-header-sub">
          Analyse grammaticale du verset : conjugaison, grammaire, ponctuation et structure de phrase.
        </p>
      </div>

      {/* Verse navigator */}
      <div className="dictee-nav">
        <button className="dictee-nav-btn" onClick={() => goTo((idx - 1 + total) % total)} disabled={total <= 1}>
          <ChevronLeft size={16} />
        </button>
        <span className="dictee-nav-ref">Ap {card.chap}:{card.verse} &nbsp;·&nbsp; {idx + 1}/{total}</span>
        <button className="dictee-nav-btn" onClick={() => goTo((idx + 1) % total)} disabled={total <= 1}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Annotated verse */}
      <div className="cours-verse-wrap">
        <div className="cours-verse-label">
          <span className="cours-legend-dot" style={{ background: activeTab.color }} />
          {activeTab.label} — mots surlignés
        </div>
        <AnnotatedText tokens={tokens} />
      </div>

      {/* Tabs */}
      <div className="cours-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`cours-tab ${tab === t.id ? 'active' : ''}`}
            style={tab === t.id ? { color: t.color, borderBottom: `2.5px solid ${t.color}` } : {}}
            onClick={() => setTab(t.id)}
          >
            <t.Icon size={15} strokeWidth={1.75} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="cours-panel">
        {tab === 'conjugaison' && <ConjPanel  verbs={analysis.verbs} />}
        {tab === 'grammaire'   && <GramPanel  grammar={analysis.grammar} />}
        {tab === 'ponctuation' && <PunctPanel punct={analysis.punct} />}
        {tab === 'structure'   && <StructPanel structure={analysis.structure} text={card.text} />}
      </div>
    </>
  );
}
