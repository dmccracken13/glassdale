// convert object to html
export const noteHTML = (noteObj, criminalObj) => {
    return `
    <ul class="note__card">
        <li>Author: ${noteObj.author}</li>
        <li>Suspect: ${criminalObj.name}</li>
        <li>Interview Date: ${noteObj.dateofInterview}</li>
        <li>Timestamp: ${new Date (noteObj.timeStamp).toLocaleDateString('en-US')}</li>
        <li>Note: ${noteObj.note}</li>
        <button id="deleteNote--${noteObj.id}">Delete</button>
    </ul>
    `
}