const User = require("../Model/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleUserRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.jwt_secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { handleLoginUser, handleUserRegister };
