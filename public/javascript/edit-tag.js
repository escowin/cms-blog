// variables
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const backBtn = document.getElementById("back-btn");
const id = document.querySelector(".edit-view").dataset.tagId;
const tagNameInputEl = document.getElementById("tag-name");

// functions
async function tagFormHandler(e) {
  try {
    e.preventDefault();
    const tagName = tagNameInputEl.value.trim();

    const response = await fetch(`/api/tags/${id}`, {
      method: "PUT",
      body: JSON.stringify({ tag_name: tagName }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`../`);
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

// calls
tagNameInputEl.addEventListener("keyup", async (e) => characterLimit(tagNameInputEl, 20))
saveBtn.addEventListener("click", tagFormHandler);
deleteBtn.addEventListener("click", async (e) => deleteTag(e));
backBtn.addEventListener("click", () => window.history.back());