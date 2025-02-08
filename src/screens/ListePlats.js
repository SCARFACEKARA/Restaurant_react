import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartePlat from '../components/CartePlat';
import Bouton from '../components/Bouton';  // Bouton avec variante
import { getData } from '../utils/api';
import couleurs from '../couleurs/Couleurs';

const ListePlat = ({ setCommande, setCurrentPage }) => {
  const [plats, setPlats] = useState([]);
  const [quantites, setQuantites] = useState({});

  const loadPlats = async () => {
    try {
      const apiData = await getData("admin/plats/all-detailed");
      setPlats(apiData);
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
    }
  };

  useEffect(() => {
    loadPlats();
  }, []);

  const handleChangerQuantite = (id, operation) => {
    setQuantites((prevQuantites) => {
      const nouvelleQuantite = Math.max((prevQuantites[id] || 0) + operation, 0);
      return { ...prevQuantites, [id]: nouvelleQuantite };
    });
  };

  const handleValiderCommande = () => {
    const commandeDetails = plats
      .filter((plat) => quantites[plat.id] > 0)
      .map((plat) => ({
        plat,
        quantite: quantites[plat.id],
      }));

    if (commandeDetails.length === 0) {
      alert('Veuillez sélectionner au moins un plat.');
      return;
    }

    setCommande(commandeDetails);
    setCurrentPage('Paiement');
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
      <Text style={styles.title}>Liste des plats</Text>
      <FlatList
        data={plats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Bouton title="Acheter" onPress={handleValiderCommande} variant="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 30,
    backgroundColor: couleurs.primaire[5],
    borderRadius: 20,
    padding: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
});

export default ListePlat;
