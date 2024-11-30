import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import HistoryHead from './HistoryHead';
import HistoryCard from './HistoryCard';
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native-gesture-handler';
import { LogSiswa } from '@/type/siswaType';
import { useDatePicker } from '@/store';
import { getMenabungLog } from '@/libs/query';

const HistoryContent = ({ id }: { id?: number }) => {
  const [data, setData] = useState<LogSiswa[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const historyDate = useDatePicker((state: any) => state.historyDate);

  useEffect(() => {
    getMenabungLog(historyDate, setData, setRefreshing, id);
  }, [historyDate]);

  return (
    <View style={{ width: '100%', gap: 23 }}>
      <HistoryHead />

      <FlatList
        data={data}
        contentContainerStyle={{ gap: 16, width: '100%' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <HistoryCard logSiswa={item} index={index} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              getMenabungLog(historyDate, setData, setRefreshing)
            }
          />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>
            Belum ada riwayat menabung
          </Text>
        }
      />
    </View>
  );
};

export default HistoryContent;
