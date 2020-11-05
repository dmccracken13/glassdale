// convert object to html
export const noteHTML = (noteObj) => {
    return `
    <ul class="note__card">
        <li>Author: ${noteObj.author}</li>
        <li>Suspect: ${noteObj.criminalId}</li>
        <li>Interview Date: ${noteObj.dateofInterview}</li>
        <li>Timestamp: ${new Date (noteObj.timeStamp).toLocaleDateString('en-US')}</li>
        <li>Note: ${noteObj.note}</li>
    </ul>
    `
}