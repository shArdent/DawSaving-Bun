import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { siswa, tabungan } from '@/db/schema';
import { eq } from 'drizzle-orm';
import db from '@/constants/dbConn';
import { siswaDisplayType } from '@/type/siswaType';
const DetailSiswa = () => {
  const { id, name } = useLocalSearchParams();
  const [dataSiswa, setDataSiswa] = useState<siswaDisplayType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const data = await db
      .select({
        id: siswa.id,
        name: siswa.name,
        nisn: siswa.nisn,
        class: siswa.class,
        amount: tabungan.amount,
      })
      .from(siswa)
      .innerJoin(tabungan, eq(siswa.id, tabungan.siswaId))
      .where(eq(siswa.id, Number(id)));

    setDataSiswa(data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <View></View>;
};

export default DetailSiswa;
