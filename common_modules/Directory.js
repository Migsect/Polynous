"use strict";

class Directory
{
  constructor(name, id, items)
  {
    super("directory", name, id);
    const self = this;
    Object.defineProperties(self,
    {
      items:
      {
        value: items
      }
    });
  }

}

module.exports = Directory;
