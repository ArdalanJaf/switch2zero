import months from "../config/months";

const dateUtils = {
  unixToMonth: (unix, num = false) => {
    let monthIndex = new Date(unix).getMonth();
    if (num === "num" || num === true) return monthIndex;
    return months[monthIndex];
  },
  unixToYear: (unix) => {
    return new Date(unix).getUTCFullYear();
  },
};

export default dateUtils;
