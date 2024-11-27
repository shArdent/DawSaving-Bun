import { z } from 'zod'

interface siswa {
    name: string;
    nisn: string;
    class: string;
}

export const siswaSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).max(255).refine((value) => value.trim().length > 0, 'Nama tidak boleh kosong'),
    nisn: z.string({ required_error: 'NISN is required' }).max(255).refine((value) => value.trim().length > 0, 'NISN tidak boleh kosong'),
    class: z.string({ required_error: 'Class is required' }).max(10).refine((value) => value.trim().length > 0, 'Kelas tidak boleh kosong'),
})

export type TsiswaSchema = z.infer<typeof siswaSchema>;

