import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "Message Must Contain At Least 10 Characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
