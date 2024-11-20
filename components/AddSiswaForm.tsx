import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siswaSchema, TsiswaSchema } from '@/zschema/siswaZSchema';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import db from '@/constants/dbConn';
import { siswa } from '@/db/schema';

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
          onPress: async () => {
            if (JSON.stringify(errors) === '{}') {
              await db.insert(siswa).values(data);
              Alert.alert('Berhasil', 'Data siswa berhasil disimpan', [
                {
                  text: 'OK',
                  onPress: () => {
                    router.navigate('/');
                  },
                },
              ]);
            }
          },
        },
      ]
    );
  };

  const onSubmit = (data: TsiswaSchema) => {
    showAlert(data);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 33 }}>
      <ScrollView>
        <View style={{ gap: 24 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <View>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.inputField}
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
              <View>
                <Text style={styles.inputLabel}>NISN</Text>
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  style={styles.inputField}
                  placeholder="NISN Siswa"
                  keyboardType="decimal-pad"
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
              <View>
                <Text style={styles.inputLabel}>Kelas</Text>
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  style={styles.inputField}
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
      </ScrollView>
      <Button title="Simpan" onPress={handleSubmit(onSubmit)} />
      {/* <Pressable
        style={{
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          width: 'auto',
          position: 'absolute',
          bottom: 30,
          right: 24,
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Simpan data</Text>
      </Pressable> */}
    </View>
  );
};

export default AddSiswaForm;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    padding: 15,
    width: '100%',
    borderRadius: 5,
  },
  inputLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
