import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";  // Import cors using ES module syntax
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
// import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:5173' 
  }));
// app.use(fileUpload());


// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // specify the allowed origin
    credentials: true,               // allow cookies to be sent with the requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
};



app.use(cors(corsOptions));

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// };

// app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
