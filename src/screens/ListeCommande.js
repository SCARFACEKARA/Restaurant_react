import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ListeCommande = () => {
  const [commandes] = useState([
    {
      id: 1,
      idClient: 2,
      dateCommande: '2025-02-07',
      montantTotal: 35.50,
      status: 'en cours',
      details: [
        { idPlat: 1, nomPlat: 'Pizza Margherita', quantite: 2, prix: 12 },
        { idPlat: 2, nomPlat: 'Salade César', quantite: 1, prix: 8 },
      ],
    },
    {
      id: 2,
      idClient: 3,
      dateCommande: '2025-02-06',
      montantTotal: 42.00,
      status: 'fini',
      details: [
        { idPlat: 3, nomPlat: 'Burger Vegan', quantite: 3, prix: 10 },
      ],
    },
    {
      id: 3,
      idClient: 4,
      dateCommande: '2025-02-05',
      montantTotal: 25.00,
      status: 'livrer',
      details: [
        { idPlat: 1, nomPlat: 'Pizza Margherita', quantite: 1, prix: 12 },
        { idPlat: 4, nomPlat: 'Soupe aux légumes', quantite: 1, prix: 13 },
      ],
    },
  ]);

  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);

  const toggleDetails = (id) => {
    setCommandeSelectionnee((prevId) => (prevId === id ? null : id));
  };

  const renderCommande = ({ item }) => (
    <View style={styles.commandeContainer}>
      <TouchableOpacity onPress={() => toggleDetails(item.id)}>
        <Text style={styles.commandeTitle}>Commande #{item.id}</Text>
        <Text>Client : {item.idClient}</Text>
        <Text>Date : {item.dateCommande}</Text>
        <Text>Montant total : {item.montantTotal.toFixed(2)} €</Text>
        <Text>Status : {item.status}</Text>
      </TouchableOpacity>
      {commandeSelectionnee === item.id && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Détails de la commande :</Text>
          {item.details.map((detail) => (
            <View key={detail.idPlat} style={styles.detailItem}>
              <Text>Plat : {detail.nomPlat}</Text>
              <Text>Quantité : {detail.quantite}</Text>
              <Text>Prix : {detail.prix.toFixed(2)} €</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des commandes</Text>
      <FlatList
        data={commandes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCommande}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  commandeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  commandeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailItem: {
    marginBottom: 5,
  },
});

export default ListeCommande;
