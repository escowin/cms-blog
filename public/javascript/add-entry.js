  // current http://localhost:3001/api/entries `GET` request. a `POST` requests from the frontend includes the "tag" array in each entry object regardless if tag objects exist. every tag object has an "entry-tag".
  /*
    [
      {
        "id": 1,
        "entry_date": "2020.03.20",
        "entry_weight": "190",
        "entry_text": "text 1",
        "user_id": 1,
        "journal_id": 1,
        "tag": [
          {
            "id": 1,
            "tag_name": "meal prep",
            "entry_tag": {
              "id": 1
            }
          },
          {
            "id": 2,
            "tag_name": "rowing",
            "entry_tag": {
              "id": 2
            }
          }
        ]
      },
    ]
  */

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
