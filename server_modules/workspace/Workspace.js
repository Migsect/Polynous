"use strict";

/* Modules */
const Git = require("simple-git")();
const uuid = require("uuid/v4");
const path = require("path");
const Logger = require(process.cwd() + "/server_modules/Logger");

/* Data Models */
const directory = require(process.cwd() + "/server_modules/directory/Directory").generate;
const generateLoadedFile = require("./LoadedFile").generate;

/* Configuration options */
const saveDir = require(process.cwd() + "/config/config").saveDir;
const baseURL = "/editor/";

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
      files:
      {
        writable: true,
        value: new Map()
      },
      loadedFiles:
      {
        writable: false,
        value: new Map()
      },
      url:
      {
        enumerable: true,
        get: function()
        {
          return baseURL + id;
        }
      }
    });
  }
  loadFile(id)
  {
    const self = this;
    return new Promise(function(resolve, reject)
    {
      if (self.loadedFiles.has(id))
      {
        resolve(self.loadedFiles.get(id));
      }

      const file = self.files.get(id);
      Logger.debug("loading file:", file.id);
      if (file === "undefined")
      {
        return reject();
      }

      generateLoadedFile(file).then(function(loadedFile)
      {
        self.loadedFiles.set(id, loadedFile);
        Logger.debug("loaded file:", loadedFile);
        resolve(loadedFile);
      }).catch(function()
      {
        reject();
      });

    });
  }
  regenerateDirectoryStructure()
  {
    const self = this;
    self.structure = directory(self.location, "/");
    self.files = new Map();
    self.structure.getFileList().forEach(function(item)
    {
      self.files.set(item.id, item);
    });
  }
}

module.exports = {
  generateWorkspace: function generateWorkSpace(source)
  {
    const workspace = new Workspace(source);
    return new Promise(function(resolve, reject)
    {
      Logger.debug("Cloning:", source);
      Git.clone(workspace.source, workspace.location).then(function()
      {
        workspace.regenerateDirectoryStructure();
        resolve(workspace);
      });

    });
  }
};
