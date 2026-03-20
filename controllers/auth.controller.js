import { v4 as uuid4 } from "uuid"
import bcrypt from "bcrypt"
import { pool } from "../config/db.js"

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const query = `
            INSERT INTO users (id,username,email,password)
            VALUES ($1,$2,$3,$4)
            RETURNING *;
        `
        await pool.query(query, [uuid4(), username, email, hashedPassword])
        res.render("login", { message: "User registered! Now login." });
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.render("login", { error: "Wrong email or password" });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render("login", { error: "Wrong email or password" });
        }

        res.redirect(`/?username=${encodeURIComponent(user.username)}&userId=${user.id}`);
    } catch (err) {
        res.render("login", { error: err.message });
    }
};
