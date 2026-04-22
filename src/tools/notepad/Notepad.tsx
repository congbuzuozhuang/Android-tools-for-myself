import { useState, useEffect } from 'react';
import type { ToolProps } from '../types';
import { loadFromStorage, saveToStorage } from '../../utils/storage';

interface Note {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

const Notepad: React.FC<ToolProps> = ({ config, onSaveConfig, showToast }) => {
  const [notes, setNotes] = useState<Note[]>(() => loadFromStorage<Note[]>('notes', []));
  const [currentNote, setCurrentNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    saveToStorage('notes', notes);
  }, [notes]);

  const createNote = () => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      content: currentNote,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setCurrentNote('');
    showToast?.('笔记已保存');
  };

  const updateNote = (id: string, content: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content, updatedAt: Date.now() } : note
      )
    );
    setEditingId(null);
    showToast?.('笔记已更新');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    showToast?.('笔记已删除');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="notepad">
      <div className="notepad-input">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="输入笔记内容..."
          rows={3}
        />
        <button onClick={createNote} disabled={!currentNote.trim()}>
          保存笔记
        </button>
      </div>

      <div className="notepad-list">
        {notes.length === 0 ? (
          <div className="notepad-empty">暂无笔记，写下第一条吧</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              {editingId === note.id ? (
                <div className="note-edit">
                  <textarea
                    defaultValue={note.content}
                    rows={3}
                    autoFocus
                    id={`edit-${note.id}`}
                  />
                  <div className="note-edit-actions">
                    <button
                      onClick={() => {
                        const content = (
                          document.getElementById(`edit-${note.id}`) as HTMLTextAreaElement
                        )?.value;
                        if (content) updateNote(note.id, content);
                      }}
                    >
                      保存
                    </button>
                    <button onClick={() => setEditingId(null)}>取消</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="note-content">{note.content}</div>
                  <div className="note-meta">
                    <span>{formatDate(note.updatedAt)}</span>
                    <div className="note-actions">
                      <button onClick={() => setEditingId(note.id)}>编辑</button>
                      <button onClick={() => deleteNote(note.id)} className="delete-btn">
                        删除
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notepad;