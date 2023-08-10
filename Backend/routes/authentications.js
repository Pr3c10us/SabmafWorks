const router = require("express").Router();

const {
    adminSignup,
    adminLogin,
    adminLogout,
    adminForgotPassword,
    adminResetPassword,
} = require("../controller/authentications");

router.route("/admin/signup").post(adminSignup);
router.route("/admin/login").post(adminLogin);
router.route("/admin/logout").get(adminLogout);
router.route("/admin/forgotpassword").put(adminForgotPassword);
router.route("/admin/resetpassword").put(adminResetPassword);

module.exports = router;
