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
    // let tagIds = [];
  
    const entryDate = document.getElementById("date").value;
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    // const tagsInput = document.getElementById("tag-name").value.trim().toLowerCase();
  
    // if (tagsInput.trim() !== "") {
    //   const formTagStrings = tagsInput.split(";").map((tag) => tag.trim());
    //   const generatedTagIds = await generateTagIds(formTagStrings);
    //   tagIds.push(...generatedTagIds);
    //   console.log(tagIds);
    // }
  
    const response = await fetch(`/api/entries/${id}`, {
      method: "PUT",
      body: JSON.stringify({ 
        entry_date: entryDate,
        entry_weight: entryWeight,
        entry_text: entryText,
        // tags: tagIds
      }),
      headers: { "Content-Type": "application/json" },
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

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
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

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", async (e) => editEntryFormHandler(e));
document
  .getElementById("delete-btn")
  .addEventListener("click", async (e) => deleteEntryHandler(e));
document
  .getElementById("back-btn")
  .addEventListener("click", () => window.history.back());
