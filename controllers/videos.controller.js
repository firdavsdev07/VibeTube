import { v4 as uuid4 } from "uuid"
import path from "path"
import fs from "fs"
import { pool } from "../config/db.js"

const filePath = path.resolve("data", "videos.json")


export const getAllVideos = async (req, res) => {
    const { username, userId } = req.query
    try {
        const query = ` 
            SELECT videos.*, 
                   users.username as author_name,
                   TO_CHAR(videos.created_at, 'DD Mon YYYY') as formatted_date
            FROM videos 
            LEFT JOIN users ON videos.author = users.id
        `
        const data = await pool.query(query)
        const videos = data.rows
        res.render("home", {
            title: "VibeTube",
            data: videos,
            username: username,
            userId: userId
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const uploadVideo = async (req, res) => {
    const { title, desc, author } = req.body
    const videoFile = req.file
    const { username, userId } = req.query;

    if (!videoFile) return res.status(400).send("Video file required");

    const newVideoPost = {
        id: uuid4(),
        title,
        desc,
        path: videoFile.path,
        type: videoFile.mimetype,
        filename: videoFile.filename,
        size: videoFile.size,
        author,
    }
    try {
        const query = `
            INSERT INTO videos (id,title,"desc",path,type,filename,size,author)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
        `
        await pool.query(query, [...Object.values(newVideoPost)])
        res.redirect(`/?username=${username}&userId=${userId}`)
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const getEditVideo = async (req, res) => {
    const { id } = req.params
    const { username, userId } = req.query
    try {
        const data = await pool.query(`SELECT * FROM videos WHERE id = $1`, [id])
        const video = data.rows[0]
        if (!video) return res.status(404).send("Video topilmadi")
        if (video.author !== userId) return res.status(403).send("Ruxsat yo'q")
        res.render("edit", { video, username, userId })
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const editVideo = async (req, res) => {
    const { id } = req.params
    const { title, desc } = req.body
    const { username, userId } = req.query
    try {
        const data = await pool.query(`SELECT author FROM videos WHERE id = $1`, [id])
        if (!data.rows[0] || data.rows[0].author !== userId) return res.status(403).send("Ruxsat yo'q")
        await pool.query(`UPDATE videos SET title=$1, "desc"=$2 WHERE id=$3`, [title, desc, id])
        res.redirect(`/?username=${username}&userId=${userId}`)
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params
    const { username, userId } = req.query
    try {
        const data = await pool.query(`SELECT author, filename FROM videos WHERE id = $1`, [id])
        const video = data.rows[0]
        if (!video || video.author !== userId) return res.status(403).send("Ruxsat yo'q")
        await pool.query(`DELETE FROM videos WHERE id = $1`, [id])
        const filePath = path.resolve("uploads", video.filename)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        res.redirect(`/?username=${username}&userId=${userId}`)
    } catch (error) {
        res.json({ error: error.message })
    }
}
