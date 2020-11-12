import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";

import { OfficerSelect } from "./officers/OfficerSelect.js";
import { OfficerList } from "./officers/Officerlist.js";

import { NoteForm } from "./notes/NoteForm.js";
import { NoteList } from "./notes/NoteList.js";

import { createAlibiEventListener } from "./criminals/AlibiList.js";
import { WitnessButton } from "./witnesses/WitnessButton.js";
import { WitnessList } from "./witnesses/WitnessList.js";
import { renderFacilityButton } from "./facilities/DisplayFacilitiesButton.js";

CriminalList();
ConvictionSelect();

OfficerList();
OfficerSelect();

NoteForm();
NoteList();

createAlibiEventListener();

WitnessButton();
renderFacilityButton();
// WitnessList()
