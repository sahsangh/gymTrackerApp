//Specific exercise page which logs your sets
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function WorkoutScreen({ route }) {
    const { workoutName } = route.params;
    const [sets, setSets] = useState([
        { id: '1', reps: 10, weight: 50, time: '10:00 AM' },
        { id: '2', reps: 8, weight: 55, time: '10:05 AM' }
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const addSet = () => {
        if (reps && weight) {
            const newSet = {
                id: sets.length.toString(),
                reps: parseInt(reps),
                weight: parseInt(weight),
                time: new Date().toLocaleDateString(),  // Changed to store the date
            };
            setSets([...sets, newSet]);
            setReps('');
            setWeight('');
            closeModal();  // Close the modal after adding the set
        }
    };


    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={sets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.setItem}>
                        <Text style={styles.setTime}>{item.time}</Text>
                        <Text style={styles.setReps}>{item.reps} rep</Text>
                        <Text style={styles.setWeight}>{item.weight} lb</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.fab} onPress={openModal}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Record Set</Text>

                        {/* Adding TextInput for Reps */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.modalText}>Reps</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={reps}
                                onChangeText={setReps}
                                placeholder="Enter reps"
                                placeholderTextColor="#AFAFAF"
                            />
                        </View>

                        {/* Adding TextInput for Weight */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.modalText}>Weight (lbs)</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={weight}
                                onChangeText={setWeight}
                                placeholder="Enter weight"
                                placeholderTextColor="#AFAFAF"
                            />
                        </View>

                        <TouchableOpacity style={styles.recordButton} onPress={addSet}>
                            <Text style={styles.recordButtonText}>Record Set</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000', // Dark theme background
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
    setItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#1c1c1c',
    },
    setTime: {
        color: '#fff',
    },
    setReps: {
        color: 'green',
    },
    setWeight: {
        color: 'orange',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#54d7ff',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabText: {
        color: '#fff',
        fontSize: 24,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        width: '70%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    recordButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
    },
    recordButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
