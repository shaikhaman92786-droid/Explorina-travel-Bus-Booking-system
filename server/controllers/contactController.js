const userSendMail = require('../userSendMail');
const ContactUs = require('../model/ContactUs');

exports.contact = async (req, res) => {
  try {
    const { Name, Email, Message } = req.body;

     // Save into DB
    const newContact = new ContactUs({
      Name,
      Email,
      Message
    });
    await newContact.save();

    await userSendMail(Name, Email, Message);

    res.status(200).json({
      message: "Message sent successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message || "Server Error"
    });
  }
};