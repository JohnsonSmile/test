import { ethers } from "ethers";
import moment from "moment";

const formatBigNumber = (uint256Value) => {
  return ethers.utils
    .formatUnits(uint256Value, 9)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getBigNumber = (uint256Value) => {
  return uint256Value.toNumber();
};

const getFormatBigNumber = (uint256Value) => {
  return ethers.utils
    .formatEther(uint256Value)
}

const formatNumber = (number) => {
  return number.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ellipsisAccount = (account) => {
  if (!account) {
    return account;
  }
  return account.slice(0, 6) + "..." + account.slice(-4);
};

const formatUniteNumber = (value) => {
  const param = {};
  const k = 1000;
  // K	Thousand (Kilo)	10^3	1000
  // M	Million	10^6	1000K
  // B	Billion	10^9	1000M
  // t	Trillion	10^12	1000B
  // q	Quadrillion	10^15	1000t
  // Q	Quintillion	10^18	1000q
  // s	Sextillion	10^21	1000Q
  // S	Septillion	10^24	1000s
  // o	Octillion	10^27	1000S
  // n	Nonillion	10^30	1000o
  // d	Decillion	10^33	1000n
  // U	Undecillion	10^36	1000d
  // D	Duodecillion	10^39	1000U
  // T	Tredecillion	10^42	1000D
  // Qt	Quattuordecillion	10^45	1000T
  // Qd	Quindecillion	10^48	1000Qt
  const unites = [
    "",
    "K",
    "M",
    "B",
    "t",
    "q",
    "Q",
    "s",
    "S",
    "o",
    "n",
    "d",
    "U",
    "D",
    "T",
    "Qt",
    "Qd",
  ];

  let i = 0;
  // if (value < k) {
  param.value = (value / 1e6).toFixed(2);
  param.unite = "";
  // }
  // else {
  //   i = Math.floor(Math.log(value) / Math.log(k));
  //   param.value = (value / Math.pow(k, i)).toFixed(2);
  //   param.unite = unites[i];
  // }
  return param.value + param.unite;
};

// format time string to locale
const formatISO8601Time = (timeStr) => {
  // 2021-12-13T11:04:40+08:00
  var momentDate = moment(timeStr, moment.ISO_8601);
  var jsDate = momentDate.toDate();
  // to locale string
  return jsDate.toLocaleString();
};

export {
  formatBigNumber,
  formatNumber,
  getBigNumber,
  ellipsisAccount,
  formatUniteNumber,
  formatISO8601Time,
  getFormatBigNumber
};
