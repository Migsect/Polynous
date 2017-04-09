"use strict";

const Logger = require(process.cwd() + "/server_modules/Logger");
const Connection = require("./Connection");

class SocketManager
{
  constructor()
  {
    const self = this;
    Object.defineProperties(self,
    {
      connections:
      {
        value: new Map()
      },
      commandHandlers:
      {
        value: new Map()
      }
    });
  }

  addCommandHandler(type, handler)
  {
    const self = this;
    self.commandHandlers.set(type, handler);
  }

  onConnection(socket)
  {
    const self = this;
    const id = socket.client.id;
    Logger.debug("connect:", id);
    socket.on("disconnect", function()
    {
      Logger.debug("disconnect:", id);
      self.onDisconnection(socket);
    });
    socket.on("command", function(command, callback)
    {
      Logger.debug("command:", id);
      self.onCommand(socket, command, callback);
    });
    socket.on("register", function(clientType, callback)
    {
      Logger.debug("register:", id);
      self.onRegister(socket, clientType, callback);
    });

  }
  onDisconnection(socket)
  {
    const self = this;
    const id = socket.client.id;
    self.connections.delete(id);
  }
  onCommand(socket, command, callback)
  {
    const self = this;
    const id = socket.client.id;

    /* Grabbing the connection */
    if (!self.connections.has(id))
    {
      callback(false);
      return;
    }
    const connection = self.connections.get(id);

    /* Grabbing the command handler */
    if (!self.commandHandlers.has(connection.type))
    {
      callback(false);
      return;
    }
    const commandHandler = self.commandHandlers.get(connection.type);
    commandHandler.handleCommand(socket, command, callback);
  }
  onRegister(socket, clientType, callback)
  {
    const self = this;
    const id = socket.client.id;
    const connection = new Connection(socket, clientType);
    Logger.debug("registered: ", id, "to", clientType);
    self.connections.set(id, connection);
    callback(true);
  }
}

module.exports = new SocketManager();
