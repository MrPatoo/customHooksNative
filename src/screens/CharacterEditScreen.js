import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function EditCharacterScreen({ route, navigation }) {
  const { character } = route.params;
  const [name, setName] = useState(character.name);

  const handleSave = () => {
    // Simulación: mostrar alerta o ir atrás
    alert(`Nombre actualizado a: ${name}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Editar nombre del personaje</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Button title="Guardar cambios" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
});
