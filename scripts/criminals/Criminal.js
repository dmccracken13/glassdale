const eventHub = document.querySelector(".container")

export const Criminal = (criminalObj) => {
    return`
    <div class="criminal__card" id="criminal-${criminalObj.id}">
      <p>Name: ${criminalObj.name}</p>
      <p>Age: ${criminalObj.age}</p>
      <p>Conviction: ${criminalObj.conviction}</p>
      <p>Date of Incarceration: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
      <button id="associates--${criminalObj.id}">Associate Alibis</button>
    </div>
    `
}

eventHub.addEventListener("click", (eventObj) => {
  // split the id of the alibi button 
  const [nameOfId, criminalId] = eventObj.target.id.split("--")

// check to see if button clicked was alibi button
if(eventObj.target.id.startsWith("associates--")) {
  console.log("button was clicked:", nameOfId, criminalId)
  // build a custom event 
  const myCustomEvent = new CustomEvent("alibiButtonClicked", {
    detail: {
      criminalId: criminalId
    }
  })
  console.log(myCustomEvent)
      // dispatch the event to the eventHub so that other modules can listen for this event
      eventHub.dispatchEvent(myCustomEvent)
  }
})