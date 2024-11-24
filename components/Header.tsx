import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import DetailSiswaCardPopMenu from './detail-siswa/DetailSiswaCardPopMenu';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({ title, showMenu, id }: { title: string; showMenu?: boolean, id? : number }) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#4CA9DF', 'rgba(41, 46, 145, 0.93)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        position: 'fixed',
        top : 0,
        left : 0,
        width: '100%',
        height: 74,
        justifyContent: showMenu ? 'space-between' : 'center',
        gap: showMenu ? 0 : 77,
        alignItems: 'center',
        backgroundColor: '#4CA9DF',
        flexDirection: 'row',
        padding: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={showMenu ? {} : { position: 'absolute', left: 20 }}
      >
        <Ionicons name="arrow-back" size={28} color={'white'} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
        {title}
      </Text>
      {showMenu && <DetailSiswaCardPopMenu id={id as number}/>}
    </LinearGradient>
  );
};

export default Header;
