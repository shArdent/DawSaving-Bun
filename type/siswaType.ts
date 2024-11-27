
export interface SiswaDetail {
    id: number,
    name: string,
    nisn: string,
    class: string
    amount: number
}

export interface Siswa {
    id: number,
    name: string,
    nisn: string,
    class: string
}

export interface LogSiswa {
    id : number,
    siswaId  : number,
    tabunganId : number,
    name: string,
    oldAmount : number,
    newAmount: number,
    addedAmount: number,
    createdAt: string
}