import React from 'react';
import { Text } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';

export function SettingsScreen(): React.JSX.Element {
  return (
    <ScreenFrame title="Settings" subtitle="Soft enforcement on iOS, strict detection on Android">
      <Text>Notification reminders: enabled</Text>
      <Text>Blocked app categories: social, video, browser</Text>
      <Text>Account: linked Apple/Google</Text>
    </ScreenFrame>
  );
}
