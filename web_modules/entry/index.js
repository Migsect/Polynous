"use strict";

/* Modules */
const Utils = require("../Utils");
const SocketHandler = require("../sockets/SocketHandler");
const Browser = require("../browser/Browser");

/* Query Selector shortener functions */
const $ = document.querySelector.bind(document);
const $$ = Utils.querySelectorAll;

/* socket handling*/
const socket = io();
const socketHandler = new SocketHandler(socket);
socket.emit("register", "browser", function connectionCallback()
{
  console.log("Successfully Registered");

  /* Creating the browser object */
  const browser = new Browser(socketHandler);
  browser.populate();
});
