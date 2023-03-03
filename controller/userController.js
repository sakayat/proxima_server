const User = require("../models/userModal");
const jwt = require("jsonwebtoken");

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// users
const getUsers = (req, res) => {
  res.json({ message: "users" });
};

module.exports = {
  loginUser,
  signupUser,
  getUsers,
};
