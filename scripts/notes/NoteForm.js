import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";
import { saveNote } from "./NoteDataProvider.js";

const contentTarget = document.querySelector(".noteFormContainer");
const eventHub = document.querySelector(".container");

// Create function that will get criminals from API for noteform dropdown

export const NoteForm = () => {
  // console.log("Suspect Select: Get data rom an API and renderdropdown to DOM")

  getCriminals().then(() => {
    const criminalsArray = useCriminals();
    // console.log("criminalsArray", criminalsArray)

    render(criminalsArray);
  });
};

// Refactor render to include dropdown select as a list of criminals and take a parameter

const render = (criminals) => {
  contentTarget.innerHTML = `
    <input type="date" id="note--dateOfInterview">
    <input type="text" id="note--author" placeholder="Your Name Here"> 
    <textarea id="note--note" placeholder="Your Note Here"></textarea>
    <select id="noteForm--criminal" class="criminalSelect">
        <option value="0">Please select a suspect..</option>
        ${criminals
          .map((criminalObj) => {
            return `<option value="${criminalObj.id}">${criminalObj.name}</option>`;
          })
          .join("")}
    </select> 
        <button id="saveNote">Save Note</button>
    `;
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveNote") {
    const dateOfInterview = document.querySelector("#note--dateOfInterview")
      .value;
    const author = document.querySelector("#note--author").value;
    const criminalId = parseInt(
      document.querySelector("#noteForm--criminal").value
    );
    const note = document.querySelector("#note--note").value;
    const timestamp = Date.now();

    // Make a new object representation of a note
    const newNote = {
      // Key/value pairs here
      dateOfInterview,
      timestamp,
      author,
      criminalId,
      note,
    };

    // Change API state and application state
    saveNote(newNote);
  }
});
