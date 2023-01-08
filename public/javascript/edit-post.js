async function editPostFormHandler(e) {
  e.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document
    .querySelector('textarea[name="post-content"]')
    .value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "put",
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
  .getElementById("edit-post-form")
  .addEventListener("submit", editPostFormHandler);
