export const Facility = (facilityObj, criminals) => {
    return `
    <div class="facility__card">
        <h4>${facilityObj.facilityName}</h4>
        <div class="facility__details">
            <p>Security Level: ${facilityObj.securityLevel}</p>
            <p>Capacity: ${facilityObj.capacity}</p>
            <p>Incarcerated between:
            ${new Date(
            facilityObj.incarceration.start
            ).toLocaleDateString()} and
            ${new Date(facilityObj.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${facilityObj.age}</p>
        <div>
            <h3>Criminals</h3>
            <ul>
                ${criminals
                .map((c) => `<li>${c.facilityName}</li>`)
                .join("")}
            </ul>
        </div>
        <button id="associates--${facilityObj.id}">Show Associates</button>
        <div id="alibis--${facilityObj.id}"></div>
    </div>
    </div>
    `;
};