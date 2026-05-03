import SSLCertificate
from "../models/sslCertificate.model.js";

import {
  parseSSLCertificate
}
from "../utils/sslParser.js";

/* ================= UPLOAD SSL ================= */
 const uploadSSL =async (req, res) => {

  try {

    const { bankName } = req.body;
    const toList = req.body.toEmails.split(",").map(e => e.trim());
    const ccList = req.body.ccEmails.split(",").map(e => e.trim());
   console.log("toList:",toList);
   console.log("ccList:",ccList);
   console.log("Body:",req.body);
    if (!bankName) {

      return res.status(400).json({

        success: false,
        message:"Bank Name required"
        });

    }

    if (!req.files || !req.files.sslCert) {

      return res.status(400).json({

        success: false,
        message:"SSL Certificate required"
        });

    }

    /* ===== Extract From Certificate ===== */

    const certFile = req.files.sslCert[0];

    const parsed =parseSSLCertificate(certFile.buffer);

    /* 🔥 VALIDATION CHECK */

    if (!parsed) {

      return res.status(400).json({

        success: false,
        message:"Invalid SSL Certificate file"
      });

    }
const domainName =parsed.domainName;
const expiryDate =parsed.expiryDate;
console.log("Extracted:",domainName,expiryDate);

    /* ===== DUPLICATE CHECK ===== */

const existingSSL =await SSLCertificate.findOne({domainName});

    if (existingSSL) {

      existingSSL.bankName =bankName;

      existingSSL.expiryDate =expiryDate;
      existingSSL.toList=toList;
      existingSSL.ccList=ccList;
      await existingSSL.save();

      return res.status(200).json({

        success: true,

        message:"SSL Updated (Duplicate Domain Found)",
         data: existingSSL

      });

    }

    /* ===== CREATE NEW ===== */

    const ssl = await SSLCertificate.create({

        bankName,
        domainName,
        expiryDate,
        toEmails: toList,
        ccEmails: ccList


      });

    res.status(200).json({

      success: true,

      message: "SSL Stored Successfully",

      data: ssl

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export {
  uploadSSL
}