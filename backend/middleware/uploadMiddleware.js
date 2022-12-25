// const express = require("express");
const multer = require('multer');
// const fs = require('fs');

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

module.exports = uploadMiddleware;