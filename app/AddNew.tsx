import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import AddSiswaForm from '@/components/form/AddSiswaForm';
import Header from '@/components/Header';

const AddNew = () => {
  const router = useRouter();

  return (
    <ScrollView >
      <Header title="Tambah Siswa" />
      <AddSiswaForm />
    </ScrollView>
  );
};

export default AddNew;
