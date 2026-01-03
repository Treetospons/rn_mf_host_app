import React, { lazy, Suspense } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/home'

const Stack = createNativeStackNavigator<RootStackParamList>()

const MiniApp1HomeScreen = lazy(async () => await import('mini_app1/MiniApp1Home'))
const MiniApp1CameraScreen = lazy(async () => await import('mini_app1/MiniApp1Camera'))

const Navigation = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MiniApp1" component={MiniApp1HomeScreen} />
                <Stack.Screen name="Camera" component={MiniApp1CameraScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation