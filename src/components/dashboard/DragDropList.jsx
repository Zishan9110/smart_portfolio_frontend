import { useState } from 'react';
import { FiMove } from 'react-icons/fi';

/**
 * Lightweight drag-and-drop list using native HTML5 drag events — no extra dependency required.
 * Renders items via `renderItem` and calls `onReorder(newArray)` after a drop.
 */
export default function DragDropList({ items, renderItem, onReorder, keyField = '_id' }) {
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  const handleDragStart = (idx) => setDraggedIdx(idx);

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    setOverIdx(idx);
  };

  const handleDrop = (idx) => {
    if (draggedIdx === null || draggedIdx === idx) {
      setDraggedIdx(null);
      setOverIdx(null);
      return;
    }
    const updated = [...items];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    onReorder(updated);
    setDraggedIdx(null);
    setOverIdx(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <div
          key={item[keyField]}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={() => handleDrop(idx)}
          onDragEnd={() => {
            setDraggedIdx(null);
            setOverIdx(null);
          }}
          className={`flex items-center gap-2 transition-opacity ${
            draggedIdx === idx ? 'opacity-40' : 'opacity-100'
          } ${overIdx === idx && draggedIdx !== idx ? 'ring-2 ring-accent-indigo/50 rounded-xl' : ''}`}
        >
          <span className="cursor-grab active:cursor-grabbing text-ink-faint shrink-0" title="Drag to reorder">
            <FiMove size={14} />
          </span>
          <div className="flex-1 min-w-0">{renderItem(item, idx)}</div>
        </div>
      ))}
    </div>
  );
}
