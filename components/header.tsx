import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import RNPickerSelect from 'react-native-picker-select';
import { useNoteContext } from '../context/noteContext';
import { MaterialIcons } from '@expo/vector-icons'; 

const Header = () => {
    const { sortNotes } = useNoteContext();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSortChange = (option: string) => {
        sortNotes(option as 'ascending' | 'descending' | 'dateModified');
        setShowDropdown(false);
    };

    return (
        <View style={tw`items-center justify-between bg-gray-200 w-96 h-20 px-4 py-2 flex-row bottom-96 mb-48 absolute`}>
            <Text style={tw`text-lg font-bold`}>NOTES APP</Text>

            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
                {/* Use a valid Feather icon name */}
                {/* <Feather name="arrow-down" size={24} color="black" /> */}
                <MaterialIcons name="sort" size={24} color="black" />
            </TouchableOpacity>

            {showDropdown && (
                <View style={tw`absolute top-10 right-0 bg-white border border-gray-300 p-2 z-20`}>
                    <RNPickerSelect
                        onValueChange={handleSortChange}
                        items={[
                            
                            { label: 'Ascending', value: 'ascending' },
                            { label: 'Descending', value: 'descending' },
                            { label: 'Date Modified', value: 'dateModified' },
                        ]}
                    />
                </View>
            )}
        </View>
    );
}

export default Header;
