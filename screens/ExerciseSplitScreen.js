import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseSplitScreen({ navigation, route }) {
    const { splitId } = route.params;
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch split data first
        fetch(`http://localhost:3000/splits/${splitId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.exercises) {
                    const exerciseIds = data.exercises;
                    console.log(data);
                    console.log(data.exercises);
                    // Fetch exercise details for each ID
                    return Promise.all(exerciseIds.map(id =>
                        fetch(`http://localhost:3000/exercises/${id}`).then(res => res.json())
                    ));
                }
                return [];
            })
            .then((exerciseDetails) => {
                setExercises(exerciseDetails);  // Set the full exercise details
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching exercises:', error);
                setLoading(false);
            });
    }, [splitId]);

    const navigateToWorkout = (exercise) => {
        navigation.navigate('WorkoutScreen', { workoutName: exercise.exercise_name, navigation });
    };

    const navigateToAddExercise = () => {
        navigation.navigate('AddExerciseScreen', { splitId });
    };

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
            <FlatList
                data={exercises}
                keyExtractor={(item) => item._id.toString()} // Use the correct field for exercise ID
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.exerciseItem} onPress={() => navigateToWorkout(item)}>
                        <Text style={styles.exerciseText}>{item.exercise_name}</Text>
                        <Ionicons name="chevron-forward-outline" size={18} color="#fff" />
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={navigateToAddExercise}>
                <Ionicons name="add-circle-outline" size={20} color="#54d7ff" />
                <Text style={styles.addButtonText}>Add New Exercise</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
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
    exerciseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1c1c1c',
        borderBottomWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    exerciseText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1c1c1c',
        borderRadius: 10,
        marginTop: 20,
    },
    addButtonText: {
        fontSize: 16,
        color: '#54d7ff',
        marginLeft: 10,
    },
});
