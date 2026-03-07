import React from 'react';
import { Button } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { healPet } from '../store/slices/petSlice';

export function HealPetScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ScreenFrame title="Heal" subtitle="Pill +30 health">
      <Button title="Use Medicine" onPress={() => dispatch(healPet())} />
    </ScreenFrame>
  );
}
