// variables
const saveBtn = document.getElementById("save-btn");
const journalTitleInputEl = document.getElementById("journal-title");
const journalDescriptionInputEl = document.getElementById("journal-description");
const journalDurationInputEl = document.getElementById("journal-duration");
const journalStartInputEl = document.getElementById("journal-start");
const journalEndEl = document.getElementById("journal-end");

const durationMin = 1;
const durationMax = 20;

// functions
function durationRange() {
  // add an empty default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  journalDurationInputEl.appendChild(defaultOption);

  // adds the duration range as selectable options for the user
  for (let i = durationMin; i <= durationMax; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    journalDurationInputEl.appendChild(option);
  }
}

function updateEndDate() {
  const start_date = journalStartInputEl.value.trim();
  const duration = journalDurationInputEl.value.trim();

  if (start_date && duration) {
    const end_date = calculateEndDate(start_date, duration);
    const journalEndEl = document.getElementById("journal-end");
    journalEndEl.className = "date-details end-value";
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

async function newJournalFormHandler(e) {
  // placed here for best practices. the svg icon acting as a button does not have default behavior.
  e.preventDefault();

  const title = journalTitleInputEl.value.trim();
  const description = journalDescriptionInputEl.value.trim();
  const duration = journalDurationInputEl.value.trim();
  const start_date = journalStartInputEl.value.trim();
  const end_date = calculateEndDate(start_date, duration);

  if (isNaN(duration) || duration < durationMin || duration > durationMax) {
    console.log(
      `duration must be a number between ${durationMin} - ${durationMax}`
    );
  }

  if (title && description && duration && start_date && end_date) {
    // implemented try / catch for further granular error handling
    try {
      // user_id is obtained from the session in controllers/api/journal-routes
      const response = await fetch(`/api/journals`, {
        method: "POST",
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
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      console.log(err);
      console.log("fetch post request error");
    }
  } else {
    console.log("all form fields must be complete");
  }
}

// calls
durationRange();
journalDescriptionInputEl.addEventListener("keyup", async (e) => characterLimit(journalDescriptionInputEl, 75));
journalDurationInputEl.addEventListener("change", updateEndDate);
saveBtn.addEventListener("click", newJournalFormHandler);
