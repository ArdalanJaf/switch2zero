import months from "../config/months";

const dateUtils = {
  unixToMonth: (unix, num = false) => {
    // => 3 || March
    let monthIndex = new Date(unix).getMonth();
    if (num === "num" || num === true) return monthIndex;
    return months[monthIndex];
  },
  unixToYear: (unix) => {
    // => 2023
    return new Date(unix).getUTCFullYear();
  },
  unixToMonthYear: (unix) => {
    // => Mar-2023
    let date = new Date(unix);
    return (
      months[date.getMonth()].substring(0, 3) + "-" + date.getUTCFullYear()
    );
  },
  dateToLocalString: (date) => {
    let dObj = new Date(date);
    return (
      dObj.toLocaleDateString() +
      " " +
      dObj.getHours() +
      ":" +
      dObj.getMinutes()
    );
  },
};

export default dateUtils;
