import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Formulaire from '../components/Formulaire';
import Bouton from '../components/Bouton';
import couleurs from '../couleurs/Couleurs';
import { postData } from '../utils/api';
import Entete from '../components/Entete';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    
    const data = {
      email,
      mdp: password,
    };
    
    try {
      const apiData = await postData("users/login", data);
      
      if (apiData.error) {
        console.log("Erreur :", apiData.error);
      } else {
        console.log("Succès :", apiData.message);
        setCurrentPage('ListePlats');
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Entete setCurrentPage={setCurrentPage} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Connexion</Text>

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

        <TouchableOpacity onPress={() => setCurrentPage('Signin')}>
          <Text style={styles.signupLink}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleurs.primaire[0],
    marginTop: 100,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: couleurs.primaire[3],
  },
  signupLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: couleurs.primaire[3],
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default Login;
