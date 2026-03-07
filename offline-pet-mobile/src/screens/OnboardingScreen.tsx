import React from 'react';
import { Button, Text } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';

export function OnboardingScreen({ navigation }: any): React.JSX.Element {
  return (
    <ScreenFrame title="Welcome" subtitle="Grow your pet by staying offline.">
      <Text>Focus sessions give XP and coins only for clean minutes.</Text>
      <Button title="Continue" onPress={() => navigation.replace('Auth')} />
    </ScreenFrame>
  );
}
