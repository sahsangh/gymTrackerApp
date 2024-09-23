import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddExerciseScreen({ navigation, route }) {
    const { splitId } = route.params;
    console.log('Route params:', route.params);
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch exercise data from the backend when the component loads
    useEffect(() => {
        fetch('http://localhost:3000/exercises') // Use your backend URL if deployed (replace localhost for real devices)
            .then((response) => response.json())
            .then((data) => {
                setExercises(data); // Store all exercises
                setFilteredExercises(data); // Initially, show all exercises
                setLoading(false); // Stop loading once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Stop loading even if there is an error
            });
    }, []);

    // Function to handle search filtering
    const handleSearch = (text) => {
        setSearchText(text);

        if (text === '') {
            setFilteredExercises(exercises); // Show all exercises if search text is empty
        } else {
            const filtered = exercises.filter((exercise) =>
                exercise.exercise_name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredExercises(filtered);
        }
    };

    // Function to handle exercise selection
    const selectExercise = (exercise) => {
        fetch(`http://localhost:3000/splits/${splitId}/add-exercise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                exerciseId: exercise.id,  // Use exercise.id (as per your MongoDB structure)
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Added exercise:', data);
                alert(`Added ${exercise.exercise_name} to the split!`);  // Use exercise.exercise_name for name
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error adding exercise to split:', error);
            });
    };

    // Render each exercise item
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.exerciseItem} onPress={() => selectExercise(item)}>
            <Ionicons name="add-circle-outline" size={20} color="#54d7ff" />
            <Text style={styles.exerciseText}>{item.exercise_name}</Text>
        </TouchableOpacity>
    );

    // Show a loading spinner while data is being fetched
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#54d7ff" />
                <Text style={styles.loadingText}>Loading exercises...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add to Split</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* Search bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search or enter exercise name"
                placeholderTextColor="#AFAFAF"
                value={searchText}
                onChangeText={handleSearch}
            />

            {/* FlatList to display exercises */}
            <FlatList
                data={filteredExercises}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Use item.id if available, fallback to random key
                renderItem={renderItem}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        color: '#fff',
    },
    doneText: {
        fontSize: 16,
        color: '#54d7ff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 20,
        backgroundColor: '#1c1c1c',
    },
    exerciseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1c1c1c',
        borderBottomWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    exerciseText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
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
