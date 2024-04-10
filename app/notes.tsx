import React, { useState } from 'react';
import { View } from 'react-native';
import NoteItem from '../components/noteItem';
import tw from 'tailwind-react-native-classnames';
import { useNoteContext } from '../context/noteContext';
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { RootStackParamList } from '../constants/type'; // Import RootStackParamList
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/searchBar';

type NotesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddNote'>;

const Notes = () => {
    const { notes } = useNoteContext();
    const navigation = useNavigation<NotesScreenNavigationProp>(); 
    const [searchText, setSearchText] = useState('');

      
      const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = (text: string) => {
        setSearchText(text);
    };

    return (
        <View style={tw`flex flex-col absolute h-20`}>
             <SearchBar onSearch={handleSearch} />
            <View style={tw`mt-16 ml-2`}>
                {filteredNotes.map((note, index) => (
                    <NoteItem key={index} title={note.title} content={note.content} navigation={navigation} />
                ))}
            </View>
        </View>
    );
};

export default Notes;
