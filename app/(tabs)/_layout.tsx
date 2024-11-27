import TabBar from "@/components/tabbar/TabBar";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Daftar Siswa" }}
      />
      <Tabs.Screen
        name="history"
        options={{ headerShown: false, title: "Riwayat Menabung " }}
      />
    </Tabs>
  );
};

export default TabLayout;
