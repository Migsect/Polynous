"use strict";

const Logger = require(process.cwd() + "/server_modules/Logger");
const WorkspaceManager = require("../workspace/WorkspaceManager");
const ConnectionManager = require("../sockets/ConnectionManager");

class BrowserManager
{
  constructor()
  {

  }

  handleCommand(socket, command, callback)
  {
    const self = this;

    const type = command.command;
    const data = command.data;

    switch (type)
    {
      case "create":
        self.commandCreate(data, callback);
        break;
      case "list":
        self.commandList(data, callback);
        break;
      default:
        callback(false);
        break;
    }
  }

  /**
   * Returns a list of all the workspaces available
   */
  commandList(data, callback)
  {
    callback(Array.from(WorkspaceManager.workspaces.values()).map(function(workspace)
    {
      console.log("commandList item:", workspace);
      return {
        url: workspace.url,
        source: workspace.source
      };
    }));
  }

  /**
   * Creates a new workspace
   */
  commandCreate(data, callback)
  {
    const source = data.source.trim();
    if (!source)
    {
      callback(false);
    }
    WorkspaceManager.createWorkspace(source).then(function(workspace)
    {
      callback(workspace.url);
    }).catch(function()
    {
      callback(false);
    });
  }
}

module.exports = new BrowserManager();
ConnectionManager.addCommandHandler("browser", module.exports);
