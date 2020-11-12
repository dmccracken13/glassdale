import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"

export const FacilitiesList = () => {
    getFacilities()
    .then(getCriminalFacilities) 
}

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
      render(criminals, facilities, crimFac);
    });
};