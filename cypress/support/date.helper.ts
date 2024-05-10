import moment from "moment";

export function getTodayInFormat(): string {
  const today = moment();

  const day = today.date();
  const month = today.month() + 1;
  const year = today.year();

  let formatString = "";

  if (day < 10 && month < 10) {
    formatString = "D. M. YYYY";
  } else if (day < 10 && month >= 10) {
    formatString = "D. MM. YYYY";
  } else if (day >= 10 && month < 10) {
    formatString = "DD. M. YYYY";
  } else {
    formatString = "DD. MM. YYYY";
  }

  return today.format(formatString);
}
