"use strict";

const Logger = require(process.cwd() + "/server_modules/Logger");
const ConnectionManager = require("../sockets/ConnectionManager");
const Workspace = require("./Workspace");

class WorkspaceManager
{
  constructor()
  {
    const self = this;
    Object.defineProperties(self,
    {
      workspaces:
      {
        value: new Map()
      }
    });
  }

  createWorkspace(source)
  {
    const self = this;
    return new Promise(function(resolve, reject)
    {
      Workspace.generateWorkspace(source).then(function(workspace)
      {
        self.workspaces.set(workspace.id, workspace);
        Logger.debug("Created workspace for:", source);
        resolve(workspace);
      }).catch(function()
      {
        reject();
      });
    });
  }

  handleCommand(socket, command, callback)
  {
    const self = this;

    const type = command.command;
    const data = command.data;

    switch (type)
    {
      case "populate":
        self.commandPopulate(data, callback);
        break;
      default:
        callback(false);
    }
  }

  commandPopulate(data, callback)
  {
    const self = this;
    const id = data.id;
    const workspace = self.workspaces.get(id);
    if (!workspace)
    {
      callback(false);
    }
    callback(workspace.structure);
  }

}

module.exports = new WorkspaceManager();
ConnectionManager.addCommandHandler("editor", module.exports);
