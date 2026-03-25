export const fallbackCoordinates = [
  { match: ['广州', '广州市'], lat: 23.1291, lng: 113.2644, label: '广东省广州市（本地兜底）' },
  { match: ['北京', '北京市'], lat: 39.9042, lng: 116.4074, label: '北京市（本地兜底）' },
  { match: ['上海', '上海市'], lat: 31.2304, lng: 121.4737, label: '上海市（本地兜底）' },
  { match: ['深圳', '深圳市'], lat: 22.5431, lng: 114.0579, label: '广东省深圳市（本地兜底）' },
  { match: ['杭州', '杭州市'], lat: 30.2741, lng: 120.1551, label: '浙江省杭州市（本地兜底）' },
  { match: ['成都', '成都市'], lat: 30.5728, lng: 104.0668, label: '四川省成都市（本地兜底）' },
  { match: ['重庆', '重庆市'], lat: 29.563, lng: 106.5516, label: '重庆市（本地兜底）' },
  { match: ['武汉', '武汉市'], lat: 30.5928, lng: 114.3055, label: '湖北省武汉市（本地兜底）' },
  { match: ['南京', '南京市'], lat: 32.0603, lng: 118.7969, label: '江苏省南京市（本地兜底）' },
  { match: ['西安', '西安市'], lat: 34.3416, lng: 108.9398, label: '陕西省西安市（本地兜底）' }
];

function getFallbackPlace(place) {
  return fallbackCoordinates.find((item) => item.match.some((name) => place.includes(name))) || null;
}

export async function resolveBirthPlace(place) {
  const query = (place || '').trim();
  if (!query) {
    throw new Error('请先填写出生地');
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=zh-CN&q=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent': 'AI-Divination-Formal-MVP/0.2'
        },
        cache: 'no-store'
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (Array.isArray(result) && result.length > 0) {
        return {
          lat: Number(result[0].lat),
          lng: Number(result[0].lon),
          label: result[0].display_name || query
        };
      }
    }
  } catch (error) {
    // 继续走本地兜底
  }

  const fallback = getFallbackPlace(query);
  if (fallback) {
    return fallback;
  }

  throw new Error('未能自动识别该出生地，请换更完整的地名，例如“广东省广州市天河区”。');
}
