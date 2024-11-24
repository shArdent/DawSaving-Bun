import db from '@/constants/dbConn';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
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

  const handleSetor = async () => {
    if (nominal !== 0 && nominal !== null) {
      setIsLoading(true);

      const total = currTabungan + nominal!;

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
    } else {
      setError('Nominal belum diisi');
    }
  };

  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        width: '80%',
        borderRadius: 5,
        gap: 0,
      }}
    >
      <Dialog.Title style={{ color: 'black' }}>
        Masukkan Jumlah Uang Disetor
      </Dialog.Title>
      <Dialog.Description
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Rp. </Text>
          <TextInput
            style={{
              width: '90%',
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

        {error && <Text style={{ color: 'red' }}>Nominal belum diisi</Text>}
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
        onPress={() => handleSetor()}
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
