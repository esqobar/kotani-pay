const { StatusCodes } = require("http-status-codes");
const User = require('../models/user')
const { BadRequestError,UnauthenticatedError } = require('../errors')

const Register = async (req, res) => {

    const user = await User.create({ ...req.body })
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({ user: {phoneNumber: user.phoneNumber}, token })
}

const Login = async (req, res) => {
    const { phoneNumber, password } = req.body
    if(!phoneNumber || !password){
        throw new BadRequestError('Please provide Phone Number and password !')
    }
    const user = await User.findOne( { phoneNumber } )
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials !')
    }

    //comparing password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials !')
    }

    //passing the password we get from the user
    const token = user.createJwt()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    Register, Login
}