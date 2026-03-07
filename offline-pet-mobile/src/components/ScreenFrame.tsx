import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function ScreenFrame({ title, subtitle, children }: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.fog
  },
  hero: {
    backgroundColor: colors.sky,
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900'
  },
  subtitle: {
    marginTop: 8,
    color: '#E8EEFF',
    fontSize: 15
  },
  content: {
    flex: 1,
    padding: 16
  }
});
