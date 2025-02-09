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
    height: 1, // Hauteur de l'entête
    width: '100%', // Largeur de l'écran
    // flexDirection: 'row', // Disposition horizontale
    justifyContent: 'center', // Centre les éléments horizontalement
    alignItems: 'center', // Centre les éléments verticalement
    // paddingTop: 10, // Pour compenser l'espace de la barre de statut
    position: 'absolute', // Fixé en haut de la page
    top: 100,
    zIndex: 10,
  },
  logo: {
    width: 400, // Ajuste la taille du logo selon tes besoins
    height: 400,
    resizeMode: 'contain',
  },
  // backButton: {
  //   position: 'absolute',
  //   left: 10,
  //   top: 20, // Ajuste l'espacement pour le bouton "retour"
  // },
});

export default Entete;
