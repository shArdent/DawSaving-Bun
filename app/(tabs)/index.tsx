import {
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  View,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { SiswaDetail } from '@/type/siswaType';
import DetailSiswaCard from '@/components/detail-siswa/DetailSiswaCard';
import { init } from '@/libs/query';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const Page = () => {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [students, setStudents] = useState<SiswaDetail[]>([]);
  const [filteredStudents, setFilteredStudents] =
    useState<SiswaDetail[]>(students);

  const router = useRouter();
  const handleSearch = (e: string) => {
    const query = e.trim().toLowerCase();
    setFilteredStudents(
      students.filter((siswa: SiswaDetail) =>
        siswa.name.toLowerCase().includes(query)
      )
    );
  };

  useEffect(() => {
    init(setStudents, setFilteredStudents, setRefreshing);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        testID="add-new"
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
        <FlatList
          data={filteredStudents}
          contentContainerStyle={{ gap: 16, width: '100%' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <DetailSiswaCard siswa={item} index={index} key={index} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() =>
                init(setStudents, setFilteredStudents, setRefreshing)
              }
            />
          }
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 100 }}>
              Belum ada siswa
            </Text>
          }
        />
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
    height: 'auto',
    minHeight: 37,
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
