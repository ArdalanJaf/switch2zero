export default function sortPurchases(purchases) {
  // sorts purchases chronologically
  purchases.sort((tp1, tp2) => {
    if (tp1.year < tp2.year) {
      return -1;
    } else if (tp1.year > tp2.year) {
      return 1;
    } else if (tp1.month < tp2.month) {
      return -1;
    } else if (tp1.month > tp2.month) {
      return 1;
    } else {
      return 0;
    }
  });
}
