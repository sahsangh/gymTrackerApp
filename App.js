import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddSplitScreen from './screens/AddSplitScreen';
import ExerciseSplitScreen from './screens/ExerciseSplitScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import AddExerciseScreen from './screens/AddExerciseScreen'; // Import the new screen
import CustomHeader from './components/CustomHeader';
import { Provider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddSplitScreen"
            component={AddSplitScreen}
            options={{
              title: 'Add New Split',
              headerStyle: { backgroundColor: '#000' },
              headerTintColor: '#54d7ff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="ExerciseSplitScreen"
            component={ExerciseSplitScreen}
            options={({ navigation, route }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title={route.params.splitName}
                  menuOptions={[
                    { title: 'Edit', onPress: () => alert('Edit clicked') },
                    { title: 'Delete', onPress: () => alert('Delete clicked') },
                    { title: 'Settings', onPress: () => alert('Settings clicked'), divider: true },
                  ]}
                />
              ),
              headerStyle: { backgroundColor: '#000' },
            })}
          />
          <Stack.Screen
            name="AddExerciseScreen" // New screen for adding exercises
            component={AddExerciseScreen}
            options={{
              title: 'Add New Exercise',
              headerStyle: { backgroundColor: '#000' },
              headerTintColor: '#54d7ff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="WorkoutScreen"
            component={WorkoutScreen}
            options={({ navigation, route }) => ({
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title={route.params.workoutName}
                  backButtonText={route.params.splitName} // Display the split name next to the back button
                  menuOptions={[
                    { title: 'Edit', onPress: () => alert('Edit clicked') },
                    { title: 'Delete', onPress: () => alert('Delete clicked') },
                    { title: 'Settings', onPress: () => alert('Settings clicked'), divider: true },
                  ]}
                />
              ),
              headerStyle: { backgroundColor: '#000' },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
