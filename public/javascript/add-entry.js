async function entryFormHandler(e) {
  try {
    e.preventDefault();

    // data | entry & tag values from the input form. tag string is split into an array;
    const entryDate = document.getElementById("date").value.trim().replace(/-/g, ".");
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];

    const tagString = document.getElementById("tag-name").value.trim();
    let tags = [];
    if (tagString.trim() !== "") {
      console.log(tagString)
    } else {
      console.log(tags)
      console.log('no tags')
    }


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
