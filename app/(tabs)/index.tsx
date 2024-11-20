import {
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  View,
  Button,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { tabungan, siswa } from '@/db/schema';
import db from '@/constants/dbConn';
import { siswaDisplayType } from '@/type/siswaType';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { eq } from 'drizzle-orm';

const Page = () => {
  const [students, setStudents] = useState<siswaDisplayType[]>([]);
  const [filteredStudents, setFilteredStudents] =
    useState<siswaDisplayType[]>(students);

  const router = useRouter();
  const { success, error } = useMigrations(db, migrations);

  const handleSearch = (e: string) => {
    const query = e.trim().toLowerCase();
    setFilteredStudents(
      students.filter((siswa: siswaDisplayType) =>
        siswa.name.toLowerCase().includes(query)
      )
    );
  };

  const init = async () => {
    const dataSiswa: siswaDisplayType[] = await db
      .select({
        id: siswa.id,
        name: siswa.name,
        nisn: siswa.nisn,
        class: siswa.class,
        amount: tabungan.amount,
      })
      .from(siswa)
      .innerJoin(tabungan, eq(siswa.id, tabungan.siswaId));

    setStudents(dataSiswa);
    setFilteredStudents(dataSiswa);
  };

  useEffect(() => {
    init();
  }, [success]);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'transparent' }}>
      <Pressable
        style={styles.AddNew}
        onPress={async () =>
          router.navigate({
            pathname: '/AddNew',
          })
        }
      >
        <Ionicons name="add" size={40} color="black" />
      </Pressable>
      <View
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 10,
          left: 10,
          flexDirection: 'row',
          zIndex: 10,
          width: '100%',
        }}
      >
        <TextInput
          placeholder="Cari Siswa"
          style={styles.filterInput}
          underlineColorAndroid={'transparent'}
          onChangeText={(e) => handleSearch(e)}
        />
        <Ionicons name="search" size={20} color="black" style={styles.icon} />
      </View>
      <View>
        {filteredStudents.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text>Belum ada siswa</Text>
          </View>
        ) : (
          <FlatList
            data={filteredStudents}
            contentContainerStyle={{ gap: 12, paddingTop: 67, width: '100%' }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={styles.child}
                onPress={() =>
                  router.navigate({
                    pathname: '/DetailSiswa',
                    params: {
                      id: item.id,
                      name : item.name
                    },
                  })
                }
              >
                <Text>{item.name}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  child: {
    gap: 10,
    backgroundColor: '#FFF',
    elevation: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  AddNew: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 165,
    right: 33,
    zIndex: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  filterInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 30,
    borderWidth: 0.3,
    paddingHorizontal: 27,
    width: '100%',
  },

  icon: {
    position: 'absolute',
    right: 27,
    top: 13,
  },
});
