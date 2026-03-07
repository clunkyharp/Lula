import React from 'react';
import { Text } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppSelector } from '../hooks/useAppSelector';

export function PetStatusScreen(): React.JSX.Element {
  const pet = useAppSelector((s) => s.pet);
  return (
    <ScreenFrame title="Pet Status" subtitle={`${pet.stage.toUpperCase()} / ${pet.emotion.toUpperCase()}`}>
      <Text>Health: {pet.health}</Text>
      <Text>Happiness: {pet.happiness}</Text>
      <Text>Energy: {pet.energy}</Text>
      <Text>Hunger: {pet.hunger}</Text>
      <Text>XP: {pet.xp}</Text>
      <Text>Level: {pet.level}</Text>
      <Text>{pet.alive ? 'Alive' : 'Dead (permanent)'}</Text>
    </ScreenFrame>
  );
}
