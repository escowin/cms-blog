// variables
const id = document.querySelector(".edit-view").dataset.tagId;
const saveButtonEl = document.getElementById("add-btn");
const tagNameInputEl = document.getElementById("tag-name");
const charCountEl = document.getElementById("char-count");

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

function characterLimit() {
  const charLength = tagNameInputEl.value.length;
  charCountEl.innerText = charLength;
  if (charLength === 20) {
    charCountEl.className = "char-limit";
  } else {
    charCountEl.className = "";
  }
}

// calls
tagNameInputEl.addEventListener("keyup", () => characterLimit);
saveButtonEl.addEventListener("click", tagFormHandler);
