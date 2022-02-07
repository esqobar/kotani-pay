const express = require('express')
const { Login, Register } = require("../controllers/auth");

const router = express.Router()

router.post('/login', Login)
router.post('/kyc/user/create', Register)

module.exports = router