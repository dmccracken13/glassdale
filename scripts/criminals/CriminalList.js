import { getCriminals, useCriminals } from '/scripts/criminals/CriminalProvider.js'
import { Criminal } from '/scripts/criminals/Criminal.js'
import { useConvictions } from '/scripts/convictions/ConvictionProvider.js'
import { getFacilities, useFacilities } from '/scripts/facilities/FacilityProvider.js'
import { getCriminalFacilities, useCriminalFacilities } from '/scripts/facilities/CriminalFacilityProvider.js'

const eventHub = document.querySelector(".container")
const criminalsContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {

    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then( () => {
            // Pull in the data now that it has been fetched
            const facilities = useFacilities()
            const crimFac = useCriminalFacilities()
            const criminals = useCriminals()

            // Pass all three collections of data to render()
            render(criminals, facilities, crimFac)
        })
}




// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeSelected", event => {
    // console.log("crime selected event happened")
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0"){
        
        /*
            Filter the criminals application state down to the people that committed the crime
        */
    const criminalsArray =  useCriminals() 
    const convictionsArray = useConvictions() 
    const facilitiesArray = useFacilities()
    const criminalFacilitiesArray = useCriminalFacilities()

    const convictionThatWasChosen = convictionsArray.find(convictionsObject => {
        return convictionsObject.id === event.detail.crimeThatWasChosen
    })

    const filteredCriminalsArray = criminalsArray.filter(criminalObject => {
        return criminalObject.conviction === convictionThatWasChosen.name
    })
    render(filteredCriminalsArray, facilitiesArray, criminalFacilitiesArray )
    }
})
    

eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
    // console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name:",
    // selectedOfficerName)

    const selectedOfficerName = officerSelectedEventObj.detail.officerName

    const criminalsArray = useCriminals()
    const facilitiesArray = useFacilities()
    const criminalFacilitiesArray = useCriminalFacilities()

    const filteredArrayCriminals = criminalsArray.filter(
        (criminalObj) => {
            if (criminalObj.arrestingOfficer === selectedOfficerName) {
                return true
              }
              return false
            })
        console.log("CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer", filteredArrayCriminals)
            
        render(filteredArrayCriminals, facilitiesArray, criminalFacilitiesArray)
        console.log("CriminalList: Filtered list of criminals rendered to DOM")
})
            
// const render = (criminalsArray) => {
//         let criminalsHTMLRepresentations = ""
//         for (const criminal of criminalsArray) {

//         criminalsHTMLRepresentations += Criminal(criminal)

//         criminalsContainer.innerHTML = `
//             <h3>Glassdale Criminals</h3>
//             <section class="criminalList">
//                 ${criminalsHTMLRepresentations}
//             </section>
//             `
//         }
// }

const render = (criminalsToRender, allFacilities, allRelationships) => {
    // Step 1 - Iterate all criminals
    criminalsContainer.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
            const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
            return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminal(criminalObject, facilities)
        }
    ).join("")
}