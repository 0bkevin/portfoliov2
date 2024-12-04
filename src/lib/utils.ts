export const formatDateToDisplay = (dateString: Date | string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const getReadingTime = (body: string |  undefined) => {
  const wordsPerMinute = 200;
  if (!body) return 0;
  const wordCount = body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};
