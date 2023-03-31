// logic
async function postEntry(journal_id, entry_date, entry_weight, entry_text) {
  // console.log("POST entry")
  try {
    const response = await fetch("/api/entries", {
      method: "post",
      body: JSON.stringify({
        journal_id,
        entry_date,
        entry_weight,
        entry_text,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("throw | failed to create entry.");
    }

    const newEntry = await response.json();
    console.log(newEntry);

    const tagResponse = await fetch("/api/tags", {
      method: "post",
      body: JSON.stringify({ tag_name }),
      headers: { "Content-Type": "application/json" },
    });

    if (!tagResponse.ok) {
      throw new Error("throw | `post` Tag failed");
    }

    const newTag = await tagResponse.json();
    console.log(newTag);

    // associates the entry with the tag(s) by posting json obj to the 'entryTags' through table model
    const entryTagResponse = await fetch("/api/entrytags", {
      method: "post",
      body: JSON.stringify({
        entry_id: newEntry.id,
        tag_id: newTag.id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(entryTagResponse);
    if (!entryTagResponse) {
      throw new Error("throw | `post` entryTags failed");
    }

    console.log("successfully posted entry with tag");
    document.location.reload();
  } catch (err) {
    console.log(err);
    alert("catch | posting entry with tag failed");
  }
}

// bug front end doesn't post tag. need to revisit routes & controllers
// async function postTagName(tag_name) {
//   console.log(tag_name);
//   // try {
//   const response = await fetch("/api/tags", {
//     method: "post",
//     body: JSON.stringify({ tag_name }),
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     document.location.reload();
//     console.log("posted tag");
//   } else {
//     alert(response.statusText);
//   }
//   // } catch (err) {
//   //   console.err(err)
//   //   alert('failed to post entry')
//   // }
// }

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

  if (entry_text) {
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        body: JSON.stringify({
          journal_id,
          entry_date,
          entry_weight,
          entry_text,
        }),
      headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("throw | posting entry failed")
      }

      // handles when an entry includes a tag
      if (tag_name) {
        console.log(tag_name)
      }
    } catch (err) {
      console.log(err);
      alert("catch | posting the entry or tag failed")
    } 
  //   await postEntry(journal_id, entry_date, entry_weight, entry_text);
  //   // await postTagName(tag_name);
  // } else if (entry_text) {
  //   await postEntry(journal_id, entry_date, entry_weight, entry_text);
  // } else {
  //   return console.log("entry text required");
  } else {
    console.log("else | entry text (notes) required")
  }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
