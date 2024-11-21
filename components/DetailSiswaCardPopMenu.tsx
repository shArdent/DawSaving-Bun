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
        top: 0,
        right: 0,

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

            zIndex: 999,
            backgroundColor: 'green',
          },
        }}
      >
        <DotMenu width={50} height={50} />
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
