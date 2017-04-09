"use strict";
var helloworld = "Hello World";

const myfunction = function myfunction()
{
  return 0;
};

const textArea = document.querySelector("div.text-area");
console.log(textArea);
textArea.addEventListener("click", function(e){
var range;
var textNode;
var offset;

if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    textNode = range.startContainer;
    offset = range.startOffset;
  }
// do whatever you want here!
 if (textNode.nodeType == 3) {
    var replacement = textNode.splitText(offset);
    var br = document.createElement('span');
    br.classList.add("cursor");
    var div = document.createElement("div");
    br.appendChild(div);
    textNode.parentNode.insertBefore(br, replacement);
}
	});

  window.onload = function (){
  document.getElementsByClassName("cursor").remove();
}
//console.log(helloworld, myfunction());
