import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const createToken = (_id) => {
   return jwt.sign({_id},process.env.SECRET, {expiresIn: '3d'})
}

//login user
export const loginUser = async (req, res) => {

    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
    
        const token = createToken(user._id);
    
        res.status(200).json({
          message: "User logedin successfully",
          email,
          token 
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

//signup user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      message: "User created successfully",
      email,
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
