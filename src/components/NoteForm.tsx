import React from 'react';
import { PlusCircle, Save, X } from 'lucide-react';

interface NoteFormProps {
  title: string;
  content: string;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
}

export function NoteForm({
  title,
  content,
  isEditing,
  onSubmit,
  onTitleChange,
  onContentChange,
  onCancel
}: NoteFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={onTitleChange}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={onContentChange}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
        >
          {isEditing ? <Save size={20} /> : <PlusCircle size={20} />}
          {isEditing ? 'Actualizar Nota' : 'Agregar Nota'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            <X size={20} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}