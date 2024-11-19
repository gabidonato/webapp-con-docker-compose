import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './services/api';
import { Note } from './types';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
      setError('');
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNote(editingId, { title, content });
      } else {
        await createNote({ title, content });
      }
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      setError('Failed to save note');
      console.error('Error saving note:', err);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
      console.error('Error deleting note:', err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Notas</h1>
        
        <ErrorMessage message={error} />
        
        <NoteForm
          title={title}
          content={content}
          isEditing={!!editingId}
          onSubmit={handleSubmit}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onCancel={handleCancel}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;