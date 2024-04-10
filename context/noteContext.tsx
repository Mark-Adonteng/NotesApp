import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type Note = {
  title: string;
  content: string;
  dateModified: Date; 
};

type SortOption = 'ascending' | 'descending' | 'dateModified';

type NoteContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (oldTitle: string, newTitle: string, content: string) => void;
  deleteNote: (title: string) => void;
  sortNotes: (option: SortOption) => void; // Add sortNotes function
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getItem, setItem } = useAsyncStorage('@notes'); // Initialize AsyncStorage
  
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await getItem();
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    };
    loadNotes();
  }, []);

  const addNote = async (title: string, content: string) => {
    const newNote: Note = { title, content, dateModified: new Date() };
    setNotes([...notes, newNote]);
    await setItem(JSON.stringify([...notes, newNote]));
  };

  const updateNote = async (oldTitle: string, newTitle: string, content: string) => {
    const updatedNotes = notes.map(note => (note.title === oldTitle ? { ...note, title: newTitle, content, dateModified: new Date() } : note));
    setNotes(updatedNotes);
    await setItem(JSON.stringify(updatedNotes));
  };

  const deleteNote = async (title: string) => {
    const updatedNotes = notes.filter(note => note.title !== title);
    setNotes(updatedNotes);
    await setItem(JSON.stringify(updatedNotes));
  };

  const sortNotes = (option: SortOption) => {
    let sortedNotes = [...notes];
    switch (option) {
      case 'ascending':
        sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'descending':
        sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateModified':
        sortedNotes.sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime());
        break;
      default:
        break;
    }
    setNotes(sortedNotes);
  };

  useEffect(() => {
    console.log('Number of notes:', notes.length);
  }, [notes]);

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, sortNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
