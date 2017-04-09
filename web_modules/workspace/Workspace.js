"use strict";

const Utils = require("../Utils");
const directoryTemplate = require("./templates/directory.hbs");
const fileTemplate = require("./templates/file.hbs");

function generateFileElement(file)
{
  return Utils.htmlToElement(fileTemplate(file));
}

function generateDirectoryElement(directory)
{
  const directoryElement = Utils.htmlToElement(directoryTemplate(
  {
    id: directory.id,
    name: directory.name
  }));
  const itemsElement = directoryElement.querySelector(".workspace-directory-items");
  console.log(itemsElement);

  const items = directory.items ? directory.items : [];
  items.forEach(function(item)
  {
    const type = item.type;
    let itemElement = null;
    if (type.toLowerCase() === "directory")
    {
      itemElement = generateDirectoryElement(item);
    }
    else
    {
      itemElement = generateFileElement(item);
    }
    itemsElement.appendChild(itemElement);
  });

  const nameElement = directoryElement.querySelector(".workspace-directory-name");
  nameElement.addEventListener("click", function toggleDirectoryElement()
  {
    itemsElement.classList.toggle("hidden")
  });

  return directoryElement

}

class Workspace
{
  constructor(directory)
  {
    const self = this;
    Object.defineProperties(self,
    {
      directories:
      {
        enumerable: true,
        value: [directory]
      }
    })
  }

  generateElements()
  {
    const self = this;
    const directoryElements = self.directories.map(function generateHTMLMapCallback(item)
    {
      return generateDirectoryElement(item);
    });
    return directoryElements;
  }
}

module.exports = Workspace;
