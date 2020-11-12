export const Facility = (facilityObj, criminals) => {
    return `
    <div class="facility__card">
        <h4>${facilityObj.facilityName}</h4>
        <div class="facility__details">
            <p>Security Level: ${facilityObj.securityLevel}</p>
            <p>Capacity: ${facilityObj.capacity}</p>
        </div>
        <div>
            <h3>Criminals</h3>
            <ul>
                ${criminals
                .map((c) => `<li>${c.name}</li>`)
                .join("")}
            </ul>
        </div>
    </div>
    `;
};