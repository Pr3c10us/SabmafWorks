// Import Modules
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");


const { BadRequestError, UnauthorizedError } = require("../errors");

const adminAuthorization = async (req, res, next) => {
    // check if auth header exist
    if (
        !req.headers ||
        !req.headers.authorization ||
        req.headers.authorization.split(" ")[0] !== "JWT"
    ) {
        throw new BadRequestError("Provide Auth header");
    }
    // get token from cookie and throw error if token is not present
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        throw new BadRequestError("Not authorized to access this route");
    }

    try {
        // get admin id from token
        const { id } = await jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(id);

        // if admin doesn't exist throw bad request error
        if (!admin) {
            throw new BadRequestError("admin Doesn't exist");
        }

        // add an admin object to api request to be used in controller logic
        req.admin = { id };

        next();
    } catch (error) {
        console.log(error);
        // if block failed throw unauthorized error
        throw new UnauthorizedError("Authorization failed");
    }
};
// export middleware
module.exports = { adminAuthorization };
