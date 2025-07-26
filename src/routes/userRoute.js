const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload')
const { protect } = require('../middleware/authMiddleware')



const { registerUser, loginUser, getAll, getSingleUser } = require("../controllers/userController");


router.post('/create-user', upload.single("profilePicture") ,registerUser)
router.post('/login-user', loginUser)
router.get('/all-users', getAll)
router.get('user/:id', protect,  getSingleUser)

module.exports = router;



  