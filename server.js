const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const presentationRoutes = require("./routes/presentationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/presentations", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use("/presentations", presentationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
