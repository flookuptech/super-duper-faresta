require("dotenv").config();

module.exports = function () {
  // Check if the jwt private key is set or not
  if (!process.env.FAR_JWT_PRIVATEKEY) {
    throw new Error("FATAL ERROR: Set FAR_JWT_PRIVATEKEY.");
  }

  // Check if the email account password is set or not
  if (!process.env.FAR_MAIL_PASSWORD) {
    throw new Error(
      "FATAL ERROR: Set FAR_MAIL_PASSWORD emailing account password (tech@flookup.com). "
    );
  }

  // Check if the database password is set or not
  if (!process.env.FAR_DB_PASSWORD) {
    throw new Error(
      "FATAL ERROR: Set FAR_DB_PASSWORD password (tech@flookup.com). "
    );
  }

  if (!process.env.FAR_AWS_ACCESSKEY_ID) {
    throw new Error("FATAL ERROR: Set FAR_AWS_ACCESSKEY_ID. ");
  }

  if (!process.env.FAR_AWS_SECRETKEY) {
    throw new Error("FATAL ERROR: Set FAR_AWS_SECRETKEY. ");
  }
};
