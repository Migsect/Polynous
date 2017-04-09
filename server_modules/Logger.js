"use strict";

const winston = require("winston");

const config = require(process.cwd() + "/config/config");

const Logger = new(winston.Logger)(
{
  transports: [
    new(winston.transports.Console)(
    {
      colorize: true,
      level: typeof config.logging.level === undefined ? "error" : config.logging.level,
      timestamp: function()
      {
        const date = new Date();
        return "[" + ("0" + date.getHours()).slice(-2) + ":" +
          ("0" + date.getMinutes()).slice(-2) + ":" +
          ("0" + date.getSeconds()).slice(-2) + "]";
      }
    })
  ]
});

module.exports = Logger;
