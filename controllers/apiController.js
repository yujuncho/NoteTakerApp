const store = require("../db/store");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

module.exports = app => {
  app.get("/api/notes", (req, res) => {
    store.getNotes().then(allNotes => {
      res.json(allNotes);
    });
  });

  app.post("/api/notes", jsonParser, (req, res) => {
    store.addNote(req.body).then(newNote => {
      console.log(`Added: ${newNote.title}`);
      // Update response to 201
      res.json(newNote);
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    store.removeNote(req.params.id).then(() => {
      console.log(`Deleted ${req.params.id}`);
      res.send("Deleted note");
    });
  });
};
