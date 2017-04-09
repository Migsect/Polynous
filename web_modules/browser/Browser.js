"use strict";

const Utils = require("../Utils");

const workspaceItem = require("./templates/workspaceItem.hbs");

class Browser
{
  constructor(socketHandler)
  {
    const self = this;
    Object.defineProperties(self,
    {
      socketHandler:
      {
        value: socketHandler
      },
      listPanel:
      {
        value: document.querySelector(".workspace-list-panel")
      },
      workspaceSource:
      {
        value: document.querySelector("#workspace-source")
      },
      workspaceCreate:
      {
        value: document.querySelector("#workspace-create")
      }
    });
    self.workspaceCreate.addEventListener("click", function()
    {
      const source = self.workspaceSource.value.trim();
      if (source.length <= 0)
      {
        return;
      }
      self.socketHandler.sendCommand("create",
      {
        source: source
      }, function workspaceCreateCallback(response)
      {
        window.location.assign(response.url);
        console.log(url);
      });

    });
  }

  populate()
  {
    const self = this;
    self.socketHandler.sendCommand("list",
    {}, function(items)
    {
      items.forEach(function(item)
      {
        const url = item.url;
        const source = item.source;
        const element = Utils.htmlToElement(workspaceItem(
        {
          url: url,
          source: source
        }));
        self.listPanel.appendChild(element);
      });
    });
  }

}

module.exports = Browser;
