import React from 'react';
import { Button } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { playWithPet } from '../store/slices/petSlice';

export function PlayPetScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ScreenFrame title="Play" subtitle="Ball +15 happiness">
      <Button title="Play" onPress={() => dispatch(playWithPet())} />
    </ScreenFrame>
  );
}
