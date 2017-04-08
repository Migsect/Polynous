"use strict";

/**
 * Used to load and have a single reference to all templates.
 */

const logger = require(process.cwd() + "/modules/Logger");

const fs = require("fs");
const handlebars = require("handlebars");

/** @type {Map} Mapping of file locations to compiled templates of those files */
var compiled = new Map();

/**
 * Compiles a template File.
 * Caches all compiled files.
 * 
 * @param  {String} path The path of the template file.
 * @return {Object}      A Compiled template.
 */
const compileTemplate = function compileTemplate(path)
{
  if (compiled.has(path))
  {
    return compiled.get(path);
  }
  const file = fs.readFileSync(__dirname + "/" + path + ".html", "utf-8");
  logger.debug("Compiling Template '" + __dirname + "/" + path + "'");

  const fileCompiled = handlebars.compile(file);
  compiled.set(path, fileCompiled);

  return fileCompiled;
};

/** @type {Map} Mapping of file locations to precompiled templates of those files */
const precompiled = new Map();
/**
 * Precompiles a template file.
 * Caches all precompiled files.
 * 
 * @param  {String} path The path of the template file.
 * @return {Object}      The precompiled template.
 */
const precompileTemplate = function precompileTemplate(path)
{
  if (precompiled.has(path))
  {
    return precompiled.get(path);
  }
  const file = fs.readFileSync(__dirname + "/" + path + ".html", "utf-8");
  logger.debug("Precompiling Template '" + __dirname + "/" + path + "'");

  const fileCompiled = handlebars.precompile(file);
  compiled.set(path, fileCompiled);

  return fileCompiled;
};

module.exports = compileTemplate;
Object.defineProperties(module.exports,
{
  precompile: precompileTemplate,
  compile: compileTemplate
});
