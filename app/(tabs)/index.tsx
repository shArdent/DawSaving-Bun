import { Text, StyleSheet, Pressable, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { siswaDetail } from '@/type/siswaType';
import DetailSiswaCard from '@/components/detail-siswa/DetailSiswaCard';
import { init } from '@/db/query';
import { LinearGradient } from 'expo-linear-gradient';

const Page = () => {
  const [students, setStudents] = useState<siswaDetail[]>([]);
  const [filteredStudents, setFilteredStudents] =
    useState<siswaDetail[]>(students);

  const router = useRouter();
  // const { success, error } = useMigrations(db, migrations);

  const handleSearch = (e: string) => {
    const query = e.trim().toLowerCase();
    setFilteredStudents(
      students.filter((siswa: siswaDetail) =>
        siswa.name.toLowerCase().includes(query)
      )
    );
  };

  useEffect(() => {
    init(setStudents, setFilteredStudents);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={styles.AddNew}
        onPress={() =>
          router.navigate({
            pathname: '/AddNew',
          })
        }
      >
        <Ionicons name="add" size={40} color="black" />
      </Pressable>

      <LinearGradient
        style={styles.header}
        colors={['#4CA9DF', 'rgba(41, 46, 145, 0.93)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>DawSaving</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Cari Siswa"
            style={styles.filterInput}
            underlineColorAndroid={'transparent'}
            onChangeText={(e) => handleSearch(e)}
          />
          <Ionicons name="search" size={20} color="black" style={styles.icon} />
        </View>
      </LinearGradient>

      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 24 }}>
        {filteredStudents.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text>Belum ada siswa</Text>
          </View>
        ) : (
          <FlatList
            data={filteredStudents}
            contentContainerStyle={{ gap: 16, width: '100%' }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <DetailSiswaCard siswa={item} index={index} key={index} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4CA9DF',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
    height: 140,
    width: '100%',
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  inputContainer: {
    position: 'relative',
    width: '100%',
    alignSelf: 'flex-end',
  },
  filterInput: {
    backgroundColor: '#FFF',
    padding: 10,
    height: 37,
    borderRadius: 30,
    borderWidth: 0.3,
    paddingHorizontal: 27,
    width: '100%',
  },

  icon: {
    position: 'absolute',
    right: 27,
    top: 10,
  },
});
