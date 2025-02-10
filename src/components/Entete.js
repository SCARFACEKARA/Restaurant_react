import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import couleurs from '../couleurs/Couleurs';

const Entete = ({ onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={couleurs.secondaire[0]} />
        </TouchableOpacity>
      )}
      <Image 
        source={require('../assets/image/1x/Logo2.png')} 
        style={styles.logo} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, // Hauteur cohérente de l'entête
    width: '100%', // Largeur de l'écran
    flexDirection: 'row', // Disposition horizontale
    justifyContent: 'center', // Centre les éléments horizontalement
    alignItems: 'center', // Centre les éléments verticalement
    paddingTop: 20, // Pour compenser l'espace de la barre de statut
    position: 'absolute', // Fixé en haut de la page
    top: 0,
    zIndex: 10,
  },
  logo: {
    width: 200, // Ajuste la taille du logo
    height: 200,
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 20, // Ajuste l'espacement pour le bouton "retour"
  },
});

export default Entete;
