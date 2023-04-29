const deleteButtons = document.querySelectorAll(".delete-journal-btn");

async function deleteEntryHandler(e) {
  const button = e.target;
  const entryEl = button.closest(".entry");
  const entryId = entryEl.dataset.id;

  // confirmation placeholder
  const confirmed = confirm("confirm delete request");
  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/entries/${entryId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      journalEl.remove();
    } else {
      throw new Error(`failed to delete entry #${entryId}`);
    }
  } catch (err) {
    console.error(err);
  }
}

deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteEntryHandler);
});
