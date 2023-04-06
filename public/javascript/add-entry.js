async function entryFormHandler(e) {
  try {
    e.preventDefault();

    // data | entry & tag values from the input form. tag string is split into an array;
    const entryDate = document.getElementById("date").value.trim().replace(/-/g, ".");
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];

    const tagString = document.getElementById("tag-name").value.trim();
    const tags = tagString.split(';').map((tag) => tag.trim());
    console.log(entryDate)
    console.log(entryWeight)
    console.log(entryText)
    console.log(entryDate)
    console.log(journalId)
    console.log(tagString)
    console.log(tags)
    // note : post entry & tags into database, association  via EntryTag through table

    } catch (err) {
      console.log(err)
      console.log("failed at the `try... catch`")
    }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
