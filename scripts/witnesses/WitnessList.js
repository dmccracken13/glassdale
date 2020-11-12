import { getWitnesses, useWitnesses } from "./WitnessProvider.js";
import { Witness } from "./Witness.js";

const witnessContainer = document.querySelector(".criminalsContainer");
const eventHub = document.querySelector(".container");

// add event listener to listen for witness button click
eventHub.addEventListener("witnessButtonClicked", () => WitnessList());

// get witnesses from API > use witnesses array
export const WitnessList = () => {
  getWitnesses().then(() => {
    const allWitnesses = useWitnesses();
    render(allWitnesses);
  });
  // console.log(WitnessList)
};

// iterate the witnesses > make html representation
// render to the dom
const render = (witnessesArray) => {
  let witnessesHTMLRepresentation = "";
  for (const witness of witnessesArray) {
    witnessesHTMLRepresentation += Witness(witness);
  }

  witnessContainer.innerHTML = `
            <div class="witnessList"> 
                ${witnessesHTMLRepresentation} 
            </div>
            `;
};
