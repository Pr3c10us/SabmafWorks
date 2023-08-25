const { BadRequestError } = require("../errors");
const emailClient = require("../azure/emailClient");
const contactMail = require("../utils/contactMail");

const contactFormMail = async (req, res) => {
    const { fullName, company, email, message } = req.body;
    if (!fullName || !company || !email || !message) {
        throw new BadRequestError("Provide all required information");
    }

    const emailMessage = {
        senderAddress:
            "SabMafworks@a2192ef3-e315-4ee2-9d82-4b9f941aa41d.azurecomm.net",
        content: {
            subject: "New Contact Form Submission",
            html: contactMail(fullName, company, email, message),
        },
        recipients: {
            to: [
                {
                    address: process.env.ADMIN_EMAIL_ADDRESS,
                    displayName: fullName,
                },
            ],
        },
    };

    const poller = await emailClient.beginSend(emailMessage);
    const response = await poller.pollUntilDone();
    
    // const messageId = ;
    if (response.id == null || response.error != null) {
        throw new BadRequestError("Failed to send mail");
    }

    res.json({ msg: "Submission Successful" });
};

module.exports = {
    contactFormMail,
};
