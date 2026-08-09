import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Plus, Link2, Trash2, X } from 'lucide-react';

const STORAGE_KEY = 'apoc_mindmap';
const COLORS = ['#7c3aed', '#d97706', '#059669', '#2563eb', '#dc2626', '#db2777'];

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.nodes) return saved;
  } catch (_) { /* fall through to default */ }
  return {
    nodes: [
      { id: 'n1', text: 'Les 7 sceaux',    x: 90,  y: 40,  color: COLORS[0] },
      { id: 'n2', text: 'Les 7 trompettes', x: 320, y: 40,  color: COLORS[1] },
      { id: 'n3', text: 'Les 7 coupes',    x: 550, y: 40,  color: COLORS[2] },
    ],
    edges: [{ id: 'e1', from: 'n1', to: 'n2' }, { id: 'e2', from: 'n2', to: 'n3' }],
  };
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function MindMap() {
  const [data, setData]         = useState(load);
  const [linking, setLinking]   = useState(false);
  const [linkFrom, setLinkFrom] = useState(null);
  const [adding, setAdding]     = useState(false);
  const [newText, setNewText]   = useState('');
  const dragRef = useRef(null); // { id, offsetX, offsetY }
  const canvasRef = useRef(null);

  useEffect(() => { save(data); }, [data]);

  const addNode = useCallback(() => {
    const text = newText.trim();
    if (!text) return;
    const color = COLORS[data.nodes.length % COLORS.length];
    const x = 60 + Math.random() * 300;
    const y = 100 + Math.random() * 180;
    setData(d => ({ ...d, nodes: [...d.nodes, { id: 'n' + Date.now(), text, x, y, color }] }));
    setNewText('');
    setAdding(false);
  }, [newText, data.nodes.length]);

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
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(rect.width - 130, clientX - rect.left - dragRef.current.offsetX));
    const y = Math.max(0, Math.min(rect.height - 44, clientY - rect.top - dragRef.current.offsetY));
    setData(d => ({ ...d, nodes: d.nodes.map(n => n.id === dragRef.current.id ? { ...n, x, y } : n) }));
  }

  function endDrag() { dragRef.current = null; }

  const findNode = (id) => data.nodes.find(n => n.id === id);

  return (
    <div className="mindmap-card">
      <div className="mindmap-toolbar">
        <button
          className={`mindmap-tool-btn ${!linking && !adding ? '' : ''}`}
          onClick={() => { setAdding(a => !a); setLinking(false); setLinkFrom(null); }}
        >
          <Plus size={14} /> Nœud
        </button>
        <button
          className={`mindmap-tool-btn ${linking ? 'active' : ''}`}
          onClick={() => { setLinking(l => !l); setLinkFrom(null); setAdding(false); }}
        >
          <Link2 size={14} /> {linking ? (linkFrom ? 'Choisir la cible…' : 'Choisir le départ…') : 'Relier'}
        </button>
        {adding && (
          <div className="mindmap-add-row">
            <input
              autoFocus className="mindmap-add-input" placeholder="Ex : Le trône de Dieu"
              value={newText} onChange={e => setNewText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNode()}
            />
            <button className="mindmap-add-confirm" onClick={addNode}>Ajouter</button>
            <button className="mindmap-add-cancel" onClick={() => { setAdding(false); setNewText(''); }}><X size={13} /></button>
          </div>
        )}
      </div>

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
            {n.text}
            {!linking && (
              <button className="mindmap-node-rm" onClick={(e) => { e.stopPropagation(); removeNode(n.id); }}>
                <Trash2 size={11} />
              </button>
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
