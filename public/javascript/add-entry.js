// logic
function postEntry(journal_id, entry_date, entry_weight, entry_text) {
  console.log(`
  ${journal_id}
  ${entry_date}
  ${entry_weight}
  ${entry_text}`
  );
}

function postTagName(tag_name) {
  console.log(tag_name);
}

async function entryFormHandler(e) {
  e.preventDefault();

  // entry data
  const entry_date = document
    .getElementById("date")
    .value.trim()
    .replace(/-/g, ".");
  const entry_weight = document.getElementById("weight").value.trim();
  const entry_text = document.getElementById("text").value.trim();
  const journal_id = window.location
    .toString()
    .split("/")
    [window.location.toString().split("/").length - 1].split("?")[0];

  // tag data
  const tag_name = document.getElementById("tag-name").value.trim();

  if (entry_text && tag_name) {
    postEntry(journal_id, entry_date, entry_weight, entry_text);
    postTagName(tag_name);
  } else if (entry_text) {
    postEntry(journal_id, entry_date, entry_weight, entry_text);
  } else {
    return console.log("entry text required");
  }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
