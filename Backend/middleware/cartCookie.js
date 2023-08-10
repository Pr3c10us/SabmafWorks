const mongoose = require("mongoose");
const Cart = require("../models/carts.js");

const getCartFromCookie = async (req, res, next) => {
    const { cart } = req.signedCookies;
    if (!cart) {
        return next();
    }

    if (!mongoose.isValidObjectId(cart)) {
        // if cart id is not valid then clear the cookie
        return res
            .status(400)
            .cookie("cart", "", {
                expires: new Date(Date.now() + 1000),
            })
            .json({
                msg: "Cart doesn't exist",
            });
    }

    const cartExist = await Cart.findById(cart);
    if (!cartExist) {
        // if cart doesn't exist in db then clear the cookie
        return res
            .status(400)
            .cookie("cart", "", {
                expires: new Date(Date.now() + 1000),
            })
            .json({
                msg: "Cart doesn't exist",
            });
    }

    req.cart = cartExist._id;

    next();
};

module.exports = getCartFromCookie;
