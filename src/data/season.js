// Pune's real seasons, by month. The window (and the studio) live in them.
//  Jun–Sep: monsoon rain · Mar–May: blazing summer · Dec–Feb: soft winter haze · Oct–Nov: clear post-monsoon
export function getPuneSeason(month = new Date().getMonth()) {
  if (month >= 5 && month <= 8) return 'monsoon'
  if (month >= 2 && month <= 4) return 'summer'
  if (month === 11 || month <= 1) return 'winter'
  return 'clear'
}
