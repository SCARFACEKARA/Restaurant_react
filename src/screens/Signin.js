import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Formulaire from '../components/Formulaire';
import Bouton from '../components/Bouton';
import Entete from '../components/Entete';
import couleurs from '../couleurs/Couleurs';
import { View } from 'react-native-animatable';

const Login = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return(

    <SafeAreaView style={styles.container}>
    <Entete/>
      <Formulaire
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <Formulaire
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Formulaire
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Bouton onPress={handleLogin} title="Se connecter" variant="primary" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: couleurs.primaire[0],
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: couleurs.secondaire[1],
//   },
});

export default Login;
