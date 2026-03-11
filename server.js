import express from "express";
import { engine } from "express-handlebars";
import { getAllVideos, uploadVideo } from "./controllers/videos.controller.js";
import { upload } from "./multer/multer.js";
import { login, register } from "./controllers/auth.controller.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.render("login", { hideNavbar: true });
});
app.post("/login", login)


//register
app.get("/register", (req, res) => {
  res.render("register", { hideNavbar: true });
});
app.post("/register", register)

//upload
app.get("/upload", (req, res) => {
  const { username, userId } = req.query;
  res.render("upload", { upload: "upload", username: username, userId: userId });
});
app.post("/upload", upload.single("video"), uploadVideo)

app.listen(PORT, () => {
  console.log(`sever is running http://localhost:${PORT}`);
});
