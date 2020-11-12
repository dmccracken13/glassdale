const eventHub = document.querySelector(".container");

// export const Criminal = (criminalObj) => {
//     return`
//     <div class="criminal__card" id="criminal-${criminalObj.id}">
//       <p>Name: ${criminalObj.name}</p>
//       <p>Age: ${criminalObj.age}</p>
//       <p>Conviction: ${criminalObj.conviction}</p>
//       <p>Date of Incarceration: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
//       <button id="associates--${criminalObj.id}">Associate Alibis</button>
//     </div>
//     `
// }

// New criminal code

export const Criminal = (criminalObject, facilities) => {
  return `
  <div class="criminal__card" id="criminal-${criminalObject.id}">
      <h4>${criminalObject.name}</h4>
      <div class="criminal__details">
          <p>Convicted for ${criminalObject.conviction}</p>
          <p>Arrested by ${criminalObject.arrestingOfficer}</p>
          <p>Incarcerated between:
              ${new Date(
                criminalObject.incarceration.start
              ).toLocaleDateString()} and
              ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
          </p>
          <p>Age: ${criminalObject.age}</p>
          <div>
              <h3>Facilities</h3>
              <ul>
                  ${facilities
                    .map((f) => `<li>${f.facilityName}</li>`)
                    .join("")}
              </ul>
          </div>
          <button id="associates--${criminalObject.id}">Show Associates</button>
      </div>
  </div>
  `;
};

eventHub.addEventListener("click", (eventObj) => {
  // split the id of the alibi button
  const [nameOfId, criminalId] = eventObj.target.id.split("--");

  // check to see if button clicked was alibi button
  if (eventObj.target.id.startsWith("associates--")) {
    console.log("button was clicked:", nameOfId, criminalId);
    // build a custom event
    const myCustomEvent = new CustomEvent("alibiButtonClicked", {
      detail: {
        criminalId: criminalId,
      },
    });
    console.log(myCustomEvent);
    // dispatch the event to the eventHub so that other modules can listen for this event
    eventHub.dispatchEvent(myCustomEvent);
  }
});
