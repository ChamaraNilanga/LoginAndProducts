const User = require("../Models/UserModal");
const { storage } = require("../dbConfig/cloudinary-config");
const multer = require("multer");
const upload = multer({ storage });
const cloudinary = require("../dbConfig/cloudinary-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtService = require("../Utils/JWTValidate");
// const bcrypt = require("bcrypt");

module.exports = {
  getUser: async (req) => {
    const {id} = req.params;
    try {
      const data = await User.findById(id);
      if (data) {
        return { data: data, statusCode: 200, success: true , message: "User found"};
      } else {
        return { success: false, message: "User not found" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
    
  },

  createUser: async (req) => {
    const { email,password,name,role,phone } = req.body;
    console.log(req.body);
    try {
      const existUser = await User.findOne({ email });
      if (existUser === null) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role:role!=null && role=="ADMIN" ? role : "USER",
            phone:phone
        });
        const data = await user.save();
        return { data: data, statusCode: 201, success: true };
      } else {
        return { success: false, message: "User already exists" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  userLogin: async (req) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return {
          data: user,
          statusCode: 400,
          success: false,
          message: "User not found",
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          data: user,
          statusCode: 401,
          success: false,
          message: "Authentication failed",
        };
      }
      const token = jwtService.createToken(user._id,user.role);
      return {
        token: token,
        statusCode: 200,
        success: true,
        message: "Login Success!",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserByID: async (id) => {
    const user = await User.findById(id);
    return user
}
};
