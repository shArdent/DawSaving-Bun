import { ScrollView } from 'react-native';
import React from 'react';
import AddSiswaForm from '@/components/form/AddSiswaForm';
import Header from '@/components/Header';

const AddNew = () => {

  return (
    <ScrollView>
      <Header title="Tambah Siswa" />
      <AddSiswaForm />
    </ScrollView>
  );
};

export default AddNew;
