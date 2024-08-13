const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const presentationRoutes = require("./routes/presentationRoutes");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Set a default value for NODE_ENV if not set
const NODE_ENV = process.env.NODE_ENV || "development";

const getMongoURI = () => {
  console.log(`NODE_ENV is: ${NODE_ENV}`); // Log the environment

  switch (NODE_ENV) {
    case "development":
      return process.env.MONGO_URI_DEV;
    case "test":
      return process.env.MONGO_URI_TEST;
    case "production":
      return process.env.MONGO_URI_PROD;
    default:
      throw new Error(`Unknown NODE_ENV: ${NODE_ENV}`);
  }
};

const mongoURI = getMongoURI();
console.log(`MongoDB URI is: ${mongoURI}`); // Log the MongoDB URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB connected in ${NODE_ENV} mode`))
  .catch((err) => console.log(err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use("/presentations", presentationRoutes);

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`)
);
