const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config();


 const userSendMail = async ( Name, Email, Message ) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_EMAIL_PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let mailOptions = {
  from: process.env.USER_EMAIL,
  to: process.env.USER_EMAIL,
  subject: "📩 New Contact Message - Explorina Travel",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      
      <h2 style="color: #2563eb; text-align: center;">New Contact Message</h2>
      
      <hr style="margin: 20px 0;" />

      <p><strong>Name:</strong> ${Name}</p>
      <p><strong>Email:</strong> ${Email}</p>
      
      <div style="margin-top: 15px;">
        <strong>Message:</strong>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${Message}
        </p>
      </div>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 12px; color: gray; text-align: center;">
        This message was sent from your website contact form.
      </p>
    </div>
  `
};

    await transporter.sendMail(mailOptions);
}

module.exports = userSendMail