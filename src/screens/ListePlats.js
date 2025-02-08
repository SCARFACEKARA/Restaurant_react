import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartePlat from '../components/CartePlat';
import Bouton from '../components/Bouton';
import { getData , postData} from '../utils/api';

const ListePlat = ({ setCommande, setCurrentPage }) => {
  const [plats, setPlats] = useState([]);
  const [quantites, setQuantites] = useState({});

  // Fonction pour récupérer les plats
  const loadPlats = async () => {
    try {
      const apiData = await getData("admin/plats/all-detailed");
      setPlats(apiData);
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
    }
  };

  // Chargement des plats au montage du composant
  useEffect(() => {
    loadPlats();
  }, []);

  const handleChangerQuantite = (id, operation) => {
    setQuantites((prevQuantites) => {
      const nouvelleQuantite = Math.max((prevQuantites[id] || 0) + operation, 0);
      return { ...prevQuantites, [id]: nouvelleQuantite };
    });
  };
   
  async function commander(){
    try {
      const payload = {
        "montantTotal":780,
        "status":"en cours",
        "idClient":"1"
      };
      const apiData = await postData("admin/commandes/create",payload);
      return apiData.id;
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
    }
  };

  async function detailCommander(data){
    try {
      const apiData = await postData("admin/detail-commandes/create",data);
      console.log("Detaille commande" + apiData);
      
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
    }
  };

  const handleValiderCommande = async ()  => {
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

    var idCommande = await commander();
    var detailleCommandes = [];
    var status = "en cours";
    for (let index = 0; index < commandeDetails.length; index++) {
      for (let dt = 0; dt < commandeDetails[index].quantite; dt++) {
        var newDet = {
          "idCommande": idCommande,
          "idPlat": commandeDetails[index].plat['id'],
          "status": status          
        }
        detailleCommandes.push(newDet);
      }
    }
    await detailCommander(detailleCommandes);
    setPlats([]);
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
      <Bouton title="Acheter" onPress={handleValiderCommande} />
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
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default ListePlat;