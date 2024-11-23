import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Dialog from 'react-native-dialog';
import { setNativeProps } from 'react-native-reanimated';

const SetorDialog = ({
  visible,
  setVisible,
  id,
}: {
  visible: boolean;
  setVisible: (status: boolean) => void;
  id: number;
}) => {
  const [nominal, setNominal] = useState<number | null>(null);

  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        width: '80%',
        paddingVertical: 17,
        paddingHorizontal: 26,
        borderRadius: 5,
      }}
    >
      <Dialog.Title style={{ color: 'black' }}>
        Masukkan Jumlah Uang Ditarik
      </Dialog.Title>
      <Dialog.Description style={{ alignItems: 'center', height: 'auto' }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ marginTop: 10 }}>Rp. </Text>
          <Dialog.Input
            style={{
              width: 300,
              color: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
            }}
            placeholder="contoh : 20000"
            underlineColorAndroid={'transparent'}
            keyboardType="number-pad"
          />
        </View>
      </Dialog.Description>
      <Dialog.Button
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
        label="Konfirmasi"
        onPress={() => {}}
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
