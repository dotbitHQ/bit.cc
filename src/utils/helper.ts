export function retainNum(num: number, size = 2): Number {
  if (isNaN(num)) return 0
  const p = 10 ** size
  return Math.round(num * p) / p
}

/**
 * 时间转为秒
 * @param time 时间(00:00:00)
 * @returns {string} 时间戳（单位：秒）
 */
export function timeToSec(time = '00:00:00'): number {
  var hour = Number(time.split(':')[0]);
  var min = Number(time.split(':')[1]);
  var sec = time.split(':')[2];
  var s =Number(hour * 3600) + Number(min * 60) + Number(sec);
  return s;
};

export function isPromise(v: any) {
  return v !== undefined && v !== null && typeof v.then === 'function'
}

export function silencePromise(value: any) {
  if (isPromise(value)) {
    value.then(null, () => { })
  }
}

export function formatSeconds(time: number, isHour = false): string {
  var theTime: number = Math.floor(time) // 秒
  var theTime1: number = 0 // 分
  var theTime2: number = 0 // 小时
  if (theTime > 60) {
    theTime1 = Math.floor(theTime / 60)
    theTime = Math.floor(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = Math.floor(theTime1 / 60)
      theTime1 = Math.floor(theTime1 % 60)
    }
  }
  var result = '' + Math.floor(theTime)
  if (Number(result) < 10) {
    result = '0' + result
  }
  if (theTime1 > 0) {
    result = '' + Math.floor(theTime1) + ':' + result
    if (theTime1 < 10) {
      result = '0' + result
    }
  } else {
    result = '00:' + result
  }
  if (theTime2 > 0) {
    result = '' + Math.floor(theTime2) + ':' + result
    if (theTime2 < 10) {
      result = '0' + result
    }
  } else if (isHour) {
    result = '00:' + result
  }
  return result
}

