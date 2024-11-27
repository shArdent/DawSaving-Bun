import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import HistoryContent from '@/components/history/HistoryContent';


const HistoryPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={styles.header}
        colors={['#4CA9DF', 'rgba(41, 46, 145, 0.93)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>DawSaving</Text>
      </LinearGradient>
      <View style={{ flex: 1, marginTop: 23, paddingHorizontal: 24 }}>
        <HistoryContent />
      </View>
    </View>
  );
};

export default HistoryPage;

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
