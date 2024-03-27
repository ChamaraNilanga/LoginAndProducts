const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const userRoutes = require("./src/Routes/UserRoutes");
const productRoutes = require("./src/Routes/ProductRoutes");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("trust proxy", true);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
    "Content-Type: multipart/form-data"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  // Pass to next layer of middleware
  next();
});

app.set('trust proxy', true);
require("./src/dbConfig/initDB")()

// Use multer for handling form data
// app.use(upload.array()); 

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);

app.listen(process.env.PORT || 8000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 8000))
});
