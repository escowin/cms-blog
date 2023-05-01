function currentYear() {
  let year = new Date().getFullYear();
  console.log(`
   \u00A9 ${year} Edwin M. Escobar
   https://github.com/escowin/fitness-logbook
   `);

  const yearEl = document.getElementById("year");
  yearEl.innerText = year;

  return yearEl;
}

function activeLink() {
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    if (link.id === "logout") {
      return;
    }

    if (link.href === currentUrl) {
      // Adds the 'active' class to the matching link
      link.classList.add("active");
    }
  });
}

currentYear();
activeLink();
