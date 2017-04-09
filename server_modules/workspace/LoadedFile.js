"use strict";

const fs = require("fs");

class LoadedFile
{
  constructor(fileObject, lines)
  {
    const self = this;
    Object.defineProperties(self,
    {
      fileObject:
      {
        value: fileObject
      },
      lines:
      {
        value: lines
      },
      connections:
      {
        value: new Map()
      }
    });
  }
}

function generate(fileObject)
{
  return new Promise(function(resolve, reject)
  {
    fs.readFile(fileObject.path, function(err, data)
    {
      if (err)
      {
        reject(err);
      }
      const lines = data.toString().split("\n");
      const loadedFile = new LoadedFile(fileObject, lines);
      resolve(loadedFile);
    });

  });
}

module.exports = {
  Class: LoadedFile,
  generate: generate
};
