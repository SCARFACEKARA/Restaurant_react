import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { getData } from '../utils/api';
import Entete from '../components/Entete';
import couleurs from '../couleurs/Couleurs';

const ListeCommande = ({ setCurrentPage }) => {
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);

  useEffect(() => {
    const loadCommandes = async () => {
      try {
        const apiData = await getData("admin/commandes/all");
        setCommandes(apiData);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    loadCommandes();
  }, []);

  const toggleDetails = (id) => {
    setCommandeSelectionnee((prevId) => (prevId === id ? null : id));
  };

  const handleValiderCommande = () => {
    console.log("Commande validée !");
  };

  const renderCommande = ({ item }) => (
    <View style={styles.commandeContainer}>
      <TouchableOpacity onPress={() => toggleDetails(item.id)}>
        <Text style={styles.commandeTitle}>Commande N° {item.id}</Text>
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
              <Text>Prix : {parseFloat(detail.plat.prixUnitaire).toFixed(2)} Ariary </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.enteteContainer}>
        <Entete setCurrentPage={setCurrentPage} />
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.title}>Liste des Commandes</Text>
        <FlatList
          data={commandes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommande}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleurs.primaire[0],
  },
  enteteContainer: {
    backgroundColor: couleurs.primaire[1],
    marginBottom: 30,
    zIndex: 10,  // Garantit que l'entête reste au-dessus du contenu
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 5,  // Assure qu'il y ait assez de place pour l'entête
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: couleurs.primaire[3],
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  commandeContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: couleurs.primaire[2],
  },
  commandeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: couleurs.primaire[3],
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
  footerButton: {
    marginTop: 10,
  },
});

export default ListeCommande;
