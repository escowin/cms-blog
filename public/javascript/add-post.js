// logic
async function newPostFormHandler(e) {
  e.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document
    .querySelector('textarea[name="post-content"]')
    .value.trim();

  // user_id is obtained from the session in controllers/api/post-routes
  const response = await fetch(`/api/posts`, {
    method: "post",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// calls
document
  .getElementById("new-post-form")
  .addEventListener("submit", newPostFormHandler);
