import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Formulaire from '../components/Formulaire';
import Bouton from '../components/Bouton';
import Entete from '../components/Entete';
import couleurs from '../couleurs/Couleurs';
import { postData } from '../utils/api';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    data = {
      "email":email,
      "mdp":password
    };
    const apiData = await postData("users/login", data);

    if (apiData.error) {
      console.log("Erreur :", apiData.error);
    } else {
      console.log("Succès :", apiData.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Entete/>

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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: couleurs.primaire[0],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: couleurs.secondaire[1],
  },
});

export default Login;
