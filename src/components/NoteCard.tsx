import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
      <p className="text-gray-300 mb-4 whitespace-pre-wrap">{note.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
            title="Editar nota"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-400 hover:text-red-300 transition-colors"
            title="Borrar nota"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}