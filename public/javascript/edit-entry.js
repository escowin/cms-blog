// variables
const id = document.querySelector(".edit-view").dataset.entryId;
const journalId = document.querySelector(".edit-view").dataset.journalId;
const entryNotesEl = document.getElementById("text");
const entryWeightEl = document.getElementById("weight");
const charCountEl = document.getElementById("char-count");
const saveEntryBtn = document.getElementById("add-entry-btn");
const deleteBtn = document.getElementById("delete-btn");
const backBtn = document.getElementById("back-btn");

async function editEntryFormHandler(e) {
  try {
    e.preventDefault();
    let tagIds = [];

    const entryDate = document.getElementById("date").value;
    const entryWeight = entryWeightEl.value.trim();
    const entryText = entryNotesEl.value.trim();
    const tagsInput = document.getElementById("tag-name").value.trim();

    if (tagsInput.trim() !== "") {
      const formTagStrings = tagsInput.split(",").map((tag) => tag.trim());
      const generatedTagIds = await generateTagIds(formTagStrings);
      tagIds.push(...generatedTagIds);
    }

    const response = await fetch(`/api/entries/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        entry_date: entryDate,
        entry_weight: entryWeight,
        entry_text: entryText,
        tags: tagIds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`../../journals/${journalId}`);
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.log("failed at the `try... catch`");
    console.log(err);
  }
}

async function deleteEntryHandler(e) {
  e.preventDefault();
  const response = await fetch(`/api/entries/${id}`, {
    method: "DELETE",
  });

  // dashboard redirect after deletion
  if (response.ok) {
    document.location.replace(`../../journals/${journalId}`);
  } else {
    alert(response.statusText);
  }
}

// - posting new tags
const generateTagIds = async (formTags) => {
  let idValues = [];
  const existingTags = await getExistingTags();
  const newTags = formTags.filter((formTag) => {
    return !existingTags.some(
      (existingTag) => existingTag.tag_name.toLowerCase() === formTag
    );
  });

  const newTagIds = await Promise.all(
    newTags.map(async (newTag) => {
      const response = await fetch("/api/tags", {
        method: "POST",
        body: JSON.stringify({ tag_name: newTag }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newTagObj = await response.json();
      return newTagObj.id;
    })
  );

  const existingTagIds = await Promise.all(
    formTags
      .filter((formTag) =>
        existingTags.some(
          (existingTag) => existingTag.tag_name.toLowerCase() === formTag
        )
      )
      .map(async (existingTag) => {
        const existingTagObj = existingTags.find(
          (tag) => tag.tag_name.toLowerCase() === existingTag.toLowerCase()
        );
        return existingTagObj.id;
      })
  );

  idValues = [...newTagIds, ...existingTagIds];

  return idValues;
};

// - fetches all tags from db
const getExistingTags = async () => {
  const response = await fetch("/api/tags");
  const tags = await response.json();
  return tags;
};

function chracterLimit() {
  const charLength = entryNotesEl.value.length;
  charCountEl.innerText = charLength;
  if (charLength === 300) {
    charCountEl.className = "char-limit";
  } else {
    charCountEl.className = "";
  }
}

function weightRegex() {
  // limits user input to 3 digits & one decimal
  const regex = /^\d{0,3}(\.\d{0,1})?$/;
  const inputValid = regex.test(entryWeightEl.value);
  if (!inputValid) {
    // removes last input character
    entryWeightEl.value = entryWeightEl.value.slice(0, -1);
  } else if (parseFloat(entryWeightEl.value) > 500) {
    entryWeightEl.value = "500";
  }
}

// calls
entryWeightEl.addEventListener("input", weightRegex);
entryNotesEl.addEventListener("keyup", chracterLimit);
saveEntryBtn.addEventListener("click", editEntryFormHandler);
deleteBtn.addEventListener("click", async (e) => deleteEntryHandler(e));
backBtn.addEventListener("click", () => window.history.back());
