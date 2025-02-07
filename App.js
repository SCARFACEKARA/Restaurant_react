import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Login from './src/screens/Login';
import Signin from './src/screens/Signin';
import ListePlats from './src/screens/ListePlats';
import FaireCommande from './src/screens/ListeCommande';
import couleurs from './src/couleurs/Couleurs';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Login'); // Page par défaut
  const [commande, setCommande] = useState(null); // État pour la commande

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <Login />;
      case 'Signin':
        return <Signin />;
      case 'ListePlats':
        return <ListePlats />;
      case 'FaireCommande':
        return <FaireCommande setCommande={setCommande} setCurrentPage={setCurrentPage} />;
      case 'Paiement':
        return <Paiement commande={commande} setCurrentPage={setCurrentPage} />;
      default:
        return <Login />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setCurrentPage('Login')}>
          <Text style={styles.navItem}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage('Signin')}>
          <Text style={styles.navItem}>Signin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage('ListePlats')}>
          <Text style={styles.navItem}>Liste Plats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage('FaireCommande')}>
          <Text style={styles.navItem}>Commande</Text>
        </TouchableOpacity>
      </View>
      {renderPage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleurs.primaire[0],
    paddingTop: 40,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: couleurs.primaire[2],
    paddingVertical: 10,
  },
  navItem: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
