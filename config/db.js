import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "vibetube",
    password: "1234",
    port: 5432
})

pool.connect()
    .then(client => {
        console.log("Ma'lumotlar bazasiga muvaffaqiyatli ulanish amalga oshdi!");
        client.release();
    })
    .catch(err => {
        console.error("Ulanishda xatolik:", err);
    });
