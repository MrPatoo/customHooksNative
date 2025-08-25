import React from 'react';
import { View, Text, FlatList, Image, Button, ActivityIndicator } from 'react-native';
import { useCharacters } from '../hooks/useCharacters';

export default function CharacterListScreen({ navigation }) {
  const {
    characters,
    info,
    page,
    loading,
    error,
    loadCharacters,
    setCharacters,
  } = useCharacters();

  const handleDelete = (id) => {
    const updated = characters.filter(character => character.id !== id);
    setCharacters(updated); // Simula eliminación
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: item.image }} style={{ width: 60, height: 60, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.species} — {item.status}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button
                title="Editar"
                color="#4CAF50"
                onPress={() => navigation.navigate('EditCharacter', { character: item })}
              />
              <Button
                title="Eliminar"
                color="#F44336"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
        onEndReached={() => {
          if (info?.next) loadCharacters(page + 1);
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
