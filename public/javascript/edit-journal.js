// variables
const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
const updateJournalBtn = document.getElementById("add-journal-btn");
const journalTitleEl = document.getElementById("journal-title");
const journalDescriptionEl = document.getElementById("journal-description");
const journalDurationEl = document.getElementById("journal-duration");
const journalStartEl = document.getElementById("journal-start");
const journalEndEl = document.getElementById("journal-end");
const charCountEl = document.getElementById("char-count");

const durationMin = 1;
const durationMax = 20;

// - logic
// - updating existing journal data
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

  if (isNaN(duration) || duration < durationMin || duration > durationMax) {
    console.log(`duration must be a number between ${durationMin} - ${durationMax}`)
  }
  
  if (title && description && duration && start_date && end_date) {
    // implemented try / catch for further granular error handling
    try {
      // user_id is obtained from the session in controllers/api/journal-routes
      const response = await fetch(`/api/journals/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          duration,
          start_date,
          end_date,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log(response.body.toString())
        document.location.replace(`../../`);
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("all form fields must be complete");
  }
}

// - deleting a journal from the edit-journal view
async function deleteJournalHandler(e) {
    e.preventDefault();
    const response = await fetch(`/api/journals/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace("../../")
    } else {
        alert(response.statusText)
    }
}

// calls
durationRange();
journalDescriptionEl.addEventListener("keyup", () => {
  const charLength = journalDescriptionEl.value.length;
  charCountEl.innerText = charLength;
  if (charLength === 75) {
    charCountEl.className = "char-limit"
  }
});
journalDurationEl.addEventListener("change", updateEndDate);
updateJournalBtn.addEventListener("click", editJournalFormHandler);
document
  .getElementById("delete-btn")
  .addEventListener("click", async (e) => deleteJournalHandler(e));
document
  .getElementById("back-btn")
  .addEventListener("click", () => window.history.back());