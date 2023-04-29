// variables
const addEntryBtn = document.getElementById("add-entry-btn");
const entryNotesEl = document.getElementById("text")
const charCountEl = document.getElementById("char-count");


// logic | async
// - posting new entries & tags into the database tables from the frontend
async function entryFormHandler(e) {
  try {
    e.preventDefault();
    let tagIds = [];

    // data | entry & tag values from the input form. tag string is split into an array;
    const entryDate = document.getElementById("date").value;
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = entryNotesEl.value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];
    const tagsInput = document
      .getElementById("tag-name")
      .value.trim();

    if (tagsInput.trim() !== "") {
      const formTagStrings = tagsInput.split(";").map((tag) => tag.trim());
      const generatedTagIds = await generateTagIds(formTagStrings);
      tagIds.push(...generatedTagIds);
    }

    const response = await fetch("/api/entries", {
      method: "POST",
      body: JSON.stringify({
        entry_date: entryDate,
        entry_weight: entryWeight,
        entry_text: entryText,
        journal_id: journalId,
        tags: tagIds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.log("failed at the `try... catch`");
    console.log(err);
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

// calls
entryNotesEl.addEventListener("keyup", () => {
  const charLength = entryNotesEl.value.length;
  charCountEl.innerText = charLength;
  if (charLength === 300) {
    charCountEl.className = "char-limit"
  }
});
addEntryBtn.addEventListener("click", entryFormHandler);