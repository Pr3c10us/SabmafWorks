// convertToArray.js
const convertToArray = (key) => {
    return (req, res, next) => {
        if (req.body[key]) {
            if (!Array.isArray(req.body[key])) {
                req.body[key] = [req.body[key]]; // Convert single value to an array
            }
        } else {
            req.body[key] = []; // Create an empty array if the key is not present
        }
        next();
    };
};

module.exports = convertToArray;
