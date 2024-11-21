import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Dialog from 'react-native-dialog';
import { setNativeProps } from 'react-native-reanimated';

const SetorDialog = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (status: boolean) => void;
}) => {
  const [nominal, setNominal] = useState<number | null>(null);

  return (
    <Dialog.Container visible={visible} contentStyle={{ width: '80%' }}>
      <Dialog.Title style={{ color: 'black' }}>
        Masukkan Jumlah Uang Disetor
      </Dialog.Title>
      <Dialog.Description style={{ alignItems: 'center', height: 'auto' }}>
        <View style={{ flexDirection : 'row' }}>
          <Text style={{ marginTop : 10 }}>Rp. </Text>
          <Dialog.Input style={{ width: 320, color : 'black' }} keyboardType='number-pad' />
        </View>
      </Dialog.Description>
      <Dialog.Button
        label="Batal"
        onPress={() => {
          setVisible(false);
        }}
      />
      <Dialog.Button label="Setor" onPress={() => {}} />
    </Dialog.Container>
  );
};

export default SetorDialog;
