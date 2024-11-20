import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AddSiswaForm from "@/components/AddSiswaForm";

const AddNew = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" , position: "absolute", top: 25, left: 20, zIndex: 10}}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent : "center",
          paddingHorizontal: 15,
          paddingTop: 25,
          gap: 60,
          borderBottomWidth : 0.3,
          paddingBottom : 20
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tambah Produk</Text>
      </View>

      <AddSiswaForm />
    </View>
  );
};

export default AddNew;
