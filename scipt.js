const btnEl = document.getElementById("btn"); 
// Selects the "Add Note" button by its ID for event handling.

const appEl = document.getElementById("App");
// Selects the main application container where notes will be displayed.

// Retrieve existing notes from localStorage and display each one on the page.
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content); 
    // Creates a new note element using the retrieved note's ID and content.
    appEl.insertBefore(noteEl, btnEl); 
    // Inserts the created note element into the application container before the button.
});
// Function to create a new note element
function createNoteEl(id, content) {
    const element = document.createElement("textarea"); 
    // Creates a new <textarea> element for the note.

    element.classList.add("note"); 
    // Adds the "note" class to the textarea for styling.

    element.placeholder = "Empty Note"; 
    // Sets a placeholder text for the note.

    element.value = content; 
    // Sets the content of the note from the provided data.

    element.addEventListener("dblclick", () => { 
        // Adds an event listener for double-click to delete the note.
        const warning = confirm("Do you want to delete this note?"); 
        // Asks for confirmation before deleting.
        if (warning) {
            deleteNote(id, element); 
            // Calls the deleteNote function if the user confirms.
        }
    });

    element.addEventListener("input", () => { 
        // Adds an event listener to handle changes to the note's content.
        updateNote(id, element.value); 
        // Updates the note's content in localStorage.
    });

    return element; 
    // Returns the created note element.
}

// Function to delete a note
function deleteNote(id, element) {
    notes = getNotes().filter((note) => note.id != id); 
    // Filters out the note with the specified ID from the notes array.

    saveNote(notes); 
    // Saves the updated notes array to localStorage.

    appEl.removeChild(element); 
    // Removes the note element from the application container.
}

// Function to update a note's content
function updateNote(id, content) {
    const notes = getNotes(); 
    // Retrieves all notes from localStorage.

    const target = notes.filter((note) => note.id == id)[0]; 
    // Finds the note with the matching ID.

    target.content = content; 
    // Updates the note's content.

    saveNote(notes); 
    // Saves the updated notes array to localStorage.
}

// Function to add a new note
function addNote() {
    const notes = getNotes(); 
    // Retrieves existing notes from localStorage.

    const noteObj = {
        id: Math.floor(Math.random() * 10000), 
        // Generates a random unique ID for the new note.
        content: "" 
        // Initializes the note with empty content.
    };

    const noteEl = createNoteEl(noteObj.id, noteObj.content); 
    // Creates a new note element.

    appEl.insertBefore(noteEl, btnEl); 
    // Inserts the new note into the application container before the button.

    notes.push(noteObj); 
    // Adds the new note object to the notes array.

    saveNote(notes); 
    // Saves the updated notes array to localStorage.
}

// Function to save notes to localStorage
function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes)); 
    // Converts the notes array to a JSON string and stores it in localStorage.
}

// Function to retrieve notes from localStorage
function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]"); 
    // Retrieves the notes array from localStorage or initializes an empty array if no notes exist.
}

btnEl.addEventListener("click", addNote); 
// Adds an event listener to the button for adding a new note when clicked.
