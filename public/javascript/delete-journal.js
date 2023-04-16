const deleteButtons = document.querySelectorAll('.delete-journal-btn');

async function deleteJournalHandler(e) {
    const button = e.target;
    const journalEl = button.closest('.journal');
    const journalId = journalEl.dataset.id;
    console.log(journalEl)
    console.log(journalId)
}

deleteButtons.forEach(button => {
    button.addEventListener('click', deleteJournalHandler)
})