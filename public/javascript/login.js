// logic
async function loginFormHandler(e) {
  e.preventDefault();

  const username = document.getElementById("username-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // succesful logins redirect session users to dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(e) {
  e.preventDefault();

  const username = document.getElementById("username-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // checks the response status
    if (response.ok) {
      console.log("success");
    } else {
      alert(response.statusText);
    }
  }
}

// calls
document
  .getElementById("login-form")
  .addEventListener("submit", loginFormHandler);

document
  .getElementById("signup-form")
  .addEventListener("submit", signupFormHandler);
