import forge from "node-forge";

/* ================= EXTRACT SSL DETAILS ================= */

export const parseSSLCertificate =
  (buffer) => {

    try {

      /* Convert buffer to string */

      const certPem =
        buffer.toString();

      /* 🔥 VALIDATION CHECK */

      if (
        !certPem.includes(
          "BEGIN CERTIFICATE"
        )
      ) {

        throw new Error(
          "Invalid certificate format"
        );

      }

      /* Parse Certificate */

      const cert =
        forge.pki.certificateFromPem(
          certPem
        );

      /* ===== Expiry Date ===== */

      const expiryDate =
        cert.validity.notAfter;

      /* ===== Domain Extraction ===== */

      let domainName =
        cert.subject.attributes
          .find(
            attr =>
              attr.name ===
              "commonName"
          )?.value;

      /* ===== SAN Domains ===== */

      const extensions =
        cert.extensions || [];

      const san =
        extensions.find(
          ext =>
            ext.name ===
            "subjectAltName"
        );

      if (
        san &&
        san.altNames &&
        san.altNames.length > 0
      ) {

        domainName =
          san.altNames[0].value;

      }

      /* 🔥 FINAL VALIDATION */

      if (
        !domainName ||
        !expiryDate
      ) {

        throw new Error(
          "Missing domain or expiry"
        );

      }

      return {

        domainName,

        expiryDate

      };

    }

    catch (error) {

      console.error(
        "SSL Parse Error:",
        error.message
      );

      return null;

    }

};