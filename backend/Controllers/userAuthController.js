import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const securePassword = async (password) => {
  try {
    return await hash(password, 10);
  } catch (error) {
    console.error(error.message);
  }
};

export async function userRegistration(req, res) {
  try {
    const { name, email, password } = req.body;
    const secPassword = await securePassword(password);
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        alert: "Given email already exists, please login.",
        status: false,
      });
    }
    const user = new User({ name, email, password: secPassword });
    const userData = await user.save();
    const token = jwt.sign({ userId: userData._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.json({ userData, status: true, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "1h",
        });
        res.json({ userData: user, status: true, token });
      } else {
        res.json({ err: "pass", alert: "Incorrect password!" });
      }
    } else {
      res.json({
        err: "email",
        alert: "Account doesn't exist, please register.",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
