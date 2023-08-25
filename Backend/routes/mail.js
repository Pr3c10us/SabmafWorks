const router = require("express").Router();

const {
    contactFormMail
} = require("../controller/mail");

router.route("/contactForm").post(contactFormMail);

module.exports = router;
