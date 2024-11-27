import { View, Text } from 'react-native';
import React from 'react';
import DateModal from './DateModal';

const HistoryHead = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Riwayat Menabung</Text>
      <DateModal />
    </View>
  );
};

export default HistoryHead;
