import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siswaSchema, TsiswaSchema } from '@/zschema/siswaZSchema';
import { useRouter } from 'expo-router';
import InputField from './InputField';
import { addNewSiswaHandler } from '@/db/query';

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
  const router = useRouter();

  const showAlert = (data: TsiswaSchema) => {
    Alert.alert(
      'Konfirmasi',
      'Periksa kembali data Anda apabila kurang yakin!',
      [
        {
          text: 'Batalkan',
          style: 'cancel',
        },
        {
          text: 'Simpan',
          onPress: async () => await addNewSiswaHandler(data, router, errors),
        },
      ]
    );
  };

  const onSubmit = (data: TsiswaSchema) => {
    showAlert(data);
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

      {/* <Button title="Simpan" onPress={handleSubmit(onSubmit)} /> */}
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
