import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, 
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    maxLength: [12, "First Name Must Contain max 12 Characters!"],
    validate: {
      validator: function(value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "Name is not valid!"
    }
  },
  lastName: {
    type: String,
    required: true, 
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    maxLength: [12, "Last Name Must Contain max 12 Characters!"],
    validate: {
      validator: function(value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: " Last Name is not valid!"
    }
  },
  email: {
    type: String,
    required: true, 
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true, 
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "NIC Must Contain Only 13 Digits!"],
    maxLength: [13, "NIC Must Contain Only 13 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required !"],
    validate: {
      validator: function(value) {
        const currentDate = new Date();
        return value < currentDate;
      },
      message: "please fill valid date of birth!"
    }
    },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment:{
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
export const User = mongoose.model("User", userSchema);
