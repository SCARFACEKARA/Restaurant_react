import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Login from './src/screens/Login';
import Signin from './src/screens/Signin';
import ListePlats from './src/screens/ListePlats';
import FaireCommande from './src/screens/FaireCommande';
import Paiement from './src/screens/Paiement';
import couleurs from './src/couleurs/Couleurs';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nudica: require('./src/assets/font/nudica-medium.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={couleurs.primaire[1]} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: couleurs.primaire[0] },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Nudica', fontSize: 20 },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="ListePlats" component={ListePlats} />
        <Stack.Screen name="FaireCommande" component={FaireCommande} />
        <Stack.Screen name="Paiement" component={Paiement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: couleurs.primaire[0],
  },
});

git config --global user.email "randriamasinoroony@gmail.com"
git config --global user.name "OnyRandriamasinoro"