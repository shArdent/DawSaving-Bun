import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siswa = sqliteTable("siswa", {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    nisn: text().notNull(),
    class: text().notNull()
})

export const tabungan = sqliteTable("tabungan", {
    id: integer().primaryKey({ autoIncrement: true }),
    siswaId: integer().notNull().references(() => siswa.id),
    amount: integer().notNull().default(0),
})

export const tabunganLog = sqliteTable("tabugan_log", {
    id: integer().primaryKey({ autoIncrement: true }),
    savingId: integer().notNull().references(() => tabungan.id),
    siswaId: integer().notNull().references(() => siswa.id),
    amountAdded: integer().notNull(),
    oldAmount: integer().notNull(),
    newAmount: integer().notNull(),
    createdAt: text().notNull(),
})

