import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
    onSearch: (text: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleSearch = (text: string) => {
        onSearch(text); 
    };

    return (
        <View style={tw`bottom-48`}>
            <TextInput
                style={tw`bg-gray-200 p-2 m-2 rounded-lg flex-row items-center h-12 top-0 w-96 text-lg font-bold`}
                placeholder="Search..."
                
                onChangeText={handleSearch}
            />
            
        </View>
    );
};

export default SearchBar;
