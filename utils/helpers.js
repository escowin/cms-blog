module.exports = {
  format_date: (date) => {
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    let day = new Date(date).getDate();

    if (month < 10) {
      return `${year}.0${month}.${day}`;
    }
    return `${year}.${month}.${day}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      switch (word) {
        case "entry":
          return `entries`;
        default:
          return `${word}s`;
      }
    }
    return word;
  },
  current_year: () => {
    return new Date().getFullYear();
  },
  is_edit_entry_page: () => {
    const currentPage = windows.location.href;
    return currentPage.include("/entries/edit/");
  },
};
