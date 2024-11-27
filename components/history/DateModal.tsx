import { useDatePicker } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default () => {
  const [open, setOpen] = useState(false);
  const historyDate = useDatePicker((state: any) => state.historyDate);
  const setHistoryDate = useDatePicker((state: any) => state.setHistoryDate);

  useEffect(() => {
    console.log(historyDate);
  }, [historyDate]);

  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
      {historyDate && (
        <Pressable
          onPress={() => setHistoryDate(null)}
          style={{ padding: 10, borderRadius: 20, borderWidth: 0.5 }}
        >
          <Text>Hapus Tanggal</Text>
        </Pressable>
      )}
      <LinearGradient
        colors={['#4CA9DF', 'rgba(41, 46, 145, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ padding: 10, borderRadius: 20 }}
      >
        <Pressable onPress={() => setOpen(true)}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              width: '100%',
              color: 'white',
            }}
          >
            {historyDate
              ? historyDate.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Pilih Tanggal'}
          </Text>
        </Pressable>
      </LinearGradient>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        maximumDate={new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setHistoryDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};
