// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/homeScreen';
import AddNoteScreen from './components/addNote'; // Corrected import path
import { NoteProvider } from './context/noteContext';
import Notes from './app/notes';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NoteProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen} 
          initialParams={{ onSave: (title: string, notes: string) => console.log(title, notes) }} 
        />
        <Stack.Screen name="Notes" component={Notes} />
  
      </Stack.Navigator>
    </NavigationContainer>
    </NoteProvider>
  );
}
