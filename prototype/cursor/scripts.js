"use strict";
var moo = prompt('who');
var helloworld = "Hello World";

const myfunction = function myfunction()
{
  return 0;
};

const textArea = document.querySelector("div.text-area");
console.log(textArea);
textArea.addEventListener("click", function(event){
	textArea.innerHTML = "Aaron is a cool guy <3";
});
function insertBreakAtPoint(e) {

var range;
var textNode;
var offset;

if (document.caretPositionFromPoint) {    // standard
    range = document.caretPositionFromPoint(e.pageX, e.pageY);
    textNode = range.offsetNode;
    offset = range.offset;

} else if (document.caretRangeFromPoint) {    // WebKit
    range = document.caretRangeFromPoint(e.pageX, e.pageY);
    textNode = range.startContainer;
    offset = range.startOffset;
}
// do whatever you want here!
}
//console.log(helloworld, myfunction());
