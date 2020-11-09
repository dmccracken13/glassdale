import { noteHTML } from "./Note.js";
import { useNotes, getNotes, deleteNote } from "./NoteDataProvider.js";
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

const render = (notesArray, criminalCollection) => {
   
    notesContainer.innerHTML = notesArray.map(note => {
        const relatedCriminal = criminalCollection.find(criminal => criminal.id === note.criminalId)  
            return`
                <div class="Notes__Aside">
                    <h3 class="notes__header">Note about ${relatedCriminal.name}</h3>
                    ${noteHTML(note, relatedCriminal)}
                </div>               
                `
            }).join("")          
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
       deleteNote(id).then(() => {
               const updatedNotes = useNotes()
               const criminals = useCriminals()
               render(updatedNotes, criminals)
           }
       )
    }
})


// const render = (noteCollection, criminalCollection) => {
//     let notesHTMLRepresentation = ""

//     for (const note of noteCollection) {
//         notesHTMLRepresentation += noteHTML(note)
//     }
//     notesContainer.innerHTML = noteCollection.map(note => {
//         // Find the related criminal
//         const relatedCriminal = criminalCollection.find(criminal => criminal.id === note.criminalId)
//         return `
//             <section class="note">
//                 <h2>Note about ${relatedCriminal.name}</h2>
//                 ${note.note}
//             </section>
//             <button id="deleteNote--${note.id}">Delete</button>

//         `
//     })
// }