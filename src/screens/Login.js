import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Formulaire from '../components/Formulaire';
import Bouton from '../components/Bouton';
import couleurs from '../couleurs/Couleurs';
import Entete from '../components/Entete'; // Importation du composant Entete

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Redirige vers la page ListePlat après la connexion
    setCurrentPage('ListePlats');
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
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 100, // Espace pour l'entête
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
    textDecorationLine: 'underline', // Style de lien
  },
});

export default Login;
