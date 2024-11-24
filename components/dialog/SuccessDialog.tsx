import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import Dialog from 'react-native-dialog';

const SuccessDialog = ({
  visible,
  label,
}: {
  visible: boolean;
  label: string;
}) => {
  const router = useRouter();

  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Dialog.Title style={{ textAlign: 'center' }}>
        <AntDesign name="infocirlce" size={24} color={'black'} />
      </Dialog.Title>
      <Dialog.Description style={{ color : 'black' }}>{label}</Dialog.Description>
      <Dialog.Button
        label="OK"
        onPress={() => router.push('/')}
        style={{
          color: 'white',
          width : '100%',
          minWidth : 200,
          backgroundColor: '#3451A3',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      />
    </Dialog.Container>
  );
};

export default SuccessDialog;