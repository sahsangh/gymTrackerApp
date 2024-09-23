import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';

export default function AddSplitScreen({ navigation }) {
    const [splitName, setSplitName] = useState('');

    // Function to handle adding a new workout split
    const handleAddSplit = () => {
        if (splitName.trim()) {
            // Make a POST request to the backend to add the new split
            fetch('http://localhost:3000/splits', { // Use your server IP if testing on a real device
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    split_name: splitName,  // Send the split name to the backend
                    exercises: [] // Initially an empty list of exercises
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error('Error adding split:', error);
                    // Show error message
                    Alert.alert('Error', 'Something went wrong. Please try again.');
                });
        } else {
            // Show an alert if the split name is empty
            Alert.alert('Validation Error', 'Please enter a valid name for the workout split.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.instructions}>
                Please enter the name for your new workout split in the field below.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter split name"
                placeholderTextColor="#aaa"
                value={splitName}
                onChangeText={setSplitName}
            />
            <Button title="Add Split" onPress={handleAddSplit} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000', // Assuming a dark theme
    },
    instructions: {
        fontSize: 18,
        color: '#aaa',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#1c1c1c',
        color: '#fff', // White text for input
    },
});
