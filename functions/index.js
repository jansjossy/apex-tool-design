const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

// Define the secret for the Brevo API Key
const brevoKey = defineSecret("BREVO_KEY");

exports.sendInquiryEmail = onDocumentCreated(
  {
    document: "inquiries/{inquiryId}",
    secrets: [brevoKey], // Exposes the secret to this specific function execution
  },
  async (event) => {
    const data = event.data.data();
    if (!data) return;

    const { name, email, subject, message, attachmentUrl, attachmentName } = data;

    // Initialize the transporter inside the function so it can read the runtime secret
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // Port 587 uses STARTTLS
      auth: {
        user: "b9f24a001@smtp-brevo.com", // Your Brevo login
        pass: brevoKey.value(), // Securely access the secret value at runtime
      },
    });

    const mailOptions = {
      from: `"Apex Website Inquiry" <b9f24a001@smtp-brevo.com>`,
      to: "yourtooldesign@gmail.com", // The owner's inbox
      replyTo: email,
      subject: `New Inquiry: ${subject || "Website Form"} - from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4; padding:10px; border-left:3px solid #333;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
        ${
          attachmentUrl
            ? `<p><strong>Attachment:</strong> <a href="${attachmentUrl}" target="_blank">Download ${attachmentName || "Attached File"}</a></p>`
            : "<p><em>No attachment provided.</em></p>"
        }
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Inquiry email sent successfully for document: ${event.params.inquiryId}`);
    } catch (error) {
      console.error("Failed to send email via Brevo:", error);
    }
  }
);