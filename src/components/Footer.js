import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import couleurs from '../couleurs/Couleurs';

const Footer = ({ setCurrentPage }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => setCurrentPage('ListePlats')} style={styles.iconContainer}>
        <Icon name="restaurant" size={30} color={couleurs.primaire[2]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCurrentPage('ListeCommande')} style={styles.iconContainer}>
        <Icon name="cart" size={30} color={couleurs.primaire[2]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCurrentPage('Login')} style={styles.iconContainer}>
        <Icon name="person" size={30} color={couleurs.primaire[2]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: couleurs.primaire[0],
    borderTopWidth: 1,
    borderTopColor: couleurs.primaire[1],
  },
  iconContainer: {
    padding: 10,
  },
});

export default Footer;
