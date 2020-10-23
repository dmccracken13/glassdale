import { getOfficers, useOfficers } from "./OfficerProvider.js"

const officersFilterContainer = document.querySelector(".filters__officer")
// console.log("OfficerSelect: Getting")
const eventHub = document.querySelector(".container")


export const OfficerSelect = () => {
    // console.log("OfficerSelect: Get data rom an API and renderdropdown to DOM")
    
    getOfficers()
    .then(() => {
        const officersArray = useOfficers()
        // console.log("officersArray", officersArray)

        render(officersArray)
    })
}
    
const render = (officers) => {
    officersFilterContainer.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer..</option>
            ${officers.map(
                officerObj => {
                    return `<option value="${officerObj.name}">${officerObj.name}</option>`
                }
                ).join("") 
            }
        </select>
        `
}

eventHub.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "officerSelect") {
        // console.log("officerSelect: Change event happened in the Officers Dropdown")
     const officerSelectedEvent = new CustomEvent("officerSelected", {
        detail: {
            officerName: changeEvent.target.value 
        }
    })
        // console.log("OfficerSelect: Dispatch officerSelected event to event hub")
        eventHub.dispatchEvent(officerSelectedEvent)
    }
})
