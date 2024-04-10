import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../constants/type';

type NoteItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddNote'>;

interface NoteItemProps {
    title: string;
    content: string;
    navigation: NoteItemScreenNavigationProp;
}

const NoteItem: React.FC<NoteItemProps> = ({ title, content, navigation }) => {
    const handlePress = () => {
        navigation.navigate('AddNote', { initialTitle: title, initialContent: content });
    };

    // Function to get the first line of content
    const getFirstLine = (text: string) => {
        const indexOfNewLine = text.indexOf('\n');
        return indexOfNewLine !== -1 ? text.substring(0, indexOfNewLine) : text;
    };

    return (
        
            <View style={tw`bg-white rounded-lg p-2 my-2 shadow-md bottom-64 w-96 `}>
                <TouchableOpacity onPress={handlePress}>
                <Text style={tw`text-lg font-bold mb-2`}>{title}</Text>
                <Text style={tw`text-sm text-gray-500`}>
                    {getFirstLine(content)}
                    {/* Display ellipsis (...) if content has multiple lines */}
                    {content.indexOf('\n') !== -1 && ' ...'}
                </Text>
                </TouchableOpacity>
            </View>
        
    );
};

export default NoteItem;
