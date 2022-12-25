const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const router = express.Router();

const uploadMiddleware = multer({
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        cb(undefined, true)
    },
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        }
    })
})

router.post("/upload", uploadMiddleware.single("image"), (req, res) => {
    const format = req.body.format;
    const quality = req.body.quality;

    sharp(req.file.path)
    .toFormat(format, { quality: parseInt(quality, 10) })
    .toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const dataURL = 'data:image/' + format + ';base64,' + buffer.toString('base64');
        res.send(dataURL);
      }
    });
});

module.exports = router;