import multer from "multer";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    
    cb(null, "ssl/upload");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );

  }

});

export const uploadSSL =
  multer({ storage });