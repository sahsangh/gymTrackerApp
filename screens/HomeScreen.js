import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
    const [splits, setSplits] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state while fetching data

    // Function to fetch workout splits from the backend
    const fetchSplits = () => {
        setLoading(true); // Start loading while fetching
        fetch('http://localhost:3000/splits') // Replace with your server's IP if on a real device
            .then((response) => response.json())
            .then((data) => {
                setSplits(data); // Set the splits with the data from the server
                setLoading(false); // Stop loading once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching splits:', error);
                setLoading(false); // Stop loading even if there's an error
            });
    };

    // Use `useFocusEffect` to re-fetch splits when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchSplits(); // Fetch splits when screen is focused
        }, [])
    );

    const navigateToAddSplit = () => {
        navigation.navigate('AddSplitScreen');
    };

    const navigateToExerciseSplit = (split) => {
        navigation.navigate('ExerciseSplitScreen', {
            splitId: split.splitId,
            splitName: split.split_name,  // Use split_name from the backend
            exercises: split.exercises    // Pass exercises for that split
        });
    };

    // Show loading spinner while fetching splits
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#54d7ff" />
                <Text style={styles.loadingText}>Loading splits...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Exercise Splits</Text>

            {/* Add New List Button */}
            <TouchableOpacity style={styles.addButton} onPress={navigateToAddSplit}>
                <Ionicons name="add-circle-outline" size={24} color="#54d7ff" />
                <Text style={styles.addButtonText}>New Split...</Text>
            </TouchableOpacity>

            {/* List of Existing Splits */}
            <FlatList
                data={splits}
                keyExtractor={(item) => item._id}  // Use _id from MongoDB as the key
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.splitItem} onPress={() => navigateToExerciseSplit(item)}>
                        <Ionicons name="barbell-outline" size={24} color="#54d7ff" />
                        <Text style={styles.splitItemText}>
                            {item.split_name ? item.split_name : 'Unnamed Split'}
                        </Text>
                        <Text style={styles.splitItemCount}>
                            {item.exercises ? item.exercises.length.toString() : '0'}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#54d7ff',
        marginBottom: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#1c1c1c',
        borderRadius: 10,
    },
    addButtonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#54d7ff',
    },
    splitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1c1c1c',
        borderRadius: 10,
        marginBottom: 10,
    },
    splitItemText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: '400',
    },
    splitItemCount: {
        fontSize: 16,
        color: '#aaa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#54d7ff',
    },
});
