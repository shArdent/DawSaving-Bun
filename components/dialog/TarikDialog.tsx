import db from '@/constants/dbConn';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Dialog from 'react-native-dialog';

const SetorDialog = ({
  visible,
  id,
  setVisible,
  currTabungan,
}: {
  visible: boolean;
  id: number;
  setVisible: (status: boolean) => void;
  currTabungan: number;
}) => {
  const [nominal, setNominal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleTarik = async () => {
    if (nominal !== 0 && nominal !== null) {
      setIsLoading(true);

      const total = currTabungan - nominal!;

      if (total < 0) {
        setError('Saldo tidak mencukupi');
        setIsLoading(false);
        return;
      }

      try {
        await db.runAsync('UPDATE tabungan SET amount = ? WHERE siswaId = ?', [
          total,
          id,
        ]);

        setVisible(false);
        router.push('/');
      } catch (error) {
        console.log(error);
        setError('Terjadi kesalahan saat menyetor');
      } finally {
        setIsLoading(false);
      }
    }
    setError('Nominal belum diisi');
    setIsLoading(false);
  };

  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        width: '80%',
        borderRadius: 5,
        gap: 16,
      }}
    >
      <Dialog.Title style={{ color: 'black' }}>
        Masukkan Jumlah Uang Disetor
      </Dialog.Title>
      <Dialog.Description style={{}}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ marginTop: 10 }}>Rp. </Text>
          <Dialog.Input
            style={{
              width: 320,
              color: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
            }}
            placeholder="contoh : 20000"
            underlineColorAndroid={'transparent'}
            keyboardType="number-pad"
            onChangeText={(value) => setNominal(Number(value))}
          />
        </View>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </Dialog.Description>
      <Dialog.Button
        disabled={isLoading}
        label="Batal"
        onPress={() => {
          setVisible(false);
        }}
        style={{
          color: '#3451A3',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      />
      <Dialog.Button
        disabled={isLoading}
        label={isLoading ? 'Loading...' : 'Setor'}
        onPress={() => handleTarik()}
        style={{
          color: 'white',
          backgroundColor: '#3451A3',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      />
    </Dialog.Container>
  );
};

export default SetorDialog;
