import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Host App</Text>
            <Button title="Open Mini App 1" onPress={() => navigation.navigate('MiniApp1')} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})