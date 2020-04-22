// Packages
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

//Local imports
const auth = require("./routes/auth");
const getUsers = require("./routes/getUsers");
const userStatus = require("./routes/userStatus");
const getAllTenants = require("./routes/getTenants");
const forgotPassword = require("./routes/forgotPassword");
const registerTenant = require("./routes/registerTenants");
const regsiterClient = require("./routes/registerClientUser");
const { dbUriFuncAuth } = require("./services/dbConnectionAuth/dbUri");

// Check if the jwt private key is set or not
if (!process.env.FAR_JWT_PRIVATEKEY) {
  console.log("FATAL ERROR: Set FAR_JWT_PRIVATEKEY.");
  process.exit(1);
}
if (!process.env.FAR_MAIL_PASSWORD) {
  console.log("FATAL ERROR: Set FAR_MAIL_PASSWORD.");
  process.exit(1);
}
if (!process.env.FAR_DB_PASSWORD) {
  console.log("FATAL ERROR: Set FAR_DB_PASSWORD.");
  process.exit(1);
}

// DB connection to authentication database
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const dbName = config.get("dbName");
const uri = dbUriFuncAuth(dbName);

mongoose
  .connect(uri)
  .then(() => console.log(`Connected to auth database..`))
  .catch((err) => console.log("Could not connect to auth database: ", err));

// Routes
app.use("/login", auth);
app.use("/getUsers", getUsers);
app.use("/userStatus", userStatus);
app.use("/register", registerTenant);
app.use("/forgotPassword", forgotPassword);
app.use("/getAllTenants", getAllTenants);
app.use("/regsiterClient", regsiterClient);

// Port
const PORT = 5001;
app.listen(PORT, () => console.log(`Auth app listening on port ${PORT}...`));

module.exports = app;
