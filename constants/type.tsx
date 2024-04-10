// types.ts
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    AddNote: undefined;
    
};

export type AddNoteScreenRouteProp = RouteProp<RootStackParamList, 'AddNote'>;
