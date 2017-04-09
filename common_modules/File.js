"use strict";

const DirectoryItem = require("./DirectoryItem");

class File extends DirectoryItem
{
  constructor(name, id, lines)
  {
    super("file", name, id);
    const self = this;
    Object.defineProperties(self,
    {
      lines:
      {
        writable: false,
        value: lines
      }
    });
  }
}

module.exports = File;
