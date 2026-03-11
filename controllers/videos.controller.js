import { v4 as uuid4 } from "uuid"
import path from "path"
import fs from "fs"
import { pool } from "../config/db.js"

const filePath = path.resolve("data", "videos.json")


export const getAllVideos = async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM videos")
        const videos = data.rows
        console.log(videos)
        res.render("home", {
            title: "VibeTube",
            data: videos
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const uploadVideo = async (req, res) => {
    const { title, desc, author } = req.body
    const videoFile = req.file

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
        const result = await pool.query(query, [...Object.values(newVideoPost)])
        console.log(result)
        res.redirect("/")
    } catch (error) {
        res.json({ error: error.message })
    }
}
