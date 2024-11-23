import db from "@/constants/dbConn";
import { TsiswaSchema } from "@/zschema/siswaZSchema";
import { siswa, tabungan } from "./schema";
import { eq } from "drizzle-orm";
import { Alert } from "react-native";
import { siswaDetail } from "@/type/siswaType";

export const addNewSiswaHandler = async (data: TsiswaSchema, router: any, errors: any) => {
    async () => {
        if (JSON.stringify(errors) === '{}') {
            const newSiswa = await db.insert(siswa).values(data);
            await db
                .update(tabungan)
                .set({ amount: 0 })
                .where(eq(tabungan.siswaId, newSiswa.lastInsertRowId));
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
}

export const init = async (setStudents: (e: siswaDetail[]) => void, setFilteredStudents: (e: siswaDetail[]) => void) => {
    const dataSiswa: siswaDetail[] = await db
        .select({
            id: siswa.id,
            name: siswa.name,
            nisn: siswa.nisn,
            class: siswa.class,
            amount: tabungan.amount,
        })
        .from(siswa)
        .innerJoin(tabungan, eq(siswa.id, tabungan.siswaId));

    setFilteredStudents(dataSiswa);
    setFilteredStudents(dataSiswa);
};