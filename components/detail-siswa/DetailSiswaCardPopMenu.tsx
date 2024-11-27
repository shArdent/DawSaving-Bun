import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import DotMenu from '@/assets/icons/DotMenu.svg';
import { useRouter } from 'expo-router';
import { useDeleteStore } from '@/store';
import React from 'react';

const DetailSiswaCardPopMenu = ({ id }: { id: number }) => {
  const router = useRouter();

  const setConfirmDeleteVisible = useDeleteStore(
    (state: any) => state.setConfirmDeleteVisible
  );

  const setSuccessDeleteVisible = useDeleteStore(
    (state: any) => state.setSuccessDeleteVisible
  );

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
        <MenuOption
          text="Edit"
          onSelect={() =>
            router.push({
              pathname: '/EditSiswa',
              params: { id },
            })
          }
        />
        <MenuOption
          text="Hapus"
          onSelect={() => setConfirmDeleteVisible(true)}
        />
      </MenuOptions>
    </Menu>
  );
};

export default DetailSiswaCardPopMenu;
