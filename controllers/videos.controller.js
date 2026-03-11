import { v4 as uuid4 } from "uuid"
import path from "path"
import fs from "fs"

const filePath = path.resolve("data", "videos.json")


export const getAllVideos = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf8")
        const videos = JSON.parse(data)
        res.render("home", {
            title: "VibeTube",
            data: videos
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const uploadVideo = (req, res) => {
    const { title, desc, author } = req.body
    const videoFile = req.file
    const videoAll = []

    try {

        const videoDB = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }))

        const newVideoPost = {
            id: uuid4(),
            title,
            desc,
            path: videoFile.path,
            type: videoFile.mimetype,
            filename: videoFile.filename,
            size: videoFile.size,
            author,
            createAt: new Date().toLocaleDateString('en-GB')
        }

        videoAll.push(...videoDB, newVideoPost)

        fs.writeFile(filePath, JSON.stringify(videoAll, null, 2), (err) => {
            if (err) {
                return res.json({ error: err.message })
            }
            res.json({ message: "Video uploaded successfully!", video: newVideoPost })
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}
