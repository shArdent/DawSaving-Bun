import db from "@/constants/dbConn";
import { TsiswaSchema } from "@/zschema/siswaZSchema";
import { Alert } from "react-native";
import { siswaDetail } from "@/type/siswaType";
import { useRouter } from "expo-router";

export const addNewSiswaHandler = async (data: TsiswaSchema, errors: any) => {
    if (JSON.stringify(errors) === '{}') {
        await db.runAsync('INSERT INTO siswa (name, nisn, class) VALUES (?,?,?)', [data.name, data.nisn, data.class]);
    }
}

interface dataDetail extends TsiswaSchema {
    id: number;
}

export const editSiswaHandler = async (data: dataDetail, errors: any) => {
    if (JSON.stringify(errors) === '{}') {
        console.log(data);
        // await db.runAsync('UPDATE siswa SET name = ?, nisn = ?, class = ? WHERE id = ?', [data.name, data.nisn, data.class, data.id]);

    }
}


export const init = async (setStudents: (e: siswaDetail[]) => void, setFilteredStudents: (e: siswaDetail[]) => void, setRefreshing: (e: boolean) => void) => {
    const dataSiswa: siswaDetail[] = await db.getAllAsync('SELECT * FROM siswa JOIN tabungan ON siswa.id = tabungan.siswaId');

    setRefreshing(false);
    setFilteredStudents(dataSiswa);
    setFilteredStudents(dataSiswa);
};