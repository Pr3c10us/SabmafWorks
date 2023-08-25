const { ForbiddenError, NotFoundError, BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const adminSignup = async (req, res) => {
    // check if balance field is filled
    if (req.body.emailVerified) {
        throw new ForbiddenError("Forbidden field - emailVerified");
    }

    // check if email exist in db
    const emailExist = await Admin.findOne({
        email: req.body.email,
    });
    if (emailExist) {
        throw new BadRequestError("Email already exists, Try another");
    }

    // hash password and pin
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // create admin
    const admin = await Admin.create(req.body);

    // create payload for jwt
    const payload = { id: admin._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1m",
    });

    res
    // .cookie("adminToken", token, {
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: false,
    //     // secure: true,
    //     signed: true,
    //     // sameSite: 'none',
    //     // domain: 'https://p-pay-pr3c10us.vercel.app',
    // })
    .json({
        msg: "Signup Successful",
    });
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        throw new BadRequestError("Please provide your email and password");
    }

    // get admin info of provided email
    const admin = await Admin.findOne({
        $or: [{ email: email }, { phone: email }],
    });

    // check if admin exist
    if (!admin) {
        throw new NotFoundError("admin does not exist");
    }

    // check if password match
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new BadRequestError("The password you entered is incorrect");
    }

    // create payload for jwt
    const payload = { id: admin._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res
    // .
    // cookie("adminToken", token, {
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: false,
    //     // secure: true,
    //     signed: true,
    //     // sameSite: 'none',
    //     // domain: 'https://p-pay-pr3c10us.vercel.app',
    // })
    .json({
        msg: "Login Successful",
        token,
    });
};

const adminLogout = async (req, res) => {
    res.cookie("adminToken", "", {
        expires: new Date(Date.now() + 1000),
    }).json({ msg: "Successfully Logged Out!!!" });
};

const adminForgotPassword = async (req, res) => {
    res.send("admin forgot password");
};

const adminResetPassword = async (req, res) => {
    res.send("admin reset password");
};

module.exports = {
    adminSignup,
    adminLogin,
    adminLogout,
    adminForgotPassword,
    adminResetPassword,
};
