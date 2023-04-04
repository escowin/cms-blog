async function entryFormHandler(e) {
  try {
    e.preventDefault();

    // data | values from the input form
    const entryDate = document.getElementById("date").value.trim().replace(/-/g, ".");
    const entryWeight = document.getElementById("weight").value.trim();
    const entryText = document.getElementById("text").value.trim();
    const journalId = window.location.toString().split("/").pop().split("?")[0];
    const tagName = document.getElementById("tag-name").value.trim();

    // goal: avoid creating a through table api request & controller.
    console.log(`
    ${entryDate}
    ${entryWeight}
    ${entryText}
    ${journalId}
    ${tagName}
    `)

    } catch (err) {
      console.log(err)
      console.log("failed at the `try... catch`")
    }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
