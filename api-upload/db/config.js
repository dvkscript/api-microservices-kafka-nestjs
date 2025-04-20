require = require("esm")(module);
const path = require("path");

const envConfig = require(path.resolve(__dirname, "../dist/configs/env.config")).default;

module.exports = envConfig.db;