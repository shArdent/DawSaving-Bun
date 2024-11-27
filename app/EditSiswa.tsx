import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useLocalSearchParams } from 'expo-router';
import EditSiswaFrom from '@/components/form/EditSiswaForm';
import { SiswaDetail } from '@/type/siswaType';
import db from '@/constants/dbConn';
const EditSiswa = () => {
  const { id } = useLocalSearchParams();
  const [siswa, setSiswa] = useState<SiswaDetail | null>(null);

  const getData = async () => {
    const data = await db.getFirstAsync(`SELECT * FROM siswa WHERE id = ${id}`);

    setSiswa(data as SiswaDetail);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header title="Edit Siswa" />
      {siswa && <EditSiswaFrom data={siswa as SiswaDetail} />}
    </ScrollView>
  );
};

export default EditSiswa;
