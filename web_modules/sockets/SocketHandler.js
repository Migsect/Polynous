"use strict";

class SocketHandler
{
  constructor(socket)
  {
    const self = this;
    Object.defineProperties(self,
    {
      socket:
      {
        value: socket
      },
      handlers:
      {
        value: new Map()
      }
    });

    socket.on("update", function(message)
    {
      self.onUpdate(message);
    });
  }

  sendCommand(command, data, callback)
  {
    const self = this;
    self.socket.emit("command",
    {
      command: command,
      data: data
    }, callback ? callback : null);
  }

  addHandler(type, handler)
  {
    const self = this;
    if (!self.handlers.has(type))
    {
      self.handlers.set(type, []);
    }
    const handlerList = self.handlers.get(type);
    handlerList.push(handler);
  }

  onUpdate(event)
  {
    const self = this;
    if (!self.handlers.has(event.type))
    {
      return;
    }
    const handlerlist = self.handlers.get(event.type);
    handlerlist.forEach(function(handler)
    {
      handler(event.data);
    });
  }

  /**
   * Registers the socket handler as a specific type, this allows the handler
   * to recieve certain messages or use certain kinds of commands.
   */
  register(clientType)
  {
    const self = this;
    return new Promise(function(resolve, reject)
    {
      self.socket.emit("register", clientType, function(result)
      {
        if (result)
        {
          resolve();
          return;
        }
        else
        {
          reject();
        }
      });
    });
  }
}

module.exports = SocketHandler;
