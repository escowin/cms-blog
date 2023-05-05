// variables
const saveButtonEl = document.getElementById("add-btn");
const tagNameInputEl = document.getElementById("tag-name");
const tagId = document.querySelector('.edit-view').dataset.tagId;
const charCountEl = document.getElementById("char-count");

// functions
async function tagFormHandler(e) {
  try {
    e.preventDefault();
    const tagName = tagNameInputEl.value.trim();

    const response = await fetch(`/api/tags/${tagId}`, {
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
tagNameInputEl.addEventListener("keyup", () => {
  const charLength = tagNameInputEl.value.length;
  charCountEl.innerText = charLength;
  if (charLength === 20) {
    charCountEl.className = "char-limit";
  } else {
    charCountEl.className = "";
  }
});
saveButtonEl.addEventListener("click", tagFormHandler);
