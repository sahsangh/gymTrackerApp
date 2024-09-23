import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomHeader({ navigation, title, menuOptions }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={18} color="#54d7ff" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={openMenu}>
                            <Ionicons name="ellipsis-horizontal" size={18} color="#54d7ff" />
                        </TouchableOpacity>
                    }
                >
                    {menuOptions.map((option, index) => (
                        <React.Fragment key={index}>
                            <Menu.Item onPress={option.onPress} title={option.title} />
                            {option.divider && <Divider />}
                        </React.Fragment>
                    ))}
                </Menu>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#000', // Match this to the background color of the header
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#000', // Header background color
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#54d7ff',
        flex: 1,
        textAlign: 'center',
    },
});