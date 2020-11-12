import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { Facility } from "/scripts/facilities/Facility.js"

const eventHub = document.querySelector(".container");
const facilitiesContainer = document.querySelector(".facilityContainer");

let facilities = []
let crimFac = []
let criminals = []

export const FacilitiesList = () => {
    getFacilities()
    .then(getCriminalFacilities)
    .then(getCriminals)
    .then(() => {
    facilities = useFacilities() 
    crimFac = useCriminalFacilities()
    criminals = useCriminals()
    render()
    }) 
}

const render = () => {
    let facilitiesHTMLRepresentations = ""
    // Step 1 - Iterate all criminals
    for (const facility of facilities) {
    // Step 2 - Filter all relationships to get only ones for this criminal
    const criminalRelationshipsForThisFacility = crimFac.filter(
        (cf) => cf.facilityId === facility.id
        );
    // Step 3 - Convert the relationships to facilities with map()
    const matchFac = criminalRelationshipsForThisFacility.map((cf) => {
    const matchingCriminalObject = criminals.find(
        (criminal) => criminal.id === cf.criminalId
        );
    return matchingCriminalObject;
    });
    facilitiesHTMLRepresentations += Facility(facility, matchFac)
        // Must pass the matching facilities to the Criminal component
    
    }
    facilitiesContainer.innerHTML = `
    <h3>Incarceration Facilities</h3>
    <section class="facilityList">
        ${facilitiesHTMLRepresentations}
    </section>
    `
};

// Listen for the custom event you dispatched in DisplayFacilitiesButton
eventHub.addEventListener("click", (eventObj) => {
    console.log("facilities button click heard")
    // Use the property you added to the event detail.
    if (eventObj.target.id === "facilities") {
    FacilitiesList()
    }
});