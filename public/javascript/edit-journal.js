// variables
const updateJournalBtn = document.getElementById("add-journal-btn");
const journalTitleEl = document.getElementById("journal-title");
const journalDescriptionEl = document.getElementById("journal-description");
const journalDurationEl = document.getElementById("journal-duration");
const journalStartEl = document.getElementById("journal-start");
const journalEndEl = document.getElementById("journal-end");

const durationMin = 1;
const durationMax = 20;

// logic
function durationRange() {
  // adds the duration range as selectable options for the user
  for (let i = durationMin; i <= durationMax; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    journalDurationEl.appendChild(option);
  }
}

function updateEndDate() {
  const start_date = journalStartEl.value.trim();
  const duration = journalDurationEl.value.trim();

  if (start_date && duration) {
    const end_date = calculateEndDate(start_date, duration);
    const journalEndEl = document.getElementById("journal-end");
    journalEndEl.textContent = end_date;
  }
}

function calculateEndDate(start_date, duration) {
  const startDateObj = new Date(start_date);
  const durationInMs = parseInt(duration) * 7 * 24 * 60 * 60 * 1000;
  const endDateObj = new Date(startDateObj.getTime() + durationInMs);
  const endDate = endDateObj.toISOString().split("T")[0];
  return endDate;
}

async function editJournalFormHandler(e) {
  e.preventDefault();

  const title = journalTitleEl.value.trim();
  const description = journalDescriptionEl.value.trim();
  const duration = journalDurationEl.value.trim();
  const start_date = journalStartEl.value.trim();
  const end_date = calculateEndDate(start_date, duration);

  console.log(title);
  console.log(description);
  console.log(duration);
  console.log(start_date);
  console.log(end_date);
}

// calls
durationRange();
journalDurationEl.addEventListener("change", updateEndDate);
updateJournalBtn.addEventListener("click", editJournalFormHandler);
