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
  tag_name_regex: (tag_name) => {
    const regex = /^[a-zA-Z0-9\s\u00C0-\u1FFF\u2C00-\uD7FF\u3040-\u30FF\u3100-\u312F\u4E00-\u9FFF\uAC00-\uD7AF]*$/u;
    if (!regex.test(tag_name)) {
      throw new Error('invalid tag name');
    }
    return true;
  },
};
