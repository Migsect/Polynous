"use strict";

const uuid = require("uuid/v4");

class Connection
{
  constructor(socket, clientType)
  {
    const self = this;
    Object.defineProperties(self,
    {
      id:
      {
        enumerable: true,
        value: uuid()
      },
      type:
      {
        enumerable: true,
        value: clientType
      },
      socket:
      {
        value: socket
      }
    });

  }
}

module.exports = Connection;
