"use strict";

const Utils = require("../Utils");
const directoryTemplate = require("./templates/directory.hbs");
const fileTemplate = require("./templates/file.hbs");

function generateDirectoryElement(directory, expandedLayers)
{
  const directoryElement = Utils.htmlToElement(directoryTemplate(
  {
    id: directory.id,
    name: directory.name
  }));
  const itemsElement = directoryElement.querySelector(".workspace-directory-items");
  if (expandedLayers <= 0)
  {
    itemsElement.classList.add("hidden");
  }

  const items = directory.items ? directory.items : [];
  items.forEach(function(item)
  {
    const type = item.type;
    let itemElement = null;
    if (type.toLowerCase() === "directory")
    {
      itemElement = generateDirectoryElement(item, expandedLayers - 1);
    }
    else
    {
      itemElement = Utils.htmlToElement(fileTemplate(item));
    }

    itemsElement.appendChild(itemElement);
  });

  const nameElement = directoryElement.querySelector(".workspace-directory-name");
  nameElement.addEventListener("click", function toggleDirectoryElement()
  {
    itemsElement.classList.toggle("hidden");
  });

  return directoryElement;

}

class Workspace
{
  constructor(socketHandler)
  {
    const self = this;
    Object.defineProperties(self,
    {
      id:
      {
        value: window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
      },
      socketHandler:
      {
        value: socketHandler
      },
      directory:
      {
        enumerable: true,
        writable: true,
        value: []
      },
      projectPanel:
      {
        value: document.querySelector(".project-panel")
      },
      editorPanel:
      {
        value: document.querySelector(".editor-panel")
      }
    });
  }

  populate()
  {
    const self = this;
    self.socketHandler.sendCommand("populate",
    {
      id: self.id
    }, function populateCallback(response)
    {
      console.log("populate:", response);
      self.directory = response;
      const elements = self.generateElements();
      Utils.convertNodeListToArray(self.projectPanel.querySelectorAll(".workspace-item")).forEach(function(node)
      {
        self.projectPanel.removeChild(node);
      });
      console.log(elements);
      self.projectPanel.appendChild(elements);
    });
  }

  generateElements()
  {
    const self = this;
    return generateDirectoryElement(self.directory, 1);
  }
}

module.exports = Workspace;
