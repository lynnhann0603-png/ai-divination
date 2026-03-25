export const CN_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];

export const LUNAR_YEARS = Array.from({ length: 91 }, (_, index) => 1940 + index);

export const BAZI_FOCUS_OPTIONS = ['事业', '感情', '财运', '学业', '健康'];

export const DEFAULT_BAZI_FORM = {
  name: '林然',
  gender: '女',
  lunarYear: '1997',
  lunarMonth: '7',
  lunarDay: '14',
  isLeapMonth: 'no',
  birthPlace: '广东省广州市',
  birthLat: '23.1291',
  birthLng: '113.2644',
  birthTime: '08:30',
  focus: '事业'
};

export const DEFAULT_TAROT_FORM = {
  question: '我接下来三个月是否适合换工作？',
  spreadId: 'crossroad'
};

export function getShichenFromTime(timeValue = '08:30') {
  const [hourString = '0', minuteString = '0'] = timeValue.split(':');
  const totalMinutes = Number(hourString) * 60 + Number(minuteString);

  if (totalMinutes >= 23 * 60 || totalMinutes < 60) return '子时';
  if (totalMinutes < 3 * 60) return '丑时';
  if (totalMinutes < 5 * 60) return '寅时';
  if (totalMinutes < 7 * 60) return '卯时';
  if (totalMinutes < 9 * 60) return '辰时';
  if (totalMinutes < 11 * 60) return '巳时';
  if (totalMinutes < 13 * 60) return '午时';
  if (totalMinutes < 15 * 60) return '未时';
  if (totalMinutes < 17 * 60) return '申时';
  if (totalMinutes < 19 * 60) return '酉时';
  if (totalMinutes < 21 * 60) return '戌时';
  return '亥时';
}
