const User = require('../models/User');
const { UserInputError } = require("apollo-server");
const {validateRegisterInput, validateLoginInput} = require("../utils/validators")

function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
        }
    )
}
module.exports = {
    Mutation: {
        async register(parent, {registerInput: {username, email, password, confirmPassword}}, context, info) {
            const {valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid) {
                throw new UserInputError("Errors", {errors})
            }
            const checkUser = await User.findOne({username});
            // password = await bcrypt.hash(password, 12);
            if(checkUser) {
                throw new UserInputError("User name taken", {
                    errors: {
                        username: "This user is already taken"
                    }
                })
            }
            const newUser = new User({
                email,
                username,
                password, 
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            // const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id, 
            }
        },
        async login(parent, {username, password}) {
            const { errors, valid } = validateLoginInput(username, password);
            if(!valid) {
                throw new UserInputError("Errors", {errors})
            }
            const checkUser = await User.findOne({username});
            if(!checkUser) {
                errors.general = "User not found";
                throw new UserInputError("Wrong credentials", {errors});
            }
            const match = await bcrypt.compare(password, checkUser.password);
            if(!match) {
                errors.general = "Wrong credentails"
                throw new UserInputError("Wrong credentials", {errors});
            }
            // const token = generateToken(checkUser);
            return {
                ...res._doc,
                id: res._id, 
            }

        }
    }   
}