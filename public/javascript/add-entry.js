// logic
async function entryFormHandler(e) {
  e.preventDefault();

  const date = document.getElementById("date").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const entry_text = document.getElementById("text").value.trim();
  const journal_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ].split("?")[0]

  console.log(date);
  console.log(weight);
  console.log(entry_text);
  console.log(typeof journal_id);

  // if (entry_text) {
  //   const response = await fetch("/api/entries", {
  //     method: "post",
  //     body: JSON.stringify({
  //       journal_id,
  //       entry_text,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   if (response.ok) {
  //     document.location.reload();
  //     console.log("ok")
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);
