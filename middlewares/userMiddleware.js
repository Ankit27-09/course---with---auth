const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
    // Implement the user auth logic
    // You need to check the headers and validate and user from the admin DB

    const token = req.headers.authorization;
    // token will be like:-- Bearer asddghghklkytrsdfg
    const words = token.split(" ");
    const jwtToken = words[1];

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    // the jwt token contains the decrepted the username and password
    // so we have to encrypt by decodedvalue.username
    if (decodedValue.username) {
        req.username = decodedValue.username;
        next();
    }
    else {
        res.status(403).json({
            msg: "You are not authenticated",
        })
    }
}   


module.exports = userMiddleware