const uuid = require("uuid").v4;
const uploadToFireStore = require("../connection/fireBase");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleImgUpload = async (req, res, next) => {
    upload.single("photo")
        (req, res, async (err) => {
            if (err) {
                console.log({ err })
                return res.status(400).json({ ok: false, messaage: err });
            }
            try {
                if (!req.file) {
                    throw new Error("No image uploaded");
                }
                const imageName = `${uuid()}-${req.file.originalname}`;
                const imgUrl = await uploadToFireStore(
                    req.file.buffer,
                    imageName
                );
                req.body.photo = imgUrl;
                next();
            } catch (error) {
                res.status(500).json({ ok: false, message: error.message });
            }
        })
}

module.exports = handleImgUpload

