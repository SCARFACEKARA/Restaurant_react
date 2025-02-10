import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Formulaire from '../components/Formulaire';
import Bouton from '../components/Bouton';
import Entete from '../components/Entete';
import couleurs from '../couleurs/Couleurs';

const Signin = ({ setCurrentPage }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Password:', password);
    setCurrentPage('ListePlats'); // Redirection après l'inscription
  };

  return (
    <SafeAreaView style={styles.container}>
      <Entete setCurrentPage={setCurrentPage} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Connexion</Text>

        <Formulaire placeholder="Nom" value={nom} onChangeText={setNom} />
        <Formulaire placeholder="Email" value={email} onChangeText={setEmail} />
        <Formulaire placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />

        <Bouton onPress={handleSignin} title="S'inscrire" variant="primary" />

        <TouchableOpacity onPress={() => setCurrentPage('Login')}>
          <Text style={styles.loginLink}>Déjà un compte ? Se connecter</Text>
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
    marginTop: 50, // Ajusté pour un meilleur affichage
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: couleurs.primaire[3],
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: couleurs.primaire[3],
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default Signin;
