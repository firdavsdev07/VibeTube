import express from "express"
import { engine } from "express-handlebars"
import videoRoute from "./routes/videos.route.js"

const app = express()
const PORT = 5000

app.engine("handlebars", engine())
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set("view engine", "handlebars")
app.set("views", "./views")

app.get("/", (req, res) => {
    res.render("home", {
        title: "VibeTube"
    })
})

app.get("/login", (req, res) => {
    res.render("login", { title: "Login" })
})

app.use("/videos", videoRoute)


app.listen(PORT, () => {
    console.log(`sever is running http://localhost:${PORT}`)
})

