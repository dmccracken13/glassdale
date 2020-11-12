import { getCriminals, useCriminals} from "/scripts/criminals/CriminalProvider.js";
import { Criminal } from "/scripts/criminals/Criminal.js";
import { useConvictions } from "/scripts/convictions/ConvictionProvider.js";
import { getFacilities, useFacilities } from "/scripts/facilities/FacilityProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "/scripts/facilities/CriminalFacilityProvider.js";

const eventHub = document.querySelector(".container");
const criminalsContainer = document.querySelector(".criminalsContainer");

let facilities = []
let crimFac = []
let criminals = []


export const CriminalList = () => {
  getCriminals()
    .then(getFacilities)
    .then(getCriminalFacilities)
    .then(() => {
      // Pull in the data now that it has been fetched
    facilities = useFacilities();
    crimFac = useCriminalFacilities();
    criminals = useCriminals();

      // Pass all three collections of data to render()
      render();
    });
};

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeSelected", (event) => {
  // console.log("crime selected event happened")
  // Use the property you added to the event detail.
  if (event.detail.crimeThatWasChosen !== "0") {
    /*
            Filter the criminals application state down to the people that committed the crime
        */
    const criminalsArray = useCriminals();
    const convictionsArray = useConvictions();

    const convictionThatWasChosen = convictionsArray.find(
      (convictionsObject) => {
        return convictionsObject.id === event.detail.crimeThatWasChosen;
      }
    );

    const filteredCriminalsArray = criminalsArray.filter((criminalObject) => {
      return criminalObject.conviction === convictionThatWasChosen.name;
    });
    criminals = filteredCriminalsArray
    render();
  }
});

eventHub.addEventListener("officerSelected", (officerSelectedEventObj) => {
  // console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name:",
  // selectedOfficerName)

  const selectedOfficerName = officerSelectedEventObj.detail.officerName;
  const criminalsArray = useCriminals();

  const filteredArrayCriminals = criminalsArray.filter((criminalObj) => {
    if (criminalObj.arrestingOfficer === selectedOfficerName) {
      return true;
    }
    return false;
  });
  // console.log(
  //   "CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer",
  //   filteredArrayCriminals
  // );
  criminals = filteredArrayCriminals
  render();
  // console.log("CriminalList: Filtered list of criminals rendered to DOM");
});

const render = () => {
  let criminalsHTMLRepresentations = ""
  // Step 1 - Iterate all criminals
  for (const criminal of criminals) {
  // Step 2 - Filter all relationships to get only ones for this criminal
  const facilityRelationshipsForThisCriminal = crimFac.filter(
        (cf) => cf.criminalId === criminal.id
      );
  // Step 3 - Convert the relationships to facilities with map()
  const matchFac = facilityRelationshipsForThisCriminal.map((cf) => {
  const matchingFacilityObject = facilities.find(
        (facility) => facility.id === cf.facilityId
        );
  return matchingFacilityObject;
  });
  criminalsHTMLRepresentations += Criminal(criminal, matchFac)
      // Must pass the matching facilities to the Criminal component
    
  }
  criminalsContainer.innerHTML = `
  <h3>Glassdale Criminals</h3>
    <section class="criminalList">
      ${criminalsHTMLRepresentations}
    </section>
  `
};
