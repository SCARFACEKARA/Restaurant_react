import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import { getData } from '../utils/api';

const ListeCommande = ({ setCommande }) => {
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);
  const [newCommande, setNewCommande] = useState('');

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

  // Fonction pour ajouter une nouvelle commande
  const ajouterCommande = () => {
    if (newCommande.trim() !== '') {
      setCommandes(prevCommandes => [...prevCommandes, { id: commandes.length + 1, nom: newCommande }]);
      setNewCommande('');
    }
  };

  // Fonction pour afficher/cacher les détails d'une commande
  const toggleDetails = (id) => {
    setCommandeSelectionnee((prevId) => (prevId === id ? null : id));
  };

  // Rendu d'une commande
  const renderCommande = ({ item }) => (
    <View style={styles.commandeContainer}>
      <TouchableOpacity onPress={() => toggleDetails(item.id)}>
        <Text style={styles.commandeTitle}>Commande #{item.id}</Text>
        <Text>Client ID: {item.client?.id}</Text>
        <Text>Email: {item.client?.email}</Text>
        <Text>Date : {item.dateCommande}</Text>
        <Text>Montant total : {item.montantTotal?.toFixed(2)} €</Text>
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
      <Text style={styles.title}>Liste des Commandes</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouvelle commande"
        value={newCommande}
        onChangeText={setNewCommande}
      />
      <Button title="Ajouter une commande" onPress={ajouterCommande} />
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  commandeContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  commandeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#f9f9f9',
  },
  detailsTitle: {
    fontWeight: 'bold',
  },
  detailItem: {
    marginVertical: 3,
  },
});

export default ListeCommande;
