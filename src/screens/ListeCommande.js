import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getData } from '../utils/api';

const ListeCommande = () => {
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);

  // Charger les commandes au montage du composant
  useEffect(() => {
    const loadPlats = async () => {
      try {
        const apiData = await getData("admin/commandes/all");
        setCommandes(apiData);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    loadPlats();
  }, []);

  // Fonction pour afficher/cacher les détails d'une commande
  const toggleDetails = (id) => {
    setCommandeSelectionnee((prevId) => (prevId === id ? null : id));
  };

  // Rendu d'une commande
  const renderCommande = ({ item }) => (
    <View style={styles.commandeContainer}>
      <TouchableOpacity onPress={() => toggleDetails(item.id)}>
        <Text style={styles.commandeTitle}>Commande #{item.id}</Text>
        <Text>Client ID: {item.client.id}</Text>
        <Text>Email: {item.client.email}</Text>
        <Text>Date : {item.dateCommande}</Text>
        <Text>Montant total : {item.montantTotal.toFixed(2)} €</Text>
        <Text>Status : {item.status}</Text>
      </TouchableOpacity>
      {commandeSelectionnee === item.id && item.details && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Détails de la commande :</Text>
          {item.details.map((detail) => (
            <View key={detail.id} style={styles.detailItem}>
              <Text>Plat : {detail.plat.nomPlat}</Text>
              <Text>Quantité : {detail.quantite}</Text>
              <Text>Prix : {parseFloat(detail.plat.prixUnitaire).toFixed(2)} €</Text>
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
