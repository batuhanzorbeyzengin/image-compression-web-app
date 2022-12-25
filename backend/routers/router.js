const express = require("express");
const sharp = require('sharp');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post("/upload", uploadMiddleware.single("image"), (req, res) => {
    const format = req.body.format;
    const quality = req.body.quality;

    sharp(req.file.path)
    .toFormat(format, { quality: parseInt(quality, 10) })
    .toBuffer((err, buffer) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const dataURL = 'data:image/' + format + ';base64,' + buffer.toString('base64');
        res.send(dataURL);
      }
    });
});

module.exports = router;