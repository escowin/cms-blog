// logic
async function entryFormHandler(e) {
  // e.preventDefault();

  const date = document.getElementById('entry-date').value.trim();

  console.log(date)
  const entry_text = document
    .querySelector('textarea[name="entry-text"]')
    .value.trim();

  const journal_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (entry_text) {
    const response = await fetch("/api/entries", {
      method: "post",
      body: JSON.stringify({
        journal_id,
        entry_text,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("click", entryFormHandler);
