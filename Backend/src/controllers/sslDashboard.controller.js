import SSLCertificate
from "../models/sslCertificate.model.js";

export const getAllSSL =
async (req, res) => {

  try {

    const sslList =
      await SSLCertificate.find()
      .sort({ expiryDate: 1 });

    const today =
      new Date();

    const updatedData =
      sslList.map(item => {

        const expiry =
          new Date(
            item.expiryDate
          );

        const diffTime =
          expiry - today;

        const daysRemaining =
          Math.ceil(
            diffTime /
            (1000 * 60 * 60 * 24)
          );

        /* Status */

        let status = "Valid";

        if (daysRemaining < 0)
          status = "Expired";

        else if (
          daysRemaining <= 30
        )
          status =
            "Expiring Soon";

        return {

          _id: item._id,

          bankName:
            item.bankName,

          domainName:
            item.domainName,

          expiryDate:
            item.expiryDate,

          daysRemaining,

          status

        };

      });

    res.json({

      success: true,
      data: updatedData

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        "Fetch Failed"

    });

  }

};