import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const icon: any = {
  index: (props: any) => <Ionicons name={'list'} size={24} {...props} />,
  history: (props: any) => (
    <MaterialCommunityIcons name={'history'} size={24} {...props} />
  ),
};

const TabBarButton = ({
  onPress,
  onLongPress,
  routeName,
  label,
  isFocused,
}: {
  onPress: Function;
  onLongPress: Function;
  routeName: string;
  label: string;
  isFocused: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress as any}
      onLongPress={onLongPress as any}
      style={styles.tabBarItem}
    >
      {icon[routeName] &&
        icon[routeName]({
          color: isFocused ? '#001994' : '#000',
        })}
      <Text
        style={{
          color: isFocused ? '#001994' : '#000',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
