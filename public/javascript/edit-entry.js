async function getJournalId() {
  const entryId = window.location.toString().split("/").pop().split("?")[0];
  const response = await fetch(`/api/entries/${entryId}`);
  const entryData = await response.json();
  return entryData.journal_id;
}

async function editPostFormHandler(e) {
  e.preventDefault();
  // entry form variables
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/entries/${id}`, {
    method: "PUT",
    body: JSON.stringify({ /* form variables */ }),
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
getJournalId()
  .then((journalId) => console.log(journalId))
  .catch((err) => console.log(err));
// document
//   .getElementById("edit-post-form")
//   .addEventListener("submit", editPostFormHandler);
