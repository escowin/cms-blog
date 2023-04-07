async function entryFormHandler(e) {
  try {
    e.preventDefault();
    let tagIds = [];

    // data | entry & tag values from the input form. tag string is split into an array;
    const entryDate = document.getElementById("date").value.replace(/-/g, ".");
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];
    const tagsInput = document.getElementById("tag-name").value.trim();

    if (tagsInput.trim() !== "") {
      // fills the empty tags array by splitting up string objects anytime a semi-colon appears.
      // possible solution : get all tags, check against matchig 'tag_name'.
      // - if there is a match, get the corresponding id value from the Tag table. that value will then be pushed into the tags array
      // - if not, post new tag(s) to /api/tags. then make a get fetch request (api/tags/:tag_name). get its id value. that value will then be pushed into the tags array.
      formTagStrings = tagsInput.split(";").map((tag) => tag.trim());
      postTags(formTagStrings);
    }

    // console.log(tags);
    const response = await fetch("/api/entries", {
      method: "POST",
      body: JSON.stringify({
        entry_date: entryDate,
        entry_weight: entryWeight,
        entry_text: entryText,
        journal_id: journalId,
        // bug | sending string object, but tags are made up of tag_id
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

const postTags = async (formTags) => {
  const existingTags = await getExistingTags();
  // console.log(existingTags);

  const newTags = formTags.filter(formTag=> {
    return !existingTags.some(existingTag => existingTag.tag_name === formTag);
  });

  newTags.forEach((newTag) => {
    console.log(newTag)
    // fetch("/api/tags", {
    //   method: "POST",
    //   body: JSON.stringify({ tag_name: newTag })
    // })
  });

  // console.log(newTags);
  // check if formTagArray string objects match with any existing 'tag_name' value. If so, that object's 'id' will be returned. if not, post the entry, do another get all request, grab the new object's 'tag_id' integer value.
};

// returns an array of all tags
const getExistingTags = async () => {
  const response = await fetch('/api/tags');
  const tags = await response.json();
  return tags;
};

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
