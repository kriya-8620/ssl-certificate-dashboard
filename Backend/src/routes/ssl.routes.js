import express from "express";

import {
  uploadSSL
}
from "../controllers/ssl.controller.js";

import {
  getAllSSL
}
from "../controllers/sslDashboard.controller.js";

import multer from "multer";

const router =
  express.Router();

const storage =
  multer.memoryStorage();

const upload =
  multer({ storage });

/* Upload */

router.post(
  "/upload",

  upload.fields([
    { name: "sslCert" },
    { name: "intermediateCert" },
    { name: "privateKey" }
  ]),

  uploadSSL
);

/* Dashboard */

router.get(
  "/getAll",
  getAllSSL
);

export default router;