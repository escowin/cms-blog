function durationRange() {
  const durationSelectEl = document.getElementById("journal-duration");

  for (let i = 1; i <= 20; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    durationSelectEl.appendChild(option);
  }
}


function calculateEndDate(start_date, duration) {
  console.log(start_date)
  console.log(duration)
}

// logic
async function newJournalFormHandler(e) {
  // e.preventDefault();
  console.log("add journal button clicked")

  const title = document.getElementById('journal-title').value.trim();
  const start_date = document.getElementById("start-date").value.trim();
  const duration = document.getElementById("end-date").value.trim();
  const end_date = calculateEndDate(start_date, duration);
  const description = document
    .querySelector('textarea[name="journal-description"]')
    .value.trim();

    console.log(title)
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
document
  .getElementById("add-journal-btn")
  .addEventListener("submit", newJournalFormHandler);

durationRange();