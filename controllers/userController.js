const User = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const Profile = require("../models/profileSchema")
const Product = require("../models/productSchema")


const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    const profilePicture = req.file


    if (fullName !== "" && email !== "" && password !== "") {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "User already exists!" });
      }

      const profile = await Profile.create({
        bio,
        profilePicture
      })

      const user = await User.create({
        fullName,
        email,
        password,
        profile: profile?._id
      });

      res.status(201).json({
        message: "User  with profile created successfully!",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          profile
        },
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "All fields are required!" });
    }
  } catch (err) {
    console.error(`An error has occurred: ${err.message}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};


const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne( { email })

        if(!user) {
            return res.status(400).json({ message: 'User does not exist!'})
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' })
        }

        res.status(200).json({
            message: 'Login successful!',
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            },
            token: generateToken(user._id)
        })
    }catch(err){
        console.error(`An error has occurred: ${err.message}`)
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = { registerUser, loginUser };



// router.post("/upload/profile/:id", upload.single("profilePicture"), uploadProfilePicture);

// router.post("/upload/products/:id", upload.array("products", 5), uploadProducts);