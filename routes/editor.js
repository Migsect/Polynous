"use strict";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/:id", function(req, res)
{
  res.render("editor");
});

module.exports = router;
