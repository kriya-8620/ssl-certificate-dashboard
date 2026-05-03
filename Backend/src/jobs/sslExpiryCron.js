import cron from "node-cron";

import SSLCertificate
from "../models/sslCertificate.model.js";

import {
  sendExpiryEmail
}
from "../services/emailService.js";

/* ================= SSL EXPIRY CHECK ================= */

export const startSSLExpiryCron =
() => {

  /* Runs every day at 9 AM */

  cron.schedule(
    "0 9 * * *",

    async () => {

      console.log(
        "🔍 Running SSL Expiry Check..."
      );

      try {

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

          /* ===== ALERT RULES ===== */

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
          "SSL Cron Error:",
          error
        );

      }

    }

  );

};