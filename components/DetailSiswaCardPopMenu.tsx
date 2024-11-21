import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import DotMenu from '@/assets/icons/DotMenu.svg';

const DetailSiswaCardPopMenu = () => {
  return (
    <Menu
      style={{
        height: 50,
        width: 100,
        top: 10,
        right: 10,
        backgroundColor: 'red',
        position: 'absolute',
      }}
    >
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: 'green',
            zIndex: 999,
          },
        }}
      >
        <DotMenu width={25} height={25} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            position: 'absolute',
            zIndex: 999,
            top: 0,
            right: 0,
            borderRadius: 10,
            padding: 10,
          },
        }}
      >
        <MenuOption text="Edit" />
        <MenuOption text="Hapus" />
      </MenuOptions>
    </Menu>
  );
};

export default DetailSiswaCardPopMenu;
