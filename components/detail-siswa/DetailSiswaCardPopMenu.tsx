import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import DotMenu from '@/assets/icons/DotMenu.svg';
import { useRouter } from 'expo-router';

const DetailSiswaCardPopMenu = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <Menu>
      <MenuTrigger>
        <DotMenu width={30} height={30} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            position: 'relative',
            top: 0,
            marginTop: 50,
            right: 10,
            zIndex: 999,
            borderRadius: 10,
            padding: 10,
          },
        }}
      >
        <MenuOption text="Edit" onSelect={() => router.push({
          pathname: '/EditSiswa',
          params: { id },
        })} />
        <MenuOption text="Hapus" />
      </MenuOptions>
    </Menu>
  );
};

export default DetailSiswaCardPopMenu;
