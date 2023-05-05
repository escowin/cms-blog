// variables
const saveBtn = document.getElementById("save-btn");
const tagNameInputEl = document.getElementById("tag-name");

// functions
async function tagFormHandler(e) {
  try {
    e.preventDefault();
    const tagName = tagNameInputEl.value.trim();

    const response = await fetch("/api/tags/", {
      method: "POST",
      body: JSON.stringify({ tag_name: tagName }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
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
