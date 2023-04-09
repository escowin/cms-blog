async function getJournalId() {
  try {
    const entryId = window.location.toString().split("/").pop().split("?")[0];
    const response = await fetch(`/api/entries/${entryId}`);
    const entryData = await response.json();
    return entryData.journal_id;
  } catch (error) {
    console.error(error);
  }
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
    const journalId = await getJournalId();
    document.location.replace(`journals/${journalId}`);
  } else {
    alert(response.statusText);
  }
}

async function deleteEntryHandler(e) {
  e.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const journalId = await getJournalId();

  const response = await fetch(`/api/entries/${id}`, {
    method: "DELETE",
  });

  // dashboard redirect after deletion
  if (response.ok) {
    document.location.replace(`../../journals/${journalId}`);
  } else {
    alert(response.statusText);
  }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", async (e) => editEntryFormHandler(e));
document
  .getElementById("delete-btn")
  .addEventListener("click", async (e) => deleteEntryHandler(e));
document
  .getElementById("back-btn")
  .addEventListener("click", () => window.history.back());
