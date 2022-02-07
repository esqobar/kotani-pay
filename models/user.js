const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number must be provided']
    },
    countryCode: {
        type: String,
        required: [true, 'Country Code must be provided']
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        minLength: 6,
        // maxLength: 12,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJwt = function () {
    return jwt.sign({ userId: this._id, phoneNumber: this.phoneNumber }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)

