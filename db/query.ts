import db from "@/constants/dbConn";
import { TsiswaSchema } from "@/zschema/siswaZSchema";
import { Alert } from "react-native";
import { siswaDetail } from "@/type/siswaType";

export const addNewSiswaHandler = async (data: TsiswaSchema, router: any, errors: any) => {
    if (JSON.stringify(errors) === '{}') {
        console.log("test")
        const newSiswa = await db.runAsync('INSERT INTO siswa (name, nisn, class) VALUES (?,?,?)', [data.name, data.nisn, data.class]);

        Alert.alert('Berhasil', 'Data siswa berhasil disimpan', [
            {
                text: 'OK',
                onPress: () => {
                    router.navigate('/');
                },
            },
        ]);
    }
}


export const init = async (setStudents: (e: siswaDetail[]) => void, setFilteredStudents: (e: siswaDetail[]) => void, setRefreshing: (e: boolean) => void) => {
    const dataSiswa: siswaDetail[] = await db.getAllAsync('SELECT * FROM siswa JOIN tabungan ON siswa.id = tabungan.siswaId');

    console.log(dataSiswa);
    setRefreshing(false);
    setFilteredStudents(dataSiswa);
    setFilteredStudents(dataSiswa);
};