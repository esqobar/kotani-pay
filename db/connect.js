const mongoose = require('mongoose')

const dbConnection = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = dbConnection