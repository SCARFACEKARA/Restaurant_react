import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartePlat from '../components/CartePlat';
import Bouton from '../components/Bouton';
import { getData, postData } from '../utils/api';
import couleurs from '../couleurs/Couleurs';
import Entete from '../components/Entete';

const ListePlat = ({ setCommande, setCurrentPage }) => {
  const [plats, setPlats] = useState([]);
  const [quantites, setQuantites] = useState({});

  useEffect(() => {
    const loadPlats = async () => {
      try {
        const apiData = await getData("admin/plats/all-detailed");
        setPlats(apiData);
      } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
      }
    };

    loadPlats();
  }, []);

  const handleChangerQuantite = (id, operation) => {
    setQuantites((prevQuantites) => {
      const nouvelleQuantite = Math.max((prevQuantites[id] || 0) + operation, 0);
      return { ...prevQuantites, [id]: nouvelleQuantite };
    });
  };

  async function commander() {
    try {
      const payload = {
        montantTotal: 780, // TODO: Calculer dynamiquement le montant total
        status: "en cours",
        idClient: "1",
      };
      const apiData = await postData("admin/commandes/create", payload);
      return apiData.id;
    } catch (error) {
      console.error("Erreur lors de la création de la commande :", error);
      return null;
    }
  }

  async function detailCommander(details) {
    try {
      await postData("admin/detail-commandes/create", details);
      console.log("Détails de la commande envoyés !");
    } catch (error) {
      console.error("Erreur lors de l'envoi des détails de la commande :", error);
    }
  }

  const handleValiderCommande = async () => {
    const commandeDetails = plats
      .filter((plat) => quantites[plat.id] > 0)
      .map((plat) => ({
        idPlat: plat.id,
        quantite: quantites[plat.id],
        status: "en cours",
      }));

    if (commandeDetails.length === 0) {
      alert("Veuillez sélectionner au moins un plat.");
      return;
    }

    const idCommande = await commander();
    if (!idCommande) return;

    const detailsCommandes = commandeDetails.map((detail) => ({
      idCommande,
      idPlat: detail.idPlat,
      quantite: detail.quantite,
      status: "en cours",
    }));

    await detailCommander(detailsCommandes);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <CartePlat plat={item} />
      <View style={styles.quantityContainer}>
        <Bouton title="-" variant="secondary" onPress={() => handleChangerQuantite(item.id, -1)} />
        <Text style={styles.quantityText}>{quantites[item.id] || 0}</Text>
        <Bouton title="+" variant="primary" onPress={() => handleChangerQuantite(item.id, 1)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.enteteContainer}>
        <Entete setCurrentPage={setCurrentPage} />
      </View>
      <Text style={styles.title}>Liste des plats</Text>
      <FlatList
        data={plats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.buttonContainer}>
        <Bouton title="Acheter" onPress={handleValiderCommande} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  enteteContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: couleurs.primaire[3],
  },
  cardContainer: {
    marginBottom: 20,
    backgroundColor: couleurs.primaire[1],
    borderRadius: 10,
    padding: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  flatListContainer: {
    paddingBottom: 100,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default ListePlat;
