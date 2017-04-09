"use strict";

const Utils = {};
Object.defineProperties(Utils,
{
  convertNodeListToArray:
  {
    /**
     * The node list to convert to an array of nodes
     * @param  {NodeList} nodeList The node list
     * @return {Node[]}           The converted array of nodes
     */
    value: function(nodeList)
    {
      return Array.prototype.slice.call(nodeList, 0);
    }
  },
  querySelectorAll:
  {
    /**
     * Does a document.querySelectorAll but makes it into a standard array instead of
     * a node list making it better to work with.
     * 
     * @param  {String} queryString The query String
     * @return {HTMLElement[]}      A list of the html elements
     */
    value: function(queryString)
    {
      return Utils.convertNodeListToArray(document.querySelectorAll(queryString));
    }
  },
  sendPostRequest:
  {
    /**
     * Sends a post request with the json as the data to the specified URL
     * 
     * @param  {String} url  The URL to send the post to
     * @param  {Json} json A json object to send
     * @return {XMLHttpRequest}      The requuest that was sent
     */
    value: function(url, json)
    {
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8; charset=UTF-8');
      request.send(JSON.stringify(json));
      return request;
    }
  },
  getParameterByName:
  {
    /**
     * Retrieves the value of a paramter in a URL.
     * 
     * @param  {String} name The name of the parameter to extract.
     * @param  {String} url  The url to extract the paremter from.
     * @return {String}      The parameter's value.
     */
    value: function(name, url)
    {
      if (!url)
      {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var results = regex.exec(url);
      if (!results)
      {
        return null;
      }
      if (!results[2])
      {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  },
  htmlToElement:
  {
    /**
     * Converts an HTML string into a DOM node.
     * Mostly meant to be used with templates.
     * 
     * @param  {String} html The html string to covnert to a node.
     * @return {DOMNode}     The resulting node from the string.
     */
    value: function(html)
    {
      var template = document.createElement("template");
      template.innerHTML = html;
      return template.content.firstChild;
    }
  },
  escapeHTML:
  {
    value: function(str)
    {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    }
  }
});

module.exports = Utils;
