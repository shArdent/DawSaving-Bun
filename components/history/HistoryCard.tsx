import { View, Text } from 'react-native';
import Plus from '@/assets/icons/Plus.svg';
import Minus from '@/assets/icons/Minus.svg';
import React from 'react';
import { LogSiswa } from '@/type/siswaType';
import { timestamp } from '@/libs/query';

const HistoryCard = ({
  logSiswa,
  index,
}: {
  logSiswa: LogSiswa;
  index?: number;
}) => {
  return (
    <View
      // key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#686D76',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
        }}
      >
        {logSiswa.addedAmount > 0 ? (
          <Plus width={40} height={40} />
        ) : (
          <Minus width={40} height={40} />
        )}
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
            {logSiswa.name}
          </Text>
          <Text style={{ fontSize: 12, color: '#ADA7A9' }}>
            {logSiswa.addedAmount > 0 ? 'Tambah Saldo' : 'Tarik Saldo'}
          </Text>
        </View>
      </View>
      <View
        style={{
          gap: 10,
          alignItems: 'flex-end',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
          {logSiswa.addedAmount.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </Text>
        <Text>{timestamp(logSiswa.createdAt)}</Text>
      </View>
    </View>
  );
};

export default HistoryCard;
