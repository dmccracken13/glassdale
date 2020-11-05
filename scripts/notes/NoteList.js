import { noteHTML } from "./Note.js";
import { useNotes, getNotes } from "./NoteDataProvider.js";
import { useCriminals, getCriminals} from "../criminals/CriminalProvider.js";


// get notes from API > use notes array
// iterate the notes > make html representation
// render to the dom
const notesContainer = document.querySelector(".notesContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", () => NoteList())

// refactor code to get notes and criminals 

export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const notes = useNotes()
            const criminals = useCriminals()
            
            render(notes, criminals)
    
        })
}

// refactor code to render collection of both notes and criminals 

// const render = (notesArray) => {
//     let notesHTMLRepresentation = ""
//     for (const note of notesArray) {
    
//     notesHTMLRepresentation += noteHTML(note)
//     }

//     notesContainer.innerHTML = `
//                 <div class="Notes__Aside">
//                     <h3 class="notes__header">Notes</h3>
//                     ${notesHTMLRepresentation}
//                 </div>               
//                 `
// }

const render = (noteCollection, criminalCollection) => {
    notesContainer.innerHTML = noteCollection.map(note => {
        // Find the related criminal
        const relatedCriminal = criminalCollection.find(criminal => criminal.id === note.criminalId)
        return `
            <section class="note">
                <h2>Note about ${relatedCriminal.name}</h2>
                ${note.note}
            </section>
        `
    })
}