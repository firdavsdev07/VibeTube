import multer from "multer";
import { v4 as uuid4 } from "uuid"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, uuid4() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage })
