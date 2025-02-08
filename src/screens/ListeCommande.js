import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const ListeCommande = ({ setCommande }) => {
  const [newCommande, setNewCommande] = useState(''); // Exemple d'état pour une nouvelle commande

  const ajouterCommande = () => {
    // Ajouter la commande
    setCommande(prevCommande => [...prevCommande, newCommande]); // Utilisation de setCommande
    setNewCommande(''); // Réinitialiser l'entrée
  };

  return (
    <View>
      <Text>Liste des Commandes</Text>
      <Button title="Ajouter une commande" onPress={ajouterCommande} />
    </View>
  );
};

export default ListeCommande;
