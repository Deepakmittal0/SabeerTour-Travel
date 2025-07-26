import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must contain at least 3 characters!"],
    maxlength: [30, "First name cannot exceed 30 characters!"]
  },
 

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number must be at least 10 digits!"],
    maxlength: [11, "Phone number cannot exceed 11 digits!"]
  },
 message: {
    type: String,
    required: [true],
    minlength: [3, "Last name must contain at least 3 characters!"],
    maxlength: [30, "Last name cannot exceed 30 characters!"]
  },
});

const Reservation = mongoose.model("reservation", reservationSchema);
export default Reservation;
