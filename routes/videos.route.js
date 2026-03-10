import { Router } from "express";
import { getAllVideos, uploadVideo } from "../controllers/videos.controller.js";
import { upload } from "../multer/multer.js";

const router = Router()

router.get("/", getAllVideos)

router.post("/", upload.single("video"), uploadVideo)

export default router