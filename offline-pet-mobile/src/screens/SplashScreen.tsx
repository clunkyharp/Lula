import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';

export function SplashScreen({ navigation }: any): React.JSX.Element {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.replace('Onboarding'), 1000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <ScreenFrame title="Offline Pet" subtitle="Less phone usage = happier pet">
      <ActivityIndicator size="large" />
    </ScreenFrame>
  );
}
