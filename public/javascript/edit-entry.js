async function getJournalId() {
  const entryId = window.location.toString().split("/").pop().split("?")[0];
  const response = await fetch(`/api/entries/${entryId}`);
  const entryData = await response.json();
  return entryData.journal_id;
}

async function editEntryFormHandler(e) {
  e.preventDefault();
  const entryDate = document.getElementById("date").value;
  const entryWeight = document.getElementById("weight").value.trim();
  const entryText = document.getElementById("text").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/entries/${id}`, {
    method: "PUT",
    body: JSON.stringify({ entryDate, entryWeight, entryText }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    getJournalId;
    document.location.replace(`journals/${journalId}`);
  } else {
    alert(response.statusText);
  }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", editEntryFormHandler);
document
  .getElementById("back-btn")
  .addEventListener("click", () => window.history.back());
