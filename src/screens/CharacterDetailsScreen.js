import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

export default function CharacterDetailScreen({ route }) {
  const { id } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://rickandmortyapi.com/api/character';

  useEffect(() => {
    async function fetchCharacterById() {
      try {
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) throw new Error('Error cargando detalle del personaje');
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacterById();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={{ color: 'red' }}>{error.message}</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image source={{ uri: character.image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      <Text style={{ fontSize: 24, marginVertical: 8 }}>{character.name}</Text>
      <Text>Estado: {character.status}</Text>
      <Text>Especie: {character.species}</Text>
      <Text>Género: {character.gender}</Text>
      <Text>Origen: {character.origin.name}</Text>
      <Text>Localización: {character.location.name}</Text>
    </View>
  );
}
