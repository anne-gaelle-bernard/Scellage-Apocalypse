import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Plus, Link2, Trash2, X, Pencil } from 'lucide-react';

const STORAGE_KEY = 'apoc_mindmap';
const COLORS = ['#7c3aed', '#d97706', '#059669', '#2563eb', '#dc2626', '#db2777'];
const EMOJI_PALETTE = [
  '📖','🔥','⚡','👑','🐑','🦁','⭐','🌊','🎺','📯',
  '🐉','👼','🕊️','💫','🔑','🚪','⚔️','🌅','🌈','🍞',
];

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.nodes) return saved;
  } catch (_) { /* fall through to default */ }
  return {
    nodes: [
      { id: 'n1', text: 'Les 7 sceaux',     x: 90,  y: 40, color: COLORS[0], emoji: '📜', mnemo: '' },
      { id: 'n2', text: 'Les 7 trompettes', x: 320, y: 40, color: COLORS[1], emoji: '🎺', mnemo: '' },
      { id: 'n3', text: 'Les 7 coupes',     x: 550, y: 40, color: COLORS[2], emoji: '🍷', mnemo: '' },
    ],
    edges: [{ id: 'e1', from: 'n1', to: 'n2' }, { id: 'e2', from: 'n2', to: 'n3' }],
  };
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function NodeForm({ initial, onCancel, onSubmit }) {
  const [text, setText]   = useState(initial?.text || '');
  const [emoji, setEmoji] = useState(initial?.emoji || '');
  const [mnemo, setMnemo] = useState(initial?.mnemo || '');

  function submit() {
    if (!text.trim()) return;
    onSubmit({ text: text.trim(), emoji: emoji.trim(), mnemo: mnemo.trim() });
  }

  return (
    <div className="mindmap-form">
      <div className="mindmap-form-row">
        <input
          autoFocus className="mindmap-add-input" placeholder="Ex : Le trône de Dieu"
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <input
          className="mindmap-emoji-input" placeholder="🙂" maxLength={4}
          value={emoji} onChange={e => setEmoji(e.target.value)}
        />
      </div>
      <div className="mindmap-emoji-palette">
        {EMOJI_PALETTE.map(em => (
          <button
            key={em}
            className={`mindmap-emoji-opt ${emoji === em ? 'active' : ''}`}
            onClick={() => setEmoji(em)}
          >
            {em}
          </button>
        ))}
      </div>
      <input
        className="mindmap-add-input" placeholder="Mnémonique / moyen mnémotechnique (optionnel)"
        value={mnemo} onChange={e => setMnemo(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
      <div className="mindmap-form-actions">
        <button className="mindmap-add-confirm" onClick={submit}>
          {initial ? 'Enregistrer' : 'Ajouter'}
        </button>
        <button className="mindmap-add-cancel" onClick={onCancel}><X size={13} /></button>
      </div>
    </div>
  );
}

export default function MindMap() {
  const [data, setData]         = useState(load);
  const [linking, setLinking]   = useState(false);
  const [linkFrom, setLinkFrom] = useState(null);
  const [adding, setAdding]     = useState(false);
  const [editingId, setEditingId] = useState(null);
  const dragRef = useRef(null); // { id, offsetX, offsetY, moved }
  const canvasRef = useRef(null);

  useEffect(() => { save(data); }, [data]);

  const addNode = useCallback(({ text, emoji, mnemo }) => {
    const color = COLORS[data.nodes.length % COLORS.length];
    const x = 60 + Math.random() * 300;
    const y = 100 + Math.random() * 180;
    setData(d => ({ ...d, nodes: [...d.nodes, { id: 'n' + Date.now(), text, x, y, color, emoji, mnemo }] }));
    setAdding(false);
  }, [data.nodes.length]);

  const editNode = useCallback((id, { text, emoji, mnemo }) => {
    setData(d => ({ ...d, nodes: d.nodes.map(n => n.id === id ? { ...n, text, emoji, mnemo } : n) }));
    setEditingId(null);
  }, []);

  function removeNode(id) {
    setData(d => ({
      nodes: d.nodes.filter(n => n.id !== id),
      edges: d.edges.filter(e => e.from !== id && e.to !== id),
    }));
  }

  function removeEdge(id) {
    setData(d => ({ ...d, edges: d.edges.filter(e => e.id !== id) }));
  }

  function handleNodeClick(id) {
    if (!linking) return;
    if (!linkFrom) { setLinkFrom(id); return; }
    if (linkFrom === id) { setLinkFrom(null); return; }
    const exists = data.edges.some(e =>
      (e.from === linkFrom && e.to === id) || (e.from === id && e.to === linkFrom)
    );
    if (!exists) {
      setData(d => ({ ...d, edges: [...d.edges, { id: 'e' + Date.now(), from: linkFrom, to: id }] }));
    }
    setLinkFrom(null);
  }

  function startDrag(e, node) {
    if (linking) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { id: node.id, offsetX: clientX - rect.left - node.x, offsetY: clientY - rect.top - node.y };
  }

  function onMove(e) {
    if (!dragRef.current) return;
    // The canvas already has `touch-action: none` to stop the page from
    // scrolling during a drag — calling preventDefault() here as well can
    // throw ("Unable to preventDefault inside passive event listener") on
    // some WebViews since React attaches touch handlers as passive by
    // default, which crashes the whole page with nothing rendered.
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const nodeW = rect.width < 400 ? 100 : 130;
    const x = Math.max(0, Math.min(rect.width - nodeW, clientX - rect.left - dragRef.current.offsetX));
    const y = Math.max(0, Math.min(rect.height - 60, clientY - rect.top - dragRef.current.offsetY));
    // Snapshot the id now — dragRef.current can be nulled by endDrag() before
    // this updater actually runs (touchend firing right after a fast touchmove
    // on mobile), which would otherwise crash on `dragRef.current.id`.
    const draggedId = dragRef.current.id;
    setData(d => ({ ...d, nodes: d.nodes.map(n => n.id === draggedId ? { ...n, x, y } : n) }));
  }

  function endDrag() { dragRef.current = null; }

  const findNode = (id) => data.nodes.find(n => n.id === id);
  const editingNode = editingId ? findNode(editingId) : null;

  return (
    <div className="mindmap-card">
      <div className="mindmap-toolbar">
        <button
          className="mindmap-tool-btn"
          onClick={() => { setAdding(a => !a); setLinking(false); setLinkFrom(null); setEditingId(null); }}
        >
          <Plus size={14} /> Nœud
        </button>
        <button
          className={`mindmap-tool-btn ${linking ? 'active' : ''}`}
          onClick={() => { setLinking(l => !l); setLinkFrom(null); setAdding(false); setEditingId(null); }}
        >
          <Link2 size={14} /> {linking ? (linkFrom ? 'Choisir la cible…' : 'Choisir le départ…') : 'Relier'}
        </button>
      </div>

      {adding && <NodeForm onCancel={() => setAdding(false)} onSubmit={addNode} />}
      {editingNode && (
        <NodeForm
          initial={editingNode}
          onCancel={() => setEditingId(null)}
          onSubmit={(vals) => editNode(editingId, vals)}
        />
      )}

      <div
        className="mindmap-canvas"
        ref={canvasRef}
        onMouseMove={onMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={onMove}
        onTouchEnd={endDrag}
      >
        <svg className="mindmap-svg">
          {data.edges.map(e => {
            const a = findNode(e.from), b = findNode(e.to);
            if (!a || !b) return null;
            const ax = a.x + 60, ay = a.y + 20, bx = b.x + 60, by = b.y + 20;
            return (
              <g key={e.id} className="mindmap-edge-g" onClick={() => removeEdge(e.id)}>
                <line x1={ax} y1={ay} x2={bx} y2={by} className="mindmap-edge-hit" />
                <line x1={ax} y1={ay} x2={bx} y2={by} className="mindmap-edge" />
              </g>
            );
          })}
        </svg>

        {data.nodes.map(n => (
          <div
            key={n.id}
            className={`mindmap-node ${linking ? 'linkable' : ''} ${linkFrom === n.id ? 'link-source' : ''}`}
            style={{ left: n.x, top: n.y, borderColor: n.color, color: n.color }}
            onMouseDown={e => startDrag(e, n)}
            onTouchStart={e => startDrag(e, n)}
            onClick={() => handleNodeClick(n.id)}
          >
            {n.emoji && <div className="mindmap-node-emoji">{n.emoji}</div>}
            <div className="mindmap-node-text">{n.text}</div>
            {n.mnemo && <div className="mindmap-node-mnemo">« {n.mnemo} »</div>}
            {!linking && (
              <div className="mindmap-node-actions">
                <button className="mindmap-node-act" onClick={(e) => { e.stopPropagation(); setEditingId(n.id); setAdding(false); }}>
                  <Pencil size={11} />
                </button>
                <button className="mindmap-node-act" onClick={(e) => { e.stopPropagation(); removeNode(n.id); }}>
                  <Trash2 size={11} />
                </button>
              </div>
            )}
          </div>
        ))}

        {data.nodes.length === 0 && (
          <p className="mindmap-empty">Ajoutez un nœud pour commencer votre carte mentale.</p>
        )}
      </div>

      <p className="mindmap-hint">
        Glissez les nœuds pour les organiser · cliquez une ligne pour la supprimer
      </p>
    </div>
  );
}
