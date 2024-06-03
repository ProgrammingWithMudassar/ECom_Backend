const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
// const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 5000;

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const colors = require('colors');
const mongoose = require('mongoose');

const authRouter = require("./router/user");
const productRouter = require("./router/product");
const ratingRoutes = require('./router/rating');
const reviewRoutes = require('./router/review');
const orderRoutes = require('./router/order');
const authRoutes = require('./router/auth');
const paymentRoutes = require('./router/payment');

mongoose.set('strictQuery', true);

// connection
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//api's rountes
app.use("/api/product", productRouter);
app.use("/api/user", authRouter);
app.use('/api/ratings', ratingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// app.use(notFound);
// app.use(errorHandler);


//server running port
app.listen(PORT, () => {
  console.log("===================================");
  console.log(`Server is running  at PORT ==> ${PORT}`.yellow.bold);
  console.log("===================================");
  console.log("|");
  console.log("|");
});


// module.exports = app; 
