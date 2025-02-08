import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import couleurs from '../couleurs/Couleurs';

const Entete = ({ title, onBackPress, setCurrentPage }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/image/1x/Logo2.png')} 
        style={styles.logo} 
      />
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={couleurs.secondaire[0]} />
        </TouchableOpacity>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, // Hauteur de l'entête
    width: '100%', // Largeur de l'écran
    backgroundColor: "#F4F3E6",
    flexDirection: 'top',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40, // Compense l'espace pour la barre de statut
    position: 'absolute', // Fixé en haut de la page
    top: 0,
    zIndex: 10,
  },
  logo: {
    width: 500, // Ajuste la taille de l'image pour qu'elle soit plus petite et ne dépasse pas
    height: 500,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Permet au titre de prendre l'espace disponible entre l'image et le bouton
    textAlign: 'center', // Centre le texte entre les autres éléments
  },
  backButton: {
    padding: 10,
  },
});

export default Entete;
