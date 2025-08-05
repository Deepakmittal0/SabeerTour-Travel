// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { dbConnection } from "./database/dbConnection.js";
// import { errorMiddleWare } from "./error/error.js";
// import reservationRouter from "./routes/reservationRoute.js";

// const app = express();

// // ✅ Load .env config
// dotenv.config({ path: "./Confiq/Config.env" });

// // ✅ Setup CORS to allow frontend requests
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL], // example: http://localhost:3000
//     methods: ["POST","GET","PUT","DELETE","PATCH"],
//     credentials: true,
//   })
// );

// // ✅ Parse incoming JSON & form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Connect MongoDB
// dbConnection();

// // ✅ Reservation Route
// app.use("/api/v1/Sabeer", reservationRouter);

// // ✅ Error Middleware
// app.use(errorMiddleWare);

// // ✅ Optional test route (health check)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// export default app;



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleWare } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();

// ✅ Load .env config
dotenv.config({ path: "./Confiq/Config.env" });

// ✅ Print to verify .env is working
console.log("Allowed frontend URL:", process.env.FRONTEND_URL);

// ✅ Setup CORS to allow frontend requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // fallback for safety
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ✅ Allow preflight requests for all routes
app.options("*", cors());

// ✅ Parse incoming JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect MongoDB
dbConnection();

// ✅ Routes
app.use("/api/v1/Sabeer", reservationRouter);

// ✅ Error Middleware
app.use(errorMiddleWare);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
