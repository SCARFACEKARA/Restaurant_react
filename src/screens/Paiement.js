import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import CartePlat from '../components/CartePlat';
import Bouton from '../components/Bouton';

const Paiement = ({ route }) => {
  const { commande } = route.params; // Récupération de la commande via les paramètres de la route

  const calculerTotal = () => {
    return commande.reduce((total, item) => total + item.plat.prix * item.quantite, 0);
  };

  const handlePayer = () => {
    Alert.alert("Paiement", "Votre paiement a été effectué avec succès !");
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <CartePlat plat={item.plat} />
      <Text style={styles.quantityText}>Quantité: {item.quantite}</Text>
      <Text style={styles.priceText}>Prix: ${(item.plat.prix * item.quantite).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé de la commande</Text>
      <FlatList
        data={commande}
        keyExtractor={(item) => item.plat.id}
        renderItem={renderItem}
      />
      <Text style={styles.total}>Total: ${calculerTotal().toFixed(2)}</Text>
      <Bouton title="Payer" onPress={handlePayer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  quantityText: {
    fontSize: 16,
    marginTop: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Paiement;
