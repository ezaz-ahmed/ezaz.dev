import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDateAgo(dateString: string): string {
  const currentDate: Date = new Date();
  const givenDate: Date = new Date(dateString);
  const timeDifference: number = currentDate.getTime() - givenDate.getTime();
  const minutesDifference: number = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
  const daysDifference: number = Math.floor(
    timeDifference / (1000 * 3600 * 24)
  ); // Convert milliseconds to days
  const monthsDifference: number = Math.floor(daysDifference / 30); // Assuming 30 days per month
  const yearsDifference: number = Math.floor(daysDifference / 365); // Assuming 365 days per year

  if (minutesDifference < 60) {
    return minutesDifference === 1
      ? "1 minute ago"
      : `${minutesDifference} minutes ago`;
  } else if (daysDifference < 30) {
    return daysDifference === 1 ? "1 day ago" : `${daysDifference} days ago`;
  } else if (monthsDifference < 12) {
    return monthsDifference === 1
      ? "1 month ago"
      : `${monthsDifference} months ago`;
  } else {
    return yearsDifference === 1
      ? "1 year ago"
      : `${yearsDifference} years ago`;
  }
}

function remarkReadingTime() {
  return function (tree: any, { data }: { data: any }) {
    const textOnPage: string = toString(tree);
    const readingTime: any = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

export { formatDate, capitalize, remarkReadingTime, formatDateAgo };
