import { useConvictions, getConvictions } from "./ConvictionProvider.js"


// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions()
    .then(() => {
    const convictions = useConvictions()
    render(convictions)  
    })      
}

const render = convictionsCollection => {   
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${convictionsCollection.map(
                convictionObject => {
                    return `<option value="${convictionObject.id}">${convictionObject.name}</option>`
                }
                ).join("") 
            }
        </select>
    `
}

// On the event hub, listen for a "change" event.

contentTarget.addEventListener("change", (changeEvent) => {
    // console.log(changeEvent.target.value)

    if (changeEvent.target.id === "crimeSelect") {
    
        const customEvent = new CustomEvent("crimeSelected", {
        detail: {
            crimeThatWasChosen: parseInt(changeEvent.target.value) 
        }
    }) 
    eventHub.dispatchEvent(customEvent)
    }
})


