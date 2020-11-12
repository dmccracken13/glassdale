// convert object to html
export const Witness = (witnessObj) => {
  return `
    <div class="witness__card">
        <p>Witness: ${witnessObj.name}</p>
        <p>Statement: ${witnessObj.statement}</p>
    </div>
    `;
};
