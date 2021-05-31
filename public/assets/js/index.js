let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// Show an element
const show = elem => {
  elem.style.display = "inline";
};

// Hide an element
const hide = elem => {
  elem.style.display = "none";
};

const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

const saveNote = note =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  });

// Delete Note
const deleteNote = id =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE"
  });

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Button handlers
let saveButtonHandler = event => {
  event.preventDefault();
  let title = document.getElementsByClassName("note-title")[0].value;
  let text = document.getElementsByClassName("note-textarea")[0].value;
  activeNote = {
    title: title,
    text: text
  };

  saveNote(activeNote)
    .then(response => response.json())
    .then(data => {
      renderSavedNoteElement(data);
      resetActiveNote();
    });
};

// Reset active note
let resetActiveNote = () => {
  activeNote = {};
  document.getElementsByClassName("note-title")[0].value = "";
  document.getElementsByClassName("note-textarea")[0].value = "";
};

// load notes
let renderSavedNoteElement = note => {
  let elements = `
    <div class="mb-3 d-flex justify-content-between">
      <h4>${note.title}</h4>
      <button id="delete-${note.id}" class="btn btn-outline-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </div>
    <p class="mb-0">${note.text}</p>
  `;

  let savedNoteElement = document.createElement("li");
  savedNoteElement.className = "list-group-item";
  savedNoteElement.innerHTML = elements;

  document.getElementById("saved-notes").appendChild(savedNoteElement);

  document
    .getElementById(`delete-${note.id}`)
    .addEventListener("click", event => {
      event.preventDefault();
      savedNoteElement.remove();
      deleteNote(note.id);
    });
};

let loadSavedNotes = () => {
  getNotes()
    .then(response => response.json())
    .then(data => {
      data.forEach(note => {
        renderSavedNoteElement(note);
      });
    });
};

// Init
loadSavedNotes();
document.getElementById("save").addEventListener("click", event => {
  saveButtonHandler(event);
});
