import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import db from '@/constants/dbConn';
import { siswaDetail } from '@/type/siswaType';
import SetorDialog from '@/components/dialog/SetorDialog';
import TarikDialog from '@/components/dialog/TarikDialog';
import Header from '@/components/Header';
import { LinearGradient } from 'expo-linear-gradient';
const DetailSiswa = () => {
  const { id, name } = useLocalSearchParams();
  const [dataSiswa, setDataSiswa] = useState<siswaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSetor, setVisibleSetor] = useState<boolean>(false);
  const [visibleTarik, setVisibleTarik] = useState<boolean>(false);

  const getData = async () => {
    const data = await db.getFirstAsync(
      `SELECT * FROM siswa JOIN tabungan ON siswa.id = tabungan.siswaId WHERE tabungan.siswaId = ${id}`
    );

    setDataSiswa(data as siswaDetail);
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
    <ScrollView>
      <Header
        title={`Detail Siswa ${(name as string).split(' ')[0]}`}
        showMenu={true}
        id={id as unknown as number}
      />

      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingVertical: 43, gap: 31 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.identityText}>Nama :</Text>
            <Text style={styles.identityText}>{dataSiswa?.name}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.identityText}>NISN :</Text>
            <Text style={styles.identityText}>{dataSiswa?.nisn}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.identityText}>Kelas :</Text>
            <Text style={styles.identityText}>{dataSiswa?.class}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 1,
            backgroundColor: 'black',
          }}
        ></View>
        <View style={{ paddingHorizontal: 24, paddingVertical: 43, gap: 20 }}>
          <Text style={styles.identityText}>Jumlah Tabungan : </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 50 }}>
            {dataSiswa?.amount.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 24,
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 9,
              width: '100%',
            }}
          >
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [
                      styles.buttonContainerPressed,
                      { backgroundColor: '#4CA9DF' },
                    ]
                  : [styles.buttonContainer, { backgroundColor: '#4CA9DF' }]
              }
              onPress={() => setVisibleSetor(true)}
            >
              <Text style={styles.buttonText}>SETOR</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [
                      styles.buttonContainerPressed,
                      { backgroundColor: '#292E91' },
                    ]
                  : [styles.buttonContainer, { backgroundColor: '#292E91' }]
              }
              onPress={() => setVisibleTarik(true)}
            >
              <Text style={styles.buttonText}>TARIK</Text>
            </Pressable>
          </View>
          <Pressable style={{ height: 'auto' }} onPress={() => {}}>
            <LinearGradient
              colors={['#4CA9DF', '#292E91']}
              style={styles.buttonContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Riwayat Menabung</Text>
            </LinearGradient>
          </Pressable>
        </View>
        <SetorDialog
          currTabungan={dataSiswa?.amount as number}
          visible={visibleSetor}
          setVisible={setVisibleSetor}
          id={Number(id)}
        />
        <TarikDialog
          visible={visibleTarik}
          setVisible={setVisibleTarik}
          id={Number(id)}
          currTabungan={dataSiswa?.amount as number}
        />
      </View>
    </ScrollView>
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
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 40,
    width: '100%',
  },
  buttonContainerPressed: {
    flex: 1,
    borderRadius: 20,
    minHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  identityText: {
    color: 'black',
    fontSize: 17,
  },
});
