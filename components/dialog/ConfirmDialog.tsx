import React, { useState } from 'react';
import Dialog from 'react-native-dialog';

const ConfirmDialog = ({
  setConfirmDialog,
  setSuccessDialog,
  ConfirmHandler,
  label,
  visible,
}: {
  setConfirmDialog: (e: boolean) => void | ((e: boolean) => Promise<void>);
  setSuccessDialog: (e: boolean) => void | ((e: boolean) => Promise<void>);
  ConfirmHandler: () => Promise<void>;
  label: string;
  visible: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleConfirm = async () => {
    setIsLoading(true);
    await ConfirmHandler();
    setIsLoading(false);
    setConfirmDialog(false);
    setSuccessDialog(true);
  };

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title style={{ color: 'black' }}>Konfirmasi</Dialog.Title>
      <Dialog.Description style={{ color: 'black' }}>
        {label}
      </Dialog.Description>
      <Dialog.Button
        testID="cancel-button"
        disabled={isLoading}
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
        testID="confirm-button"
        label={isLoading ? 'Loading...' : 'Konfirmasi'}
        disabled={isLoading}
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
