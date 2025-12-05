
const express = require("express");
const { handleGetUser, handleAdminLogin } = require("../Controller/AdminController");
const checkAuth = require("../Middleware/checkAuth");

const router = express.Router();



router.get('/admin/all-user', checkAuth , handleGetUser)

router.post('/login', handleAdminLogin )



module.exports = router;