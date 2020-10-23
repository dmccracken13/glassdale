import { noteHTML } from "./Note.js";
import { useNotes } from "./NoteDataProvider.js";
import { getNotes } from "./NoteDataProvider.js";

// get notes from API > use notes array
// iterate the notes > make html representation
// render to the dom
const notesContainer = document.querySelector(".notesContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChangedEvent", () => Notelist())


export const NoteList = () => {
    getNotes()
    .then(() => {
    const allNotes = useNotes()
    render(allNotes)
    
    })
}

const render = (notesArray) => {
    let notesHTMLRepresentation = ""
    for (const note of notesArray) {
    
    notesHTMLRepresentation += noteHTML(note)
    }

    notesContainer.innerHTML = `
                ${notesHTMLRepresentation}
               `
}
