import { getCriminals, useCriminals } from '/scripts/criminals/CriminalProvider.js'
import { Criminal } from '/scripts/criminals/Criminal.js'



export const CriminalList = () => {
    
    getCriminals()
        .then( () => {
            let criminalHTMLRepresentation = ""
            let criminalArray = useCriminals()
            for (const criminal of criminalArray) {
            criminalHTMLRepresentation += Criminal(criminal)
            }
        
         /*
            Now that you have the data, what
            component should be rendered?
        */
        const contentElement = document.querySelector(".criminalsContainer")
        contentElement.innerHTML = criminalHTMLRepresentation
    })
    
}
