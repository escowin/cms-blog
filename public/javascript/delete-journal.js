const deleteButtons = document.querySelectorAll('.delete-journal-btn');

async function deleteJournalHandler(e) {
    console.log("clicked")
}

deleteButtons.forEach(button => {
    button.addEventListener('click', deleteJournalHandler)
})