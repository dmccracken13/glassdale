// Get a reference to the DOM element where the <button> will be rendered
const contentTarget = document.querySelector(".filters__witnesses")
const eventHub = document.querySelector(".container")

export const WitnessButton = () => {
    contentTarget.innerHTML =`
    <button id="witnessButton" class="button">Witnesses</button>
    `
}

eventHub.addEventListener("click", (eventObj) => {
   // check to see if button clicked was alibi button
  if(eventObj.target.id === "witnessButton") {
    const witnessButtonClickedEvent = new CustomEvent("witnessButtonClicked")
  eventHub.dispatchEvent(witnessButtonClickedEvent)
    console.log("witness button was clicked")
    }
})