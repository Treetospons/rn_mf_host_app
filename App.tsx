/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';

// @ts-ignore
const MiniApp1 = React.lazy(() => import('mini_app1/App'));

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{ marginTop: 55 }}>Host App</Text>
      <React.Suspense fallback={<View><Text>Loading Mini App...</Text></View>}>
        <MiniApp1 />
      </React.Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
