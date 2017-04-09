"use strict";

/* Modules */
const Git = require("simple-git")();
const uuid = require("uuid/v4");
const path = require("path");
const Logger = require(process.cwd() + "/server_modules/Logger");

/* Data Models */
const directory = require(process.cwd() + "/server_modules/directory/Directory").generate;

/* Configuration options */
const saveDir = require(process.cwd() + "/config/config").saveDir;
const editorPath = "/editor/"

/**
 * Workspace handles git grabbing and stuff.
 */
class Workspace
{
  constructor(source)
  {
    const id = uuid();

    const self = this;
    Object.defineProperties(self,
    {
      id:
      {
        enumerable: true,
        value: id
      },
      source:
      {
        enumerable: true,
        value: source
      },
      location:
      {
        enumerable: true,
        get: function()
        {
          return path.join(saveDir, id);
        }
      },
      structure:
      {
        writable: true,
        enumerable: false,
        value:
        {}
      },
      url:
      {
        get: function()
        {
          return editorPath + id;
        }
      }
    });
  }

  regenerateDirectoryStructure()
  {
    const self = this;
    self.structure = directory(self.location, "/");
  }
}

module.exports = {
  generateWorkspace: function generateWorkSpace(source)
  {
    const workspace = new Workspace(source);
    return new Promise(function(resolve, reject)
    {
      Git.clone(workspace.source, workspace.location).then(function()
      {
        Logger.debug("Clone Completed!");
        workspace.regenerateDirectoryStructure();
        resolve(workspace);
      });
    });
  }
};
