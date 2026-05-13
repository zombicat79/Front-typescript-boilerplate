require("dotenv").config();

const targetEnv = process.env.WEBPACK_ENV === "development"
  ? "development"
  : "production";

module.exports = targetEnv === "development"
  ? require("./webpack.config.dev")
  : require("./webpack.config.prod");
