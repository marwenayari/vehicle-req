import moment from "moment";
import "moment/locale/ar";
// import "moment-hijri";

// export type DateType = "miladi" | "hijri";

export function getFormattedDate() {
  const todayMiladiArabic = moment().locale("ar").format("DD   MM   YYYY");
  console.log("Formatted Miladi Date:", todayMiladiArabic);
  return todayMiladiArabic;
}
