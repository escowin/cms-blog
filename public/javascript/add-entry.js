async function entryFormHandler(e) {
  try {
    e.preventDefault();

    // data | entry & tag values from the input form. tag string is split into an array;
    const entryDate = document.getElementById("date").value.replace(/-/g, ".");
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];
    const tagsInput = document.getElementById("tag-name").value.trim();

    let tags = [];
    if (tagsInput.trim() !== "") {
      // fills the empty tags array by splitting up string objects anytime a semi-colon appears.
      // possible solution : get all tags, check against matchig 'tag_name'.
      // - if there is a match, get the corresponding id value from the Tag table. that value will then be pushed into the tags array
      // - if not, post new tag(s) to /api/tags. then make a get fetch request (api/tags/:tag_name). get its id value. that value will then be pushed into the tags array.
      tags = tagsInput.split(";").map((tag) => tag.trim());
      postTags(tags);
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
        tags: tags,
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

function postTags(tagArr) {
  const response = fetch("/api/tags/").then((response) => {
    response.json().then((data) => console.log(data));
  });

  // console.log(response);
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
