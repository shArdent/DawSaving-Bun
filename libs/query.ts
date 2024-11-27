import db from "@/constants/dbConn";
import { TsiswaSchema } from "@/zschema/siswaZSchema";
import { LogSiswa, SiswaDetail } from "@/type/siswaType";


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
        await db.runAsync('UPDATE siswa SET name = ?, nisn = ?, class = ? WHERE id = ?', [data.name, data.nisn, data.class, data.id]);

    }
}

export const init = async (setStudents: (e: SiswaDetail[]) => void, setFilteredStudents: (e: SiswaDetail[]) => void, setRefreshing: (e: boolean) => void) => {
    const dataSiswa: SiswaDetail[] = await db.getAllAsync('SELECT * FROM siswa JOIN tabungan ON siswa.id = tabungan.siswaId');

    setRefreshing(false);
    setStudents(dataSiswa);
    setFilteredStudents(dataSiswa);
};

export const deleteSiswaHandler = async (id: number) => {
    await db.runAsync(`
        DELETE FROM saving_log WHERE siswaId = ${id};`);
    await db.runAsync(`
        DELETE FROM tabungan WHERE siswaId = ${id};`);
    await db.runAsync(`
        DELETE FROM siswa WHERE id = ${id} `);
}

export const handleSetor = async (id: number, nominal: number) => {
    await db.runAsync('UPDATE tabungan SET amount = ? WHERE siswaId = ?', [
        nominal,
        id,
    ]);
}

export const handleTarik = async (id: number, total: number) => {
    await db.runAsync('UPDATE tabungan SET amount = ? WHERE siswaId = ?', [
        total,
        id,
    ]);

}

export const getMenabungLog = async (date: Date, setData: (e: LogSiswa[]) => void, setRefreshing: (e: boolean) => void, id?: number) => {
    if (id) {
        if (date) {
            const nowDate = date.toISOString().split('T')[0];
            const dataLog = await db.getAllAsync(`
                SELECT * FROM saving_log JOIN siswa ON saving_log.siswaId = siswa.id WHERE saving_log.createdAt LIKE '%${nowDate}%' AND saving_log.siswaId=${id} ORDER BY saving_log.createdAt DESC`)
            setData(dataLog as LogSiswa[]);
            setRefreshing(false);
            return
        }

        const dataLog = await db.getAllAsync(`
            SELECT * FROM saving_log JOIN siswa ON saving_log.siswaId = siswa.id WHERE saving_log.siswaId=${id} ORDER BY saving_log.createdAt DESC`)

        setData(dataLog as LogSiswa[]);
        setRefreshing(false);
        return
    }

    if (!date) {
        const dataLog = await db.getAllAsync(
            'SELECT * FROM saving_log JOIN siswa ON saving_log.siswaId = siswa.id ORDER BY saving_log.createdAt DESC'
        );

        setData(dataLog as LogSiswa[]);
        setRefreshing(false);
        return
    }

    const nowDate = date.toISOString().split('T')[0];
    const dataLog = await db.getAllAsync(
        `SELECT * FROM saving_log JOIN siswa ON saving_log.siswaId = siswa.id WHERE saving_log.createdAt LIKE '%${nowDate}%' ORDER BY saving_log.createdAt DESC`
    )

    setData(dataLog as LogSiswa[]);
    setRefreshing(false);
};

export const timestamp = (date: string) => {
    const namaBulan: Record<string, string> = {
        '01': 'Januari',
        '02': 'Februari',
        '03': 'Maret',
        '04': 'April',
        '05': 'Mei',
        '06': 'Juni',
        '07': 'Juli',
        '08': 'Agustus',
        '09': 'September',
        '10': 'Oktober',
        '11': 'November',
        '12': 'Desember',
    };

    const [tahun, bulan, tanggal] = date.split(' ')[0].split('-') as string[];

    return `${tanggal} ${namaBulan[bulan]} ${tahun}`;
};

