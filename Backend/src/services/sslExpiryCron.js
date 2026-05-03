import cron from "node-cron";

import SSLCertificate
from "../models/sslCertificate.model.js";

import {
  sendExpiryEmail
} from "./email.service.js";

cron.schedule(
  "0 0 * * *",

  async () => {

    console.log(
      "Running SSL Expiry Check..."
    );

    try {

      const today =
        new Date();

      const alertDate =
        new Date();

      alertDate.setDate(
        today.getDate() + 30
      );

      const expiringSSLs =
        await SSLCertificate.find({

          expiryDate: {
            $lte: alertDate
          }

        });

      for (const ssl of expiringSSLs) {

        await sendExpiryEmail(
          ssl
        );

      }

      console.log(
        "SSL Expiry Check Completed"
      );

    }

    catch (error) {

      console.error(
        "Cron Error:",
        error
      );

    }

  }

);