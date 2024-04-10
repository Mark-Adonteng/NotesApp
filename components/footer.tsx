import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/type'; 
import {useNoteContext } from '../context/noteContext'; 

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

const Footer = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const { notes } = useNoteContext();

    const handleEdit = () => {
        navigation.navigate('AddNote'); 
    };

    return (
        <View style={tw`items-center justify-between bg-gray-200 w-96 h-20 px-4 py-2 flex-row bottom-8 absolute`}>
            <Text style={tw`text-lg font-bold`}>{notes.length} Notes</Text>
            <TouchableOpacity onPress={handleEdit}>
                <FontAwesome name="edit" size={24} color="black" style={{ marginRight: 4, fontSize: 30, fontWeight: 'bold' }} />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
