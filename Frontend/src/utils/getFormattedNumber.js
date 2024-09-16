export default function getFormattedNumber(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // For millions
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // For thousands
    } else {
      return count.toString(); // For numbers below 1000
    }
  }