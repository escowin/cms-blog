async function entryFormHandler(e) {
  try {
    e.preventDefault();
    let tagIds = [];

    // data | entry & tag values from the input form. tag string is split into an array;
    const entryDate = document.getElementById("date").value.replace(/-/g, ".");
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];
    const tagsInput = document.getElementById("tag-name").value.trim().toLowerCase();

    if (tagsInput.trim() !== "") {
      const formTagStrings = tagsInput.split(";").map((tag) => tag.trim());
      const generatedTagIds = await generateTagIds(formTagStrings);
      tagIds.push(...generatedTagIds);
      console.log(tagIds);
    }

    console.log(tagIds);
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

    // note : post entry & tags into database, association  via EntryTag through table
  } catch (err) {
    console.log("failed at the `try... catch`");
    console.log(err);
  }
}

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
      .filter(
        (formTag) =>
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

// returns an array of all tags
const getExistingTags = async () => {
  const response = await fetch("/api/tags");
  const tags = await response.json();
  return tags;
};

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
