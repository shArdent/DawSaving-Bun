import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Daftar Siswa" }}
      />
      <Tabs.Screen
        name="two"
        options={{ headerShown: false, title: "Riwayat Menabung " }}
      />
    </Tabs>
  );
};

export default TabLayout;
