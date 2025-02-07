import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import CartePlat from '../components/CartePlat';
import { getData } from '../utils/api';

const ListePlats = () => {
  const [plats, setPlats] = useState([]);

  // Fonction pour récupérer les plats
  const loadPlats = async () => {
    try {
      const apiData = await getData("admin/plats/all-detailed");
      console.log(apiData);
      const newPlat = [
        {
          id: '1',
          nom: 'Pizza Margherita',
          description: 'Une pizza simple avec tomates, mozzarella et basilic.',
          image: 'https://example.com/pizza-margherita.jpg',
        },
        {
          id: '2',
          nom: 'Burger Végétalien',
          description: 'Burger avec galette végétalienne, laitue, tomate et sauce.',
          image: 'https://example.com/burger-vegetalien.jpg',
        },
        {
          id: '3',
          nom: 'Salade César',
          description: 'Salade avec poulet grillé, croûtons, et sauce césar.',
          image: 'https://example.com/salade-cesar.jpg',
        },
      ];
      setPlats(apiData);
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
    }
  };

  // Chargement des plats au montage du composant
  useEffect(() => {
    loadPlats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des plats</Text>
      <FlatList
        data={plats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartePlat plat={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ListePlats;
