// Pune's real seasons, by month. The window (and the studio) live in them.
//  Jun–Sep: monsoon rain · Mar–May: blazing summer · Dec–Feb: soft winter haze · Oct–Nov: clear post-monsoon
export function getPuneSeason(month = new Date().getMonth()) {
  if (month >= 5 && month <= 8) return 'monsoon'
  if (month >= 2 && month <= 4) return 'summer'
  if (month === 11 || month <= 1) return 'winter'
  return 'clear'
}

// A short human word for each season, for the "Pune, right now" caption.
export const SEASON_WORD = {
  monsoon: 'monsoon rain',
  summer: 'summer',
  winter: 'winter',
  clear: 'clear skies',
}

// Pune's wall-clock time (IST), regardless of where the visitor is — the point
// is to show it's *Pune* right now, not the viewer's timezone.
export function puneTime() {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date())
  } catch {
    return ''
  }
}
