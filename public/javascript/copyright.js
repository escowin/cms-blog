function currentYear() {
    let year = new Date().getFullYear();
    console.log(`
 \u00A9 ${year} Edwin M. Escobar
 https://github.com/escowin/fitness-logbook
 `);

    const yearEl = document.getElementById('year');
    yearEl.innerText = year;

    return yearEl;
};

currentYear();