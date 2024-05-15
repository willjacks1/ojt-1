import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
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
    maxLength: [12, "Last Name Must Contain max 12  Characters!"],
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
    required: [true, "DOB Is Required!"],
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
  appointment_date: {
    type: String,
    required: [true, "Appointment Date Is Required!"],
    validate: {
      validator: function(value) {
        const currentDate = new Date();
        const currentMilliseconds = currentDate.getTime();
  
        const appointmentDate = new Date(value);
  
        return appointmentDate.getTime() > currentMilliseconds;
      },
      message: "Appointment Date must be after the current date!"
    }
   
  },
  department: {
    type: String,
    required: [true, "Department Name Is Required!"],
  },
  doctor: {
    firstName: {
      type: String,
      required: [true, "Doctor Name Is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Doctor Name Is Required!"],
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "Address Is Required!"],
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Doctor Id Is Invalid!"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Patient Id Is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
