const contentTarget = document.querySelector(".facility__button")
const eventHub = document.querySelector(".container")

export const renderFacilityButton = () => {   
    contentTarget.innerHTML = `
    <button id="facilities">Facilities</button>
    `
}

eventHub.addEventListener("click", (eventObj) => {
    // check to see if button clicked was facilities button
   if(eventObj.target.id === "facilities") {
     const facilitiesButtonClickedEvent = new CustomEvent("facilitiesButtonClicked")
   eventHub.dispatchEvent(facilitiesButtonClickedEvent)
     console.log("facilities button was clicked")
     }
 })