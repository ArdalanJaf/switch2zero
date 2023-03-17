import numeral from "numeral";

export default function centsToDollars(cents, k = false) {
  let format = k || k === "k" ? "0 a" : "0,000,000.00";

  return numeral(cents / 100).format(format);
}
