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

  handleCommand(connection, command, callback)
  {
    const self = this;

    const type = command.command;
    const data = command.data;

    switch (type)
    {
      case "populate":
        self.commandPopulate(connection, data, callback);
        break;
      case "fetch":
        self.commandFetch(connection, data, callback);
        break;
      case "abandon":
        self.commandAbandon(connection, data, callback);
        break;
      default:
        callback(false);
    }
  }

  commandPopulate(connection, data, callback)
    {
      const self = this;
      const id = data.id;
      const workspace = self.workspaces.get(id);
      if (workspace === undefined)
      {
        callback(false);
      }
      callback(workspace.structure);
    }
    /**
     * Abandon the current file (removes the user from the connection.)
     * Client side should also remove the file from any view.
     */
  commandAbandon(connection, data, callback)
  {

  }
  commandFetch(connection, data, callback)
  {
    const self = this;
    const id = data.id;
    const workspace = self.workspaces.get(id);
    if (workspace === undefined)
    {
      callback(false);
    }
    const fileId = data.fileId;
    const file = workspace.files.get(fileId);
    if (file === undefined)
    {
      callback(false);
    }
    workspace.loadFile(fileId).then(function(loadedFile)
    {
      callback(loadedFile.lines);
    }).catch(function()
    {
      callback(false);
    });

  }

}

module.exports = new WorkspaceManager();
ConnectionManager.addCommandHandler("editor", module.exports);
