import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siswaSchema, TsiswaSchema } from '@/zschema/siswaZSchema';
import InputField from '../InputField';
import { addNewSiswaHandler } from '@/libs/query';
import { useState } from 'react';
import ConfirmDialog from '../dialog/ConfirmDialog';
import SuccessDialog from '../dialog/SuccessDialog';
import React from 'react';

const AddSiswaForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(siswaSchema),
    defaultValues: {
      name: '',
      nisn: '',
      class: '',
    },
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [newData, setNewData] = useState<TsiswaSchema | null>(null);

  const onSubmit = (data: TsiswaSchema) => {
    setNewData(data);
    setShowConfirmDialog(true);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 33 }}>
      <View style={{ gap: 24 }}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={styles.fieldInput}>
              <InputField
                label="Nama"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Nama Siswa"
              />
              {errors.name && (
                <Text style={styles.errorText}>
                  {errors.name.message as string}
                </Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="nisn"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={styles.fieldInput}>
              <InputField
                label="NISN"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="NISN Siswa"
              />
              {errors.nisn && (
                <Text style={styles.errorText}>
                  {errors.nisn.message as string}
                </Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="class"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={styles.fieldInput}>
              <InputField
                label="Kelas"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Kelas Siswa"
              />
              {errors.class && (
                <Text style={styles.errorText}>
                  {errors.class.message as string}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      <Pressable
        style={{
          backgroundColor: '#292E91',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          borderWidth: 1,
          width: '100%',
          alignSelf: 'flex-end',
          marginTop: 50,
        }}
        onPress={() => handleSubmit(onSubmit)()}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          Simpan
        </Text>
      </Pressable>

      <ConfirmDialog
        visible={showConfirmDialog}
        setConfirmDialog={setShowConfirmDialog}
        setSuccessDialog={setShowSuccessDialog}
        label={'Periksa kembali data Anda apabila kurang yakin!'}
        ConfirmHandler={async () =>
          await addNewSiswaHandler(newData as any, errors)
        }
      />
      <SuccessDialog
        label="Data berhasil ditambahkan"
        visible={showSuccessDialog}
        setSuccessVisible={setShowSuccessDialog}
      />
    </View>
  );
};

export default AddSiswaForm;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  fieldInput: {
    gap: 10,
  },
});
