import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../app.js";


//register api
export const createUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    //basic validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: `All fields are required to be filled` });
    }

    //checking if user already has account
    const checkExistingUser = await UserModel.findOne({ email });
    if (checkExistingUser) {
      return res.status(409).json({ success: false, message: `User already has an acoount, please login to proceed further` });
    }


    // hashing password for security reasons
    const hashedPassword = await bcrypt.hash(password, 10);


    // creating  user
    const user = await UserModel.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    user.password = undefined;
    return res.status(201).json({ success: true, message: `User registered successfully`, user });

  } catch (error) {
    return res.status(500).json({ error: `Error from createUser ${error.message}` });
  }
};


//login api
export const loggedInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //basic validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: `All fields are required to be filled` });
    }

    //checking user exist in database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: `User does not have an acoount, please register first to proceed further.` });
    }

    //comparing password with hashed password present in the database
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ success: false, message: `Invalid user credentials, please try again.` });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    //storing refreshtoken in cache
    client.set(user._id.toString(), refreshToken);

    user.password = undefined;
    return res.status(200).json({ success: true, message: `User logged in successfully`, accessToken, refreshToken, user });

  } catch (error) {
    return res.status(500).json({ error: `Error from loggedInUser ${error.message}` });
  }
};


//get api
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (!users) {
      return res.status(404).json({ success: false, message: `No users found`, });
    }
    return res.status(200).json({ success: true, message: "Fetched all users", count: users.length, users });
  } catch (error) {
    return res.status(500).json({ error: `Error from getUsers ${error.message}` });
  }
};



//update user
export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, mobile, password } = req.body;

    //check if user is authorized or not
    if (req.userId !== id) {
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    //check unique email
    if (email) {
      const checkExistingEmail = await UserModel.findOne({ email });
      if (checkExistingEmail) {
        return res.status(409).json({ success: false, message: "Email is already in use" });
      }
    }


    if (password) {
      //store hash password
      let hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
    }

    //query to perform updation
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name, email, mobile, password
        },
      },
      { new: true }
    );

    await user.save();
    return res.status(200).json({ success: true, message: "updated user successfully", user });
  } catch (error) {
    return res.status(500).json({ error: `Error from updateUsers ${error.message}` });
  }
};


//delete users
export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    //check if user is authorized or not
    if (req.userId !== id) {
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    //query to perform deletion
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    return res.status(200).json({ success: true, message: "user deleted successfully" });

  } catch (error) {
    return res.status(500).json({ error: `Error from deleteUsers ${error.message}` });
  }
};