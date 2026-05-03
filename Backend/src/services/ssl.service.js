import forge from "node-forge";
import fs from "fs";

export const parseCertificate =
  (filePath) => {

    const certPem =
      fs.readFileSync(
        filePath,
        "utf8"
      );

    const cert =
      forge.pki
        .certificateFromPem(certPem);

    const expiryDate =
      cert.validity.notAfter;

    const subject =
      cert.subject.attributes;

    const domainField =
      subject.find(
        attr =>
          attr.name === "commonName"
      );

    const domainName =
      domainField?.value;

    return {

      expiryDate,
      domainName

    };

};