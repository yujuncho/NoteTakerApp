const express = require("express");
const path = require("path");

module.exports = app => {
  app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
