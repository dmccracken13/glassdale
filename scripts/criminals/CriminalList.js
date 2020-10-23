import { getCriminals, useCriminals } from '/scripts/criminals/CriminalProvider.js'
import { Criminal } from '/scripts/criminals/Criminal.js'
import { useConvictions } from '/scripts/convictions/ConvictionProvider.js'

const eventHub = document.querySelector(".container")
const criminalsContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {
    
    getCriminals()
        .then( () => {
        const criminalArray = useCriminals()
            
        render(criminalArray)
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

    const convictionThatWasChosen = convictionsArray.find(convictionsObject => {
        return convictionsObject.id === event.detail.crimeThatWasChosen
    })

    const filteredCriminalsArray = criminalsArray.filter(criminalObject => {
        return criminalObject.conviction === convictionThatWasChosen.name
    })
    let criminalsHTMLRepresentation = ""
    for (const criminal of filteredCriminalsArray) {
    
        criminalsHTMLRepresentation += Criminal(criminal)

        criminalsContainer.innerHTML = `
            <h3>Glassdale Criminals</h3>
            <section class="criminalList">
                ${criminalsHTMLRepresentation}
            </section>
            `
        }
    }
})
    

eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
    // console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name:",
    // selectedOfficerName)

    const selectedOfficerName = officerSelectedEventObj.detail.officerName

    const criminalsArray = useCriminals()

    const filteredArrayCriminals = criminalsArray.filter(
        (criminalObj) => {
            if (criminalObj.arrestingOfficer === selectedOfficerName) {
                return true
              }
              return false
            })
        console.log("CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer", filteredArrayCriminals)
            
        render(filteredArrayCriminals)
        console.log("CriminalList: Filtered list of criminals rendered to DOM")
})
            
const render = (criminalsArray) => {
        let criminalsHTMLRepresentations = ""
        for (const criminal of criminalsArray) {

        criminalsHTMLRepresentations += Criminal(criminal)

        criminalsContainer.innerHTML = `
            <h3>Glassdale Criminals</h3>
            <section class="criminalList">
                ${criminalsHTMLRepresentations}
            </section>
            `
        }
}
