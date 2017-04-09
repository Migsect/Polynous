"use strict";

/* Modules */
const Utils = require("../Utils");
const SocketHandler = require("../sockets/SocketHandler");
const Workspace = require("../workspace/Workspace");

/* Query Selector shortener functions */
const $ = document.querySelector.bind(document);
const $$ = Utils.querySelectorAll;

/* socket handling*/
const socket = io();
const socketHandler = new SocketHandler(socket);

socket.emit("register", "editor", function connectionCallback()
{
  console.log("Successfully Registered");

  /* Creating the browser object */
  const workspace = new Workspace(socketHandler);
  workspace.populate();

  $("#command-panel-execute").addEventListener("click", function(event)
  {
    const lineIndex = $("#command-panel-line").value;
    const lineEdit = $("#command-panel-edit").value;
    console.log(lineIndex, lineEdit);

    workspace.edit(lineIndex, lineEdit);
  });
});
