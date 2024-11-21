import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { siswaDetail } from '@/type/siswaType';
import { useRouter } from 'expo-router';
import DotMenu from '@/assets/icons/DotMenu.svg';
import { LinearGradient } from 'expo-linear-gradient';
import DetailSiswaCardPopMenu from './DetailSiswaCardPopMenu';

const DetailSiswaCard = ({ siswa }: { siswa: siswaDetail }) => {
  const router = useRouter();

  // const randomGradient: string[][] = [
  //   ['#00C6FB', '#005BEA'],
  //   ['#00C6FB', 'rgba(255, 112, 140, 0.93)'],
  //   ['#F76174', 'rgba(79, 114, 229, 0.93)'],
  // ];

  return (
    <View
      // colors={
      //   randomGradient[Math.floor(Math.random() * randomGradient.length)] as any
      // }
      style={styles.linear}
    >
      <DetailSiswaCardPopMenu />

      <View
        style={styles.container}
        // onPress={() =>
        //   router.navigate({
        //     pathname: '/DetailSiswa',
        //     params: {
        //       id: siswa.id,
        //       name: siswa.name,
        //     },
        //   })
        // }
      >
        <View style={{ gap: 16 }}>
          <Text style={styles.textTitle}>{siswa.name}</Text>
          <Text style={styles.textDesc}>{siswa.class}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.textDesc}>
            Rp.{' '}
            {siswa.amount.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>
      </View>
    </View>
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
  rightContent: {
    justifyContent: 'flex-end',
    height: '100%',
  },
});
