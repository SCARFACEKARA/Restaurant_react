import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable'; // Importer react-native-animatable pour les animations
import couleurs from '../couleurs/Couleurs';

export default function Menu({ setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour basculer le menu

  const menuItems = [
    { label: 'Login', page: 'Login' },
    { label: 'Signin', page: 'Signin' },
    { label: 'Liste des Plats', page: 'ListePlats' },
    { label: 'Liste des Commandes', page: 'ListeCommande' },
  ];

  return (
    <View style={styles.menuContainer}>
      {/* Animation sur l'icône */}
      <TouchableOpacity
        onPress={() => setIsMenuOpen(!isMenuOpen)}
        style={styles.hamburgerIcon}
      >
        <Animatable.View 
          animation={isMenuOpen ? 'rotate' : 'rotate'}
          duration={300}
          iterationCount={1}
        >
          <Icon name={isMenuOpen ? "close" : "menu"} size={30} color={couleurs.primaire[2]} />
        </Animatable.View>
      </TouchableOpacity>

      {/* Menu déroulant avec animation et fond */}
      {isMenuOpen && (
        <Animatable.View 
          animation="slideInUp"
          duration={300}
          style={styles.dropdownMenu}
        >
          {/* Overlay semi-transparent pour le fond */}
          <TouchableOpacity 
            style={styles.overlay}
            onPress={() => setIsMenuOpen(false)} 
          />

          {/* Liste des éléments du menu */}
          <View style={styles.menuItemsContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.page}
                onPress={() => {
                  setCurrentPage(item.page);
                  setIsMenuOpen(false); // Fermer le menu après la sélection
                }}
                style={styles.menuItem}
              >
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  hamburgerIcon: {
    padding: 10,
    borderRadius: 25,
    margin: 'auto',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: couleurs.primaire[1],
    zIndex: 5,
  },
  menuItemsContainer: {
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: couleurs.primaire[2],
  },
  menuText: {
    color: couleurs.primaire[4],
    fontSize: 16,
    fontWeight: 'bold',
  },
});
