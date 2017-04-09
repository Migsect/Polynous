"use strict";

class DirectoryItem
{
  constructor(type, path, name, id)
  {
    const self = this;
    Object.defineProperties(self,
    {
      path:
      {
        enumerable: true,
        value: path
      },
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

module.exports = {
  Class: DirectoryItem
};
