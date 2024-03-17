export const formattedDate = (date: Date): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
