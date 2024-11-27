import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import HistoryContent from '@/components/history/HistoryContent';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

const HistorySpesifik = () => {
  const { id, name } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Header title={`Riwayat Menabung ${(name as string).split(' ')[0]}`} />
      <View style={{ flex: 1, marginTop: 23, paddingHorizontal: 24 }}>
        <HistoryContent id={Number(id)} />
      </View>
    </View>
  );
};

export default HistorySpesifik;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4CA9DF',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
    height: 'auto',
    width: '100%',
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
