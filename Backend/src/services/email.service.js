import nodemailer from "nodemailer";

const senderEmail = "krishnachand.koley@cedge.in";

// SMTP configuration
const options = {
    host: "10.1.24.41",
    port: 25,
    secure: false, // No SSL/TLS
};

// Create mail transporter
const mailTransporter = nodemailer.createTransport(options);

// Function to send OTP email
export const sendEmail = async(subject,body,ssl) => {
    const mailOptions = {
        from: senderEmail,
        to: ssl.toEmails,
        cc:ssl.ccEmails,
        replyTo: ssl.replyToEmails,
        subject: subject,
        html:body ,
    };

   await mailTransporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending OTP email:", err);
        } else {
            console.log(" email sent successfully");
            console.log("Message ID:", info.messageId);
        }
    });
};


/* ================= SSL EXPIRY EMAIL ================= */

export const sendExpiryEmail =async (ssl) => {

    try {

      const subject =`SSL Expiry Alert - ${ssl.domainName}`;

      const body = `
  <h3>SSL Certificate Expiry Alert</h3>
  <p><strong>Bank:</strong> ${ssl.bankName}</p>
  <p><strong>Domain:</strong> ${ssl.domainName}</p>
  <p><strong>Expiry Date:</strong> ${ssl.expiryDate.toDateString()}</p>
  <p style="color:red;"><strong>This certificate will expire soon. Please renew it immediately.</strong></p>
`;

      
      /* Reuse existing function */

      const response=await sendEmail(subject,body,ssl);
     

    }

    catch (error) {

      console.error("SSL Email Error:",error);

    }

};