const winston = require("winston");
// require("winston-mongodb");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
    }),
    new winston.transports.File({ filename: "exceptions.log" })
  );
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // winston.add(new winston.transports.MongoDB({ db: "link" }));

  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex).on("finish", () => {
  //     throw ex;
  //   });
  // });

  // process.on("unhandledRejection", (ex) => {
  //   winston.error(ex.message, ex).on("finish", () => {
  //     throw ex;
  //   });
  // });
};
