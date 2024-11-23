import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AddSiswaForm from '@/components/AddSiswaForm';
import Header from '@/components/Header';

const AddNew = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Tambah Siswa" />
      <AddSiswaForm />
    </View>
  );
};

export default AddNew;
