const deleteButtons = document.querySelectorAll(".delete-journal-btn");

async function deleteJournalHandler(e) {
  const button = e.target;
  const journalEl = button.closest(".journal");
  const journalId = journalEl.dataset.id;

  // confirmation placeholder
  const confirmed = confirm("confirm delete request");
  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/journals/${journalId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      journalEl.remove();
    } else {
      throw new Error(`failed to delete journal #${journalId}`);
    }
  } catch (err) {
    console.error(err);
  }
}

deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteJournalHandler);
});
