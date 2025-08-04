import nodemailer from "nodemailer";
import reservation from "../modal/reservationSchema.js"; // ✅ now works
import ErrorHandler from "../error/error.js";

export const sendReservation = async (req, res, next) => {
  console.log("✅ Route hit successfully");
  console.log("Form Data:", req.body);

  const { firstName,  phone,message} = req.body||{};

  if (!firstName || !phone || !message) {
    return next(new ErrorHandler("Please fill the full reservation form", 400));
  }

  try {
    // Save to DB
    await reservation.create({ firstName, phone, message });

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL,
      subject: 'New Enquiry Recieved',
      html: `
        <h3>New Reservation Details</h3>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
       <h4>Sabeer Tour Travel</h4>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    return next(error);
  }
};
