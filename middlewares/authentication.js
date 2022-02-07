const {UnauthenticatedError} = require("../errors");
const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    // checking the header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Invalid Authentication')
    }
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attaching the user to the job routes
        // const user = User.findById(payload.id).select('-password')
        // req.user = user

        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid Authentication')
    }
}

module.exports = auth