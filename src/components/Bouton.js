import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Bouton = ({ onPress, title = "Cliquez ici", variant = "primary" }) => {
  const buttonStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
  };

  return (
    <Animatable.View animation="pulse" iterationCount="infinite">
      <TouchableOpacity
        style={[styles.button, buttonStyles[variant]]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  primary: {
    backgroundColor: '#6B21A8',
  },
  secondary: {
    backgroundColor: '#D1D5DB',
  },
  danger: {
    backgroundColor: '#EF4444',
  },
});

export default Bouton;
