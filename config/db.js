import { Pool } from "pg";

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.connect()
    .then(client => {
        console.log("Ma'lumotlar bazasiga muvaffaqiyatli ulanish amalga oshdi!");
        client.release();
    })
    .catch(err => {
        console.error("Ulanishda xatolik:", err);
    });
