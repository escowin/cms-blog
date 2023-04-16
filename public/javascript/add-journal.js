const addJournalBtn = document.getElementById("add-journal-btn");
let selectedDuration = null;

function durationRange() {
  const journalDurationEl = document.getElementById("journal-duration");

  for (let i = 1; i <= 20; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    journalDurationEl.appendChild(option);
  }

  // captures selected duration value
  journalDurationEl.addEventListener("change", function () {
    selectedDuration = this.value;
    updateEndDate();
  });
}

function calculateEndDate(start_date, duration) {
  const startDateObj = new Date(start_date);
  console.log(startDateObj);
  const durationInMs = parseInt(duration) * 7 * 24 * 60 * 60 * 1000;
  const endDateObj = new Date(startDateObj.getTime() + durationInMs);
  const endDate = endDateObj.toISOString().split("T")[0];
  return endDate;
  // const journalEndEl = document.getElementById("journal-end")
  // journalEndEl.textContent = endDate;
  // console.log(endDate)
}

function updateEndDate() {
  const start_date = document.getElementById("journal-start").value.trim();
  const duration = selectedDuration;
  const end_date = calculateEndDate(start_date, duration);

  const journalEndEl = document.getElementById("journal-end");
  journalEndEl.textContent = end_date;
}

// logic
async function newJournalFormHandler() {
  const title = document.getElementById("journal-title").value.trim();
  const description = document
    .getElementById("journal-description")
    .value.trim();
  const start_date = document.getElementById("journal-start").value.trim();
  // console.log(start_date)
  const duration = selectedDuration;
  const end_date = calculateEndDate(start_date, duration);
  console.log(end_date);

  // user_id is obtained from the session in controllers/api/journal-routes
  // const response = await fetch(`/api/journals`, {
  //   method: "post",
  //   body: JSON.stringify({ title, start_date, end_date, duration, description }),
  //   headers: { "Content-Type": "application/json" },
  // });

  // if (response.ok) {
  //   document.location.replace("/dashboard");
  // } else {
  //   alert(response.statusText);
  // }
}

// calls
durationRange();
updateEndDate();
addJournalBtn.addEventListener("click", newJournalFormHandler);
