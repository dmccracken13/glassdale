export const Criminal = (criminalObj) => {
    return`
    <ul class="criminal__card">
      <li>Name: ${criminalObj.name}</li>
      <li>Age: ${criminalObj.age}</li>
      <li>Conviction: ${criminalObj.conviction}</li>
      <li>Date of Incarceration: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</li>
    </ul>
    `
}

