import { v4 as uuid4 } from "uuid"
import { pool } from "../config/db.js"

export const register = async (req, res) => {
    const { username, email, password } = req.body

    const newUser = {
        id: uuid4(),
        username,
        email,
        password
    }

    try {
        const query = `
            INSERT INTO users (id,username,email,password)
            VALUES ($1,$2,$3,$4)
            RETURNING *;
        `

        const user = await pool.query(query, [...Object.values(newUser)])

        console.log(user.rows)
        res.render("login", { message: "User registered! Now login." });
    } catch (error) {
        res.json({ error: error.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1 AND password=$2",
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.render("login", { error: "Wrong email or password" });
        }

        const user = result.rows[0];
        res.redirect(`/?username=${encodeURIComponent(user.username)}&userId=${user.id}`);

    } catch (err) {
        res.render("login", { error: err.message });
    }
};