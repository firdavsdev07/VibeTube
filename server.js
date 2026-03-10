import express from "express"
import { engine } from "express-handlebars"
import videoRoute from "./routes/videos.route.js"
import { getAllVideos } from "./controllers/videos.controller.js"

const app = express()
app.use(express.json())
const PORT = 5000

app.engine("handlebars", engine())
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set("view engine", "handlebars")
app.set("views", "./views")

app.get("/", getAllVideos)



app.use("/videos", videoRoute)


app.listen(PORT, () => {
    console.log(`sever is running http://localhost:${PORT}`)
})

