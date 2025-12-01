import multer from "multer";

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, getUniqueId() + file.originalname);
    }
});

export const upload = multer({ storage });