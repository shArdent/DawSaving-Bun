import { View, Text, StyleSheet, KeyboardType } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';

const InputField = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  keyboardType,
}: {
  label: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  keyboardType?: KeyboardType;
}) => {
  return (
    <View style={{ gap: 14 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        style={styles.inputField}
        placeholder={placeholder}
        keyboardType={keyboardType as any}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    padding: 15,
    width: '100%',
    borderRadius: 5,
  },
  inputLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
