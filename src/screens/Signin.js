import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native'; // Ajout de TouchableOpacity
import Formulaire from '../components/Formulaire';
import Bouton from '../components/Bouton';
import Entete from '../components/Entete';
import couleurs from '../couleurs/Couleurs';

const Signin = ({ setCurrentPage }) => { // Ajout de setCurrentPage en tant que prop
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Password:', password);
    setCurrentPage('ListePlats'); // Redirection vers ListePlats après l'inscription
  };

  return (
    <SafeAreaView style={styles.container}>
      <Entete title="S'inscrire" />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Connexion</Text>

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
  },
  formContainer: {
    flex: 1,
    paddingTop: 120, // Compense la hauteur de l'entête
    paddingHorizontal: 20,
    justifyContent: 'center',
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
    textDecorationLine: 'underline', // Style de lien
  },
});

export default Signin;
