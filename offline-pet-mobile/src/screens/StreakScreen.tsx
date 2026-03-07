import React from 'react';
import { Text } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppSelector } from '../hooks/useAppSelector';

export function StreakScreen(): React.JSX.Element {
  const stats = useAppSelector((s) => s.stats);

  return (
    <ScreenFrame title="Streak" subtitle="60+ clean minutes keeps streak alive">
      <Text>Current streak: {stats.streak} days</Text>
      <Text>Longest streak: {stats.longestStreak} days</Text>
      <Text>Reward milestones: day 7 rare item, day 30 rare skin</Text>
    </ScreenFrame>
  );
}
