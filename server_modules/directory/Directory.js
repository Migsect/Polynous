"use strict";

/* Modules */
const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");

/* Data Models */
const generateFile = require("./File").generate;
const DirectoryItem = require("./DirectoryItem").Class;

class Directory extends DirectoryItem
{
  constructor(path, name, id, items)
  {
    super("directory", path, name, id);
    const self = this;
    Object.defineProperties(self,
    {
      items:
      {
        enumerable: true,
        value: items
      }
    });
  }

  getFileList()
  {
    const self = this;
    let fileList = [];
    self.items.forEach(function(item)
    {
      if (item.type === "directory")
      {
        fileList = fileList.concat(item.getFileList());
      }
      else
      {
        fileList.push(item);
      }
    });
    return fileList;
  }

}

function generate(source, name)
{
  const id = uuid();
  const itemList = fs.readdirSync(source);
  const items = itemList.map(function(item)
  {
    const itemPath = path.join(source, item);
    const itemStat = fs.statSync(itemPath);
    if (itemStat.isFile())
    {
      return generateFile(itemPath, item);
    }
    else
    {
      return generate(itemPath, item);
    }
  });

  return new Directory(source, name, id, items);
}

module.exports = {
  Class: Directory,
  generate: generate
};
