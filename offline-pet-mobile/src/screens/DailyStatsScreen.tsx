import React from 'react';
import { Text } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppSelector } from '../hooks/useAppSelector';

export function DailyStatsScreen(): React.JSX.Element {
  const stats = useAppSelector((s) => s.stats);

  return (
    <ScreenFrame title="Daily Stats" subtitle="Only clean focus minutes are offline progress">
      <Text>Offline minutes: {stats.offlineMinutesToday}</Text>
      <Text>Online minutes (violations): {stats.onlineMinutesToday}</Text>
      <Text>Quest 60m: {stats.offlineMinutesToday >= 60 ? 'Completed' : 'In progress'}</Text>
      <Text>Quest 120m: {stats.offlineMinutesToday >= 120 ? 'Completed' : 'In progress'}</Text>
      <Text>Quest 240m: {stats.offlineMinutesToday >= 240 ? 'Completed' : 'In progress'}</Text>
    </ScreenFrame>
  );
}
