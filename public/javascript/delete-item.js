const deleteButtons = document.querySelectorAll(".delete-btn");
const currentItemUrl = window.location.href.split('/');
const listEl = document.querySelector("#entries")
const items = listEl.id

async function deleteItemHandler(e) {
  const button = e.target;
  const itemEl = button.closest(".item");
  const itemId = itemEl.dataset.id;

  // confirmation placeholder
  const confirmed = confirm("confirm delete request");
  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/${items}/${itemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      itemEl.remove();
    } else {
      throw new Error('failed to delete');
    }
  } catch (err) {
    console.error(err);
  }
}

deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteItemHandler);
});
