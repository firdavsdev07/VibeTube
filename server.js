import express from "express";
import { engine } from "express-handlebars";
import videoRoute from "./routes/videos.route.js";
import { getAllVideos, uploadVideo } from "./controllers/videos.controller.js";
import { upload } from "./multer/multer.js";

const app = express();
app.use(express.json());
const PORT = 5000;

app.engine("handlebars", engine());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "handlebars");
app.set("views", "./views");

//home
app.get("/", getAllVideos);
//login
app.get("/login", (req, res) => {
  res.render("login");
});
//register
app.get("/register", (req, res) => {
  res.render("register");
});
//upload
app.get("/upload", (req, res) => {
  res.render("upload", { upload: "upload" });
});
app.post("/upload", upload.single("video"), uploadVideo)

app.listen(PORT, () => {
  console.log(`sever is running http://localhost:${PORT}`);
});
