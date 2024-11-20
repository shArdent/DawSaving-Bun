CREATE TABLE `siswa` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`nisn` text NOT NULL,
	`class` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tabungan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`siswaId` integer NOT NULL,
	`amount` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tabugan_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`savingId` integer NOT NULL,
	`siswaId` integer NOT NULL,
	`amountAdded` integer NOT NULL,
	`oldAmount` integer NOT NULL,
	`newAmount` integer NOT NULL,
	`createdAt` text NOT NULL,
	FOREIGN KEY (`savingId`) REFERENCES `tabungan`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON UPDATE no action ON DELETE no action
);
