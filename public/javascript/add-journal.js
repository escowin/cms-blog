// logic
async function newJournalFormHandler(e) {
  e.preventDefault();

  const title = document.querySelector('input[name="journal-title"]').value.trim();
  const start_date = document.getElementById("start-date").value.trim();
  const end_date = document.getElementById("end-date").value.trim();
  const duration = document.getElementById("duration").value.trim();
  const description = document
    .querySelector('textarea[name="journal-description"]')
    .value.trim();

  // user_id is obtained from the session in controllers/api/journal-routes
  const response = await fetch(`/api/journals`, {
    method: "post",
    body: JSON.stringify({ title, start_date, end_date, duration, description }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// calls
document
  .getElementById("new-journal-form")
  .addEventListener("submit", newJournalFormHandler);
