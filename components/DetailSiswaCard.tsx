import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { siswaDetail } from '@/type/siswaType';
import { useRouter } from 'expo-router';
import DotMenu from '@/assets/icons/DotMenu.svg';
import { LinearGradient } from 'expo-linear-gradient';
import DetailSiswaCardPopMenu from './DetailSiswaCardPopMenu';
import { text } from 'drizzle-orm/mysql-core';

const DetailSiswaCard = ({
  siswa,
  index,
}: {
  siswa: siswaDetail;
  index: number;
}) => {
  const router = useRouter();

  const gradient: string[][] = [
    ['#F8A39B', '#394DB3'],
    ['#394DB3', '#280594'],
    ['#280594', '#F8A39B'],
    ['#F8A39B', '#FFC120'],
    ['#FFC120', '#F8A39B'],
  ];

  return (
    <LinearGradient
      colors={gradient[index % gradient.length] as any}
      style={styles.linear}
      key={index}
    >
      <Pressable
        style={styles.container}
        onPress={() =>
          router.navigate({
            pathname: '/DetailSiswa',
            params: {
              id: siswa.id,
              name: siswa.name,
            },
          })
        }
      >
        <View style={{ gap: 16 }}>
          <Text style={styles.textTitle}>{siswa.name}</Text>
          <Text style={styles.textDesc}>{siswa.class}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.textCurrency}>
            {siswa.amount.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default DetailSiswaCard;

const styles = StyleSheet.create({
  linear: {
    elevation: 3,
    padding: 14,
    height: 130,
    borderRadius: 10,
    zIndex: 1,
    position: 'relative',
  },
  container: {
    gap: 10,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  textTitle: {
    color: 'white',
    fontSize: 14,
  },
  textDesc: {
    color: 'white',
    fontSize: 12,
  },
  textCurrency: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContent: {
    justifyContent: 'center',
    height: 'auto',
  },
});
