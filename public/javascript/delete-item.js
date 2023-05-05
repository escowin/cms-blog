const deleteButtons = document.querySelectorAll(".delete-btn");
const currentItemUrl = window.location.href.split('/');
let items = currentItemUrl.slice(-1)[0];
if (items === "") {
  items = "journals"
}

async function deleteItemHandler(e) {
  const button = e.target;
  const itemEl = button.closest(".item");
  const itemId = itemEl.dataset.id;
  console.log(itemId)

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
