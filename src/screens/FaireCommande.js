import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartePlat from '../components/CartePlat';
import Bouton from '../components/Bouton';
import { useNavigation } from '@react-navigation/native';

const FaireCommande = () => {
  const navigation = useNavigation();

  // Exemple de données de plats
  const [plats, setPlats] = useState([
    { id: '1', nom: 'Pizza Margherita', description: 'Tomates, mozzarella, basilic', prix: 12, image: 'https://via.placeholder.com/80' },
    { id: '2', nom: 'Burger Vegan', description: 'Steak de légumes, salade, tomate', prix: 10, image: 'https://via.placeholder.com/80' },
    { id: '3', nom: 'Salade César', description: 'Poulet, parmesan, croûtons', prix: 8, image: 'https://via.placeholder.com/80' },
  ]);

  const [quantites, setQuantites] = useState({});

  const handleChangerQuantite = (id, operation) => {
    setQuantites((prevQuantites) => {
      const nouvelleQuantite = Math.max((prevQuantites[id] || 0) + operation, 0);
      return { ...prevQuantites, [id]: nouvelleQuantite };
    });
  };

  const handleValiderCommande = () => {
    const commande = plats
      .filter((plat) => quantites[plat.id] > 0)
      .map((plat) => ({
        plat,
        quantite: quantites[plat.id],
      }));

    if (commande.length === 0) {
      alert('Veuillez sélectionner au moins un plat.');
      return;
    }

    navigation.navigate('Paiement', { commande });
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
      <Text style={styles.title}>Faire une commande</Text>
      <FlatList
        data={plats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Bouton title="Valider la commande" onPress={handleValiderCommande} />
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
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FaireCommande;
