"use strict";

const express = require("express");
const router = express.Router();
const WorkspaceManager = require("../server_modules/workspace/WorkspaceManager");

/* GET home page. */
router.get("/:id", function(req, res)
{
  if (WorkspaceManager.workspaces.has(req.params.id))
  {
    res.render("editor");
  }
  else
  {
    res.redirect("/");
  }
});

module.exports = router;
