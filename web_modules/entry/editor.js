"use strict";

const Utils = require("../Utils");

const $ = document.querySelector.bind(document);
const $$ = Utils.querySelectorAll;

const Workspace = require("../workspace/Workspace");

const testDirectory = {
  type: "directory",
  id: "poop",
  name: "Allpha",
  items: [
  {
    type: "file",
    id: "f1",
    name: "FUCK"
  },
  {
    type: "file",
    id: "f2",
    name: "THIS"
  },
  {
    type: "directory",
    id: "poop",
    name: "Beeta",
    items: [
      {
        type: "file",
        id: "f1",
        name: "FUCK"
      },
      {
        type: "file",
        id: "f2",
        name: "THIS"
      },

      {
        type: "file",
        id: "f3",
        name: "BITCH"
      }
    ]
  },
  {
    type: "file",
    id: "f3",
    name: "BITCH"
  }]
}

const projectPanel = $("div.project-panel");

const workspace = new Workspace(testDirectory);

const directoryElements = workspace.generateElements();
console.log(directoryElements)
directoryElements.forEach(function(item)
{
  projectPanel.appendChild(item);
});
