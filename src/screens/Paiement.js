import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bouton from '../components/Bouton'; // Assurez-vous que le chemin est correct

const Paiement = ({ commande }) => {
  // Calculer le total de la commande
  const total = commande.reduce((acc, { plat, quantite }) => acc + plat.prix * quantite, 0);

  const handlePayer = () => {
    // Logique pour gérer le paiement (par exemple, afficher une alerte ou naviguer vers une autre page)
    alert("Paiement effectué avec succès !");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Récapitulatif de la commande</Text>
      {commande.map(({ plat, quantite }) => (
        <View key={plat.id} style={styles.itemContainer}>
          <Text>{plat.nom} x {quantite}</Text>
          <Text>{plat.prix}€</Text>
        </View>
      ))}
      <Text style={styles.total}>Total : {total}€</Text>

      <Bouton title="Payer" onPress={handlePayer} />
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
  itemContainer: {
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Paiement;
