import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { useNoteContext } from '../context/noteContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

type RootStackParamList = {
    AddNote: { initialTitle?: string; initialContent?: string }; // Define initialTitle and initialContent in the route params
};

type AddNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddNote'>;

interface AddNoteProps {
    navigation: AddNoteScreenNavigationProp;
    route: any;
}

const AddNoteScreen: React.FC<AddNoteProps> = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control the modal
    const { addNote, updateNote, deleteNote } = useNoteContext(); // Import updateNote function from context

    useEffect(() => {
        if (route.params?.initialTitle && route.params?.initialContent) {
            setTitle(route.params.initialTitle);
            setNotes(route.params.initialContent);
        }
    }, []);

    const handleSave = () => {
        if (title.trim() === '' || notes.trim() === '') {
            Alert.alert('Error', 'Please enter both title and notes.');
            return;
        }

        if (route.params?.initialTitle && route.params?.initialContent) {
            // If initial values exist, update the note
            updateNote(route.params.initialTitle, title, notes); // Update the note with the initial title
        } else {
            // Otherwise, add a new note
            addNote(title, notes);
        }

        navigation.goBack();
    };

    const handleDelete = () => {
        setShowModal(true); // Show the delete confirmation modal
    };

    const confirmDelete = () => {
        deleteNote(route.params.initialTitle);
        setShowModal(false); // Close the modal after deletion
        navigation.goBack();
    };

    return (
        <View style={tw`items-center absolute w-96`}>
            <View style={{ flex: 1, padding: 20 }} >
                <TouchableOpacity style={tw`ml-96`} onPress={handleSave}>
                    <FontAwesome5 name="save" size={24} color="black" style={{ marginRight: 4, fontSize: 30, fontWeight: 'bold' }} />
                </TouchableOpacity>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 20 }}
                    placeholder="Enter Title"
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    style={{ height: 400, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 20 }}
                    placeholder="Enter Notes"
                    multiline
                    value={notes}
                    onChangeText={text => setNotes(text)}
                />
                <View style={tw`items-center justify-between bg-gray-200 w-96 h-20 px-4 py-2 flex-row bottom-0 mt-20 ml-4`}>
                    <TouchableOpacity>
                        <FontAwesome5 name="list-ul" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <FontAwesome5 name="trash-alt" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="edit" size={24} color="black" style={{ marginRight: 4, fontSize: 30, fontWeight: 'bold' }} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Delete confirmation modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-gray-700 bg-opacity-50`}>
                    <View style={tw`bg-white p-4 rounded-md`}>
                        <Text style={tw`text-lg font-bold mb-2`}>Are you sure you want to delete?</Text>
                        <View style={tw`flex-row justify-between`}>
                            <Pressable style={tw`p-2 bg-red-500 rounded-md ml-24`} onPress={confirmDelete}>
                                <Text style={tw`text-white`}>Yes</Text>
                            </Pressable>
                            <Pressable style={tw`p-2 bg-gray-500 rounded-md mr-24`} onPress={() => setShowModal(false)}>
                                <Text style={tw`text-white`}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddNoteScreen;
