// Packages
const express = require("express");
const app = express();

require("./startup/logging")(); // Logging
require("./startup/config")(); // Check env var
require("./startup/routes")(app); // Routers
require("./startup/prod")(app); // Prod settings

// Port
const PORT = 5000;
app.listen(PORT, () => console.log(`Api app listening on port ${PORT}...`));

module.exports = app;
