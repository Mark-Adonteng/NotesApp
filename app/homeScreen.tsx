import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import Footer from '../components/footer';
import Notes from '../app/notes';

const HomeScreen = () => {
  
    const handleSave = (title: string, notes: string) => {
        // Logic to save the title and notes
        console.log("Title:", title);
        console.log("Notes:", notes);
    };
    
      return (
        <View style={styles.container}>
          <Header/>
          
          <Notes/>
          <Footer />
         
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      },
    });

export default HomeScreen
