import { useRouter } from 'expo-router';
import Dialog from 'react-native-dialog';

const ConfirmDialog = ({
  setConfirmDialog,
  setSuccessDialog,
  ConfirmHandler,
  visible,
}: {
  setConfirmDialog: (e: boolean) => void;
  setSuccessDialog: (e: boolean) => void;
  ConfirmHandler: () => Promise<void>;
  visible: boolean;
}) => {
  const handleConfirm = async () => {
    await ConfirmHandler();
    setConfirmDialog(false);
    setSuccessDialog(true);
  };

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title style={{ color: 'black' }}>Konfirmasi</Dialog.Title>
      <Dialog.Description style={{ color: 'black' }}>
        Periksa kembali data Anda apabila kurang yakin!
      </Dialog.Description>
      <Dialog.Button
        label="Batalkan"
        onPress={() => setConfirmDialog(false)}
        style={{
          color: '#3451A3',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      />
      <Dialog.Button
        label="OK"
        style={{
          color: 'white',
          backgroundColor: '#3451A3',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        onPress={() => handleConfirm()}
      />
    </Dialog.Container>
  );
};

export default ConfirmDialog;
