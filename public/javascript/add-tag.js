console.log("add tag")

const addButtonEl = document.getElementById('add-btn');
const tagNameInputEl =  document.getElementById('tag-name');

async function tagFormHandler(e) {
    try {
        e.preventDefault();
        const tagName = tagNameInputEl.value.trim();
        console.log(tagName)
    } catch (err) {
        console.log(err)
    }
}

addButtonEl.addEventListener("click", tagFormHandler);