const { AuthenticationError} = require('apollo-server');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    const authHeader = context.req.header.authorization;
    if(authHeader) {
        const tokn = authHeader.split(' ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user
            } catch(err) {
                throw new AuthenticationError("Invalid Token");
            }
        }
        throw new Error("Invalid Token")
    }
    throw new Error("Invalid Token")
}