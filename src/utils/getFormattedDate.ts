import moment from "moment";
import "moment/locale/ar";
// import "moment-hijri";

// export type DateType = "miladi" | "hijri";

export function getFormattedDate() {
  const m = moment().locale("ar");
  // Get day, month, year as strings in Arabic numerals
  const day = m.format("DD");
  const month = m.format("MM");
  const year = m.format("YYYY");
  // Reverse each string
  const reverse = (s: string) => s.split("").reverse().join("");
  const dayRev = reverse(day);
  const monthRev = reverse(month);
  const yearRev = reverse(year);
  // Join with 4 spaces
  return `${dayRev}  ${monthRev}  ${yearRev}`;
}
