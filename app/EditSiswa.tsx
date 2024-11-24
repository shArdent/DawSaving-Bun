import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useLocalSearchParams } from 'expo-router';
import EditSiswaFrom from '@/components/form/EditSiswaForm';
import { siswaDetail } from '@/type/siswaType';
import db from '@/constants/dbConn';
const EditSiswa = () => {
  const { id } = useLocalSearchParams();
  const [siswa, setSiswa] = useState<siswaDetail | null>(null);

  const getData = async () => {
    const data = await db.getFirstAsync(`SELECT * FROM siswa WHERE id = ${id}`);

    setSiswa(data as siswaDetail);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header title="Edit Siswa" />
      {siswa && (
        <EditSiswaFrom data={siswa as siswaDetail} />
      )}
    </ScrollView>
  );
};

export default EditSiswa;
