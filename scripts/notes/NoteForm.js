const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

const render = () => {
    contentTarget.innerHTML = `
    <input type="date" id="note--dateOfInterview">
    <input type="text" id="note--author" placeholder="Your Name Here"> 
    <textarea id="note--note" placeholder="Your Note Here"></textarea>
    <input type="text" id="note--suspect" placeholder="Suspect"> 
        <button id="saveNote">Save Note</button>
    `
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const dateOfInterview = document.querySelector("#note--dateOfInterview").value
        const author = document.querySelector("#note--author").value
        const suspect = document.querySelector("#note--suspect").value
        const note = document.querySelector("#note--note").value
        const timestamp = Date.now()

        // Make a new object representation of a note
        const newNote = {
            
            // Key/value pairs here
            dateOfInterview,
            timestamp,
            author,
            suspect,
            note
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

export const NoteForm = () => {
    render()
}