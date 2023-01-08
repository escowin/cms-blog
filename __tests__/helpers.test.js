const { format_date, format_plural } = require("../utils/helpers");

// streamlining the date format
test("format_date() returns a date string", () => {
  const date = new Date("2022-01-07 16:12:03");

  expect(format_date(date)).toBe("1/7/2022");
});

// pluralization
test("format_plural() returns pluralized word", () => {
  const word1 = format_plural("post", 1);
  const word2 = format_plural("comment", 2);

  expect(word1).toBe("post");
  expect(word2).toBe("comments");
});