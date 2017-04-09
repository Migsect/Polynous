"use strict";

/* Modules */
const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");

/* Data Models */
const DirectoryItem = require("./DirectoryItem").Class;

class File extends DirectoryItem
{
  constructor(path, name, id)
  {
    super("file", path, name, id);
    const self = this;
    Object.defineProperties(self,
    {});
  }
}

function generate(source, name)
{
  const id = uuid();
  return new File(source, name, id);
}

module.exports = {
  Class: File,
  generate: generate
};
