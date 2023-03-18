import numeral from "numeral";

export default function centsToDollars(cents, k = false) {
  // 1000000, k => 10k
  // 1000000 => 10,000.00

  let format = k || k === "k" ? "0 a" : "0,000,000.00";

  return numeral(cents / 100).format(format);
}
