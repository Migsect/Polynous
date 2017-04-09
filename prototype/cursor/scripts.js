"use strict";

var helloworld = "";

var string = "abc";

//1. Textarea
//2. Javascript to change cursor color
//3. When you type, use JS send current textarea content to server, update every second

const stringposition = function stringposition(str)
{
  //make the cursor move to the location of the click
  return ":)";

};

console.log(helloworld, myfunction());

const CURSOR_HTML = "<span class=\"cursor\"><div></div></span>";
class TextLine
{
  constructor(text)
  {
    const self = this;
    self.text = text;
    self.cursorLocation = -1;
  }

  addCharacter(character)
  {
    const self = this;
    // Add character at cursor location
    self.text = text.substring(0, cursorLocation) + character + text.substring(cursorLocation);
  }
  getText()
  {
    const self = this;
    // TODO add cursor
    return self.text;
  }
  getCursorIndex()
  {
    const self = this;
    return self.cursorLocation;
  }
  setCursorIndex(index)
  {
    const self = this;
    self.cursorLocation = index;
  }
}

const textArea = document.querySelector(".text-area");
console.log(textArea);

const textLine = new TextLine(textArea.innerHTML);
