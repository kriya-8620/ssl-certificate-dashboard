import SSLCertificate
from "../models/sslCertificate.model.js";

import {
  sendExpiryEmail
}
from "./email.service.js";

/* ================= CHECK SSL EXPIRY ================= */

 const checkSSLExpiry = async () => {

  try {

    console.log(
      "🔍 Checking SSL Expiry..."
    );

    const sslList =
      await SSLCertificate.find();

    const today =
      new Date();

    for (
      const ssl of sslList
    ) {

      const expiry =
        new Date(
          ssl.expiryDate
        );

      const diffTime =
        expiry - today;

      const daysRemaining =
        Math.ceil(
          diffTime /
          (1000 * 60 * 60 * 24)
        );

      console.log(
        ssl.domainName,
        "Days Left:",
        daysRemaining
      );

      /* ===== ALERT CONDITIONS ===== */

      if (

        daysRemaining === 30 ||

        daysRemaining === 15 ||

        daysRemaining === 7 ||

        daysRemaining === 1 ||

        daysRemaining < 0

      ) {

        await sendExpiryEmail(
          ssl
        );

      }

    }

  }

  catch (error) {

    console.error(
      "SSL Expiry Error:",
      error
    );

  }

};

export {

  checkSSLExpiry,
}