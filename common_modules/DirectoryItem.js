"use strict";

class DirectoryItem
{
  constructor(type, name, id)
  {
    const self = this;
    Object.defineProperties(self,
    {
      name:
      {
        enumerable: true,
        value: name
      },
      id:
      {
        enumerable: true,
        value: id
      },
      type:
      {
        enumerable: true,
        value: type
      }
    });
  }

}

module.exports = DirectoryItem;
