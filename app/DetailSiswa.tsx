import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { siswa, tabungan } from '@/db/schema';
import { eq } from 'drizzle-orm';
import db from '@/constants/dbConn';
import { siswaDetail } from '@/type/siswaType';
import SetorDialog from '@/components/SetorDialog';
import TarikDialog from '@/components/TarikDialog';
const DetailSiswa = () => {
  const { id, name } = useLocalSearchParams();
  const [dataSiswa, setDataSiswa] = useState<siswaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSetor, setVisibleSetor] = useState<boolean>(false);
  const [visibleTarik, setVisibleTarik] = useState<boolean>(false);

  const getData = async () => {
    const data = await db
      .select({
        id: siswa.id,
        name: siswa.name,
        nisn: siswa.nisn,
        class: siswa.class,
        amount: tabungan.amount,
      })
      .from(siswa)
      .innerJoin(tabungan, eq(siswa.id, tabungan.siswaId))
      .where(eq(siswa.id, Number(id)));

    setDataSiswa(data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 50, gap: 20 }}>
      <View>
        <Text>Nama : {dataSiswa?.name}</Text>
        <Text>NISN : {dataSiswa?.nisn}</Text>
      </View>
      <View>
        <Text>Tabungan : </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 50 }}>
          {dataSiswa?.amount.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
        <Pressable
          style={({ pressed }) =>
            pressed ? styles.buttonContainerPressed : styles.buttonContainer
          }
          onPress={() => setVisibleSetor(true)}
        >
          <Text style={styles.buttonText}>SETOR</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed ? styles.buttonContainerPressed : styles.buttonContainer
          }
          onPress={() => setVisibleTarik(true)}
        >
          <Text style={styles.buttonText}>TARIK</Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) =>
          pressed ? styles.buttonContainerPressed : styles.buttonContainer
        }
      >
        <Text style={styles.buttonText}>Riwayat Menabung</Text>
      </Pressable>
      <SetorDialog visible={visibleSetor} setVisible={setVisibleSetor} />
      <TarikDialog visible={visibleTarik} setVisible={setVisibleTarik} />
    </View>
  );
};

export default DetailSiswa;

const styles = StyleSheet.create({
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 3,
    padding: 10,
    minHeight: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerPressed: {
    flex: 1,
    borderRadius: 3,
    minHeight: 40,
    backgroundColor: '#1976D2',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
