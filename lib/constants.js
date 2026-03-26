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
  focus: '事业',
  ziShiRule: 'change',
  useTrueSolarTime: false
};

/**
 * 判断出生时间是否处于子时区间（23:00-00:59）
 * @param {string} timeValue - HH:mm 格式的时间
 * @returns {{ isZiShi: boolean, isLateZiShi: boolean, isEarlyZiShi: boolean }}
 */
export function getZiShiInfo(timeValue = '08:30') {
  const [hourString = '0'] = timeValue.split(':');
  const hour = Number(hourString);
  const isLateZiShi = hour >= 23;         // 23:00-23:59 晚子时
  const isEarlyZiShi = hour === 0;        // 00:00-00:59 早子时
  const isZiShi = isLateZiShi || isEarlyZiShi;
  return { isZiShi, isLateZiShi, isEarlyZiShi };
}

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

/**
 * 计算均时差（Equation of Time）
 * @param {number} dayOfYear - 年积日（1月1日=1）
 * @returns {number} 均时差，单位：分钟
 */
function calcEquationOfTime(dayOfYear) {
  const B = (2 * Math.PI / 365) * (dayOfYear - 81);
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

/**
 * 计算年积日（Day of Year）
 * @param {number} year
 * @param {number} month - 1~12
 * @param {number} day
 * @returns {number}
 */
function getDayOfYear(year, month, day) {
  const date = new Date(year, month - 1, day);
  const start = new Date(year, 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * 计算真太阳时
 * 真太阳时 = 北京时间 + 经度修正 + 均时差(EOT)
 * 经度修正 = (当地经度 - 120°) × 4 分钟/度（北京时间基于东经120°）
 *
 * @param {string} birthTime - HH:mm 格式的北京时间
 * @param {number} lng - 出生地经度
 * @param {number} solarYear - 阳历年
 * @param {number} solarMonth - 阳历月 (1-12)
 * @param {number} solarDay - 阳历日
 * @returns {{ trueSolarTime: string, offsetMinutes: number, detail: string }}
 */
export function calcTrueSolarTime(birthTime, lng, solarYear, solarMonth, solarDay) {
  if (!birthTime || !lng || !solarYear) {
    return { trueSolarTime: birthTime, offsetMinutes: 0, detail: '' };
  }

  const [hourStr, minStr] = birthTime.split(':');
  const hour = Number(hourStr);
  const minute = Number(minStr);
  const totalMinutes = hour * 60 + minute;

  // 经度修正（每度4分钟，基准经度120°）
  const lngCorrection = (lng - 120) * 4;

  // 均时差
  const dayOfYear = getDayOfYear(solarYear, solarMonth, solarDay);
  const eot = calcEquationOfTime(dayOfYear);

  // 总修正量（分钟）
  const totalOffset = lngCorrection + eot;
  const correctedMinutes = totalMinutes + totalOffset;

  // 处理跨日（保持在 0~1440 范围内）
  let finalMinutes = Math.round(correctedMinutes);
  let dayShift = 0;
  if (finalMinutes < 0) {
    finalMinutes += 1440;
    dayShift = -1;
  } else if (finalMinutes >= 1440) {
    finalMinutes -= 1440;
    dayShift = 1;
  }

  const newHour = Math.floor(finalMinutes / 60);
  const newMinute = finalMinutes % 60;
  const trueSolarTime = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;

  const offsetSign = totalOffset >= 0 ? '+' : '';
  const detail = `经度修正 ${lngCorrection >= 0 ? '+' : ''}${lngCorrection.toFixed(1)}分 + 均时差 ${eot >= 0 ? '+' : ''}${eot.toFixed(1)}分 = 总修正 ${offsetSign}${totalOffset.toFixed(1)}分`;

  return { trueSolarTime, offsetMinutes: Math.round(totalOffset), dayShift, detail };
}
