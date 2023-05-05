const deleteButtons = document.querySelectorAll(".delete-btn");

async function deleteTagHandler(e) {
  const button = e.target;
  const tagEl = button.closest(".item");
  const tagId = tagEl.dataset.tagId;

  // confirmation placeholder
  const confirmed = confirm("confirm delete request");
  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/tags/${tagId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      tagEl.remove();
    } else {
      throw new Error(`failed to delete entry #${tagId}`);
    }
  } catch (err) {
    console.error(err);
  }
}

deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteTagHandler);
});
