import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CartePlat = ({ plat }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plat.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{plat.nomPlat.toString()}</Text>
        <Text style={styles.description}>{plat.prixUnitaire.toString()} Ar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});

export default CartePlat;
