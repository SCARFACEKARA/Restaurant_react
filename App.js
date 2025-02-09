import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Image } from 'react-native';
import Login from './src/screens/Login';
import Signin from './src/screens/Signin';
import ListePlats from './src/screens/ListePlats';
import ListeCommande from './src/screens/ListeCommande';
import couleurs from './src/couleurs/Couleurs';
import Footer from './src/components/Footer'; // Import du Footer

export default function App() {
  const [currentPage, setCurrentPage] = useState('Login');
  const [commande, setCommande] = useState([]); // Initialisez commande avec un tableau vide
  const [showAnimation, setShowAnimation] = useState(true); // État pour afficher l'animation
  const fadeAnim = new Animated.Value(1); // Animation d'opacité
  const translateYAnim = new Animated.Value(0); // Animation de translation

  useEffect(() => {
    // Lancer l'animation au chargement
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000, // 3 secondes
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -150, // Translation plus marquée vers le haut
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowAnimation(false); // Masquer l'animation une fois terminée
    });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'Signin':
        return <Signin setCurrentPage={setCurrentPage} />;
      case 'ListePlats':
        return <ListePlats setCurrentPage={setCurrentPage} />;
      case 'ListeCommande':
        return <ListeCommande setCommande={setCommande} setCurrentPage={setCurrentPage} />;
      default:
        return <Login setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <View style={styles.container}>
      {showAnimation ? (
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
          <Image source={require('./src/assets/image/1x/Logo.png')} style={styles.logo} />
          <Text style={styles.splashText}>Bienvenue</Text>
        </Animated.View>
      ) : (
        <>
          {renderPage()}
          <Footer setCurrentPage={setCurrentPage} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleurs.primaire[0],
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: couleurs.primaire[0],
  },
  logo: {
    width: 500, // Taille plus grande
    height: 500,
    resizeMode: 'contain', // Empêche l'image d'être coupée
    marginBottom: 20,
  },
  splashText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: couleurs.primaire[2],
  },
});
