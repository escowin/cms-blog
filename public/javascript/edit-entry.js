// variables
const saveEntryBtn = document.getElementById("add-entry-btn");
const entryNotesEl = document.getElementById("text")
const charCountEl = document.getElementById("char-count");

async function getJournalId() {
  try {
    const entryId = window.location.toString().split("/").pop().split("?")[0];
    const response = await fetch(`/api/entries/${entryId}`);
    const entryData = await response.json();
    return entryData.journal_id;
  } catch (error) {
    console.error(error);
  }
}

async function editEntryFormHandler(e) {
  try {
    e.preventDefault();
    let tagIds = [];
  
    const entryDate = document.getElementById("date").value;
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const tagsInput = document.getElementById("tag-name").value.trim();
  
    if (tagsInput.trim() !== "") {
      const formTagStrings = tagsInput.split(";").map((tag) => tag.trim());
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
      const journalId = await getJournalId();
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


  const journalId = await getJournalId();

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

// calls
entryNotesEl.addEventListener("keyup", () => {
  const charLength = entryNotesEl.value.length;
  charCountEl.innerText = charLength;
  if (charLength === 300) {
    charCountEl.className = "char-limit"
  }
});
saveEntryBtn.addEventListener("click", editEntryFormHandler);
document
  .getElementById("delete-btn")
  .addEventListener("click", async (e) => deleteEntryHandler(e));
document
  .getElementById("back-btn")
  .addEventListener("click", () => window.history.back());
