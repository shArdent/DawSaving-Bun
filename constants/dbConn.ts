import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const openDb = () => {
    const db = openDatabaseSync("test1.db");
    db.execSync(`CREATE TABLE IF NOT EXISTS siswa (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        nisn TEXT NOT NULL,
        class TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS 'tabungan' (
        'id' integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        'siswaId' integer NOT NULL,
        'amount' integer DEFAULT 0 NOT NULL,
        FOREIGN KEY ('siswaId') REFERENCES 'siswa'('id') ON UPDATE no action ON DELETE no action
    );
    CREATE TABLE IF NOT EXISTS 'saving_log' (
        'id' integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        'siswaId' integer NOT NULL,
        'tabunganId' integer NOT NULL,
        'addedAmount' integer NOT NULL,
        'oldAmount' integer NOT NULL,
        'newAmount' integer NOT NULL,
        'createdAt' integer NOT NULL,
        FOREIGN KEY ('siswaId') REFERENCES 'siswa'('id') ON UPDATE no action ON DELETE no action,
        FOREIGN KEY ('tabunganId') REFERENCES 'tabungan'('id') ON UPDATE no action ON DELETE no action
    );

    CREATE TRIGGER IF NOT EXISTS 'add_tabungan' AFTER INSERT ON 'siswa' BEGIN
        INSERT INTO 'tabungan' ('siswaId', 'amount') VALUES (new.id, 0);
    END;

    CREATE TRIGGER IF NOT EXISTS 'log_menabung' AFTER UPDATE ON 'tabungan' BEGIN
        INSERT INTO 'saving_log' ('siswaId', 'addedAmount', 'oldAmount', 'newAmount', 'createdAt') VALUES (new.siswaId, new.amount - old.amount, old.amount, new.amount, DATETIME('now'));
    END;
    `);
    db.execSync(`CREATE TRIGGER IF NOT EXISTS 'add_tabungan' AFTER INSERT ON 'siswa' BEGIN
        INSERT INTO 'tabungan' ('siswaId', 'amount') VALUES (new.id, 0);
    END;

    CREATE TRIGGER IF NOT EXISTS 'log_menabung' AFTER UPDATE ON 'tabungan' BEGIN
        INSERT INTO 'saving_log' ('siswaId', 'addedAmount', 'oldAmount', 'newAmount', 'createdAt') VALUES (new.siswaId, new.amount - old.amount, old.amount, new.amount, DATETIME('now'));
    END;
        `);
    return db;
}

const db = drizzle(openDb());

export default db;