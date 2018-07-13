/**
 * 常用时间单元，由于 JS 中 Date 的基本单位是 millis 即毫秒。
 * 所以这里也以 millis 为基本单位。
 */
export const enum TimeUnit {
  millisOfSecond = 1000,
  millisOfMinute = millisOfSecond * 60,
  millisOfHour = millisOfMinute * 60,
  millisOfDay = millisOfHour * 24,
  millisOfWeek = millisOfDay * 7
}

/**
 * 时间风格
 */
export enum TimeStyle {
  /**
   * 19:08 风格
   */
  hm = 0,
  /**
   * 19:08:02 风格
   */
  hms = 1
}

/**
 * 日期风格
 */
export enum DateStyle {
  /**
   * 09/02
   */
  md = 0,
  /**
   * 2018-09-02 风格
   */
  ymd = 1,
  /**
   * 2018/09/09 风格
   */
  ymd2 = 2
}

/**
 * 判断年份是否是闰年
 * @param year 年份
 */
export function isLeapYear(year: number) {
  year = Math.floor(year);
  if (year % 4 !== 0) {
    return false;
  } else if (year % 100 !== 0) {
    return true;
  } else if (year % 400 !== 0) {
    return false;
  } else if (year % 3200 === 0) {
    return false;
  } else {
    return true;
  }
}

declare global {
  interface Date {
    /**
     * 返回当前日期增加指定毫秒数后的日期
     * @param millis 周数
     */
    dateByAddingMillis(millis: number): Date;
    /**
     * 返回当前日期增加指定分钟数后的日期
     * @param seconds 周数
     */
    dateByAddingSeconds(seconds: number): Date;
    /**
     * 返回当前日期增加指定分钟数后的日期
     * @param minutes 周数
     */
    dateByAddingMinutes(minutes: number): Date;
    /**
     * 返回当前日期增加指定小时数后的日期
     * @param hours 周数
     */
    dateByAddingHours(hours: number): Date;

    /**
     * 返回当前日期增加指定天数后的日期
     * @param days 周数
     */
    dateByAddingDays(days: number): Date;
    /**
     * 返回当前日期增加指定周数后的日期
     * @param weeks 周数
     */
    dateByAddingWeeks(weeks: number): Date;
    /**
     * 返回月份值，JS 中 getMonth 其实是 monthIndex
     */
    getRealMonth(): number;
    /**
     * 返回 11-03 格式的月份日期字符串
     */
    getMonthDayString(): string;
    /**
     * 返回 16:03 格式的月份日期字符串
     */
    getHourMinuteString(): string;

    /**
     * 返回 iOS 的星期值即，周一返回 1， 周日返回 7
     */
    getISOWeekday(): number;

    // getRelativeDateTimeString():string;
    /**
     * 判断跟另外一个日期是否是同一天
     * @param other 另一个日期对象
     */
    isSameDate(other: Date): boolean;

    /**
     * 判断跟另外一个日期是否是同一年
     * @param other 另一个日期对象
     */
    isSameYear(other: Date): boolean;

    /**
     * 判断是否是闰年
     */
    isLeapYear(): boolean;

    /**
     * 返回对应日期是一年中的第几天 返回 1 到 365 或 1 到 366 （如果是闰年）的数字
     */
    getDayOfYear(): number;

    /**
     * 返回日期在所在年的第几周，一年的一月总应该算是第一周
     */
    getWeekOfYear(): number;

    /**
     * 判断跟另外一个日期是否是同一周
     * @param other 另一个日期对象
     */
    isSameWeek(other: Date): boolean;

    /**
     * 判断是否是今天
     */
    isToday(): boolean;

    /**
     * 判断是否是昨天
     */
    isYesterday(): boolean;

    /**
     * 返回类似 2018-06-03 格式的日期字符串
     */
    toISODateString(dateStyle?: DateStyle): string;
    /**
     * 返回类似 16:03:42 格式的日期字符串
     */
    toISOTimeString(timeStyle?: TimeStyle): string;

    /**
     * 返回类似 2018-06-03 16:03:42 格式的时间字符串
     * 也可以自定义格式
     */
    toISODateTimeString(dateStyle?: DateStyle, timeStyle?: TimeStyle): string;

    /**
     * 返回时分秒为0的对应日期
     */
    toZeroTimeDate(): Date;

    /**
     * 返回类似微信风格相对时间字符串
     */
    toRelativeDateTimeString(): string;

    /**
     * 返回对应时间戳，单位秒
     */
    getTimestamp(): number;
  }

  interface DateConstructor {
    today(): Date;
    create(
      year: number,
      realMonth: number,
      day: number,
      hours: number,
      minutes: number,
      seconds: number,
      milliseconds: number
    ): Date;
  }
}
Date.prototype.dateByAddingMillis = function(millis: number = 1): Date {
  let time = this.getTime();
  return new Date(time + millis);
};
Date.prototype.dateByAddingSeconds = function(hours: number = 1): Date {
  const millis = hours * TimeUnit.millisOfSecond;
  return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingMinutes = function(hours: number = 1): Date {
  const millis = hours * TimeUnit.millisOfMinute;
  return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingHours = function(hours: number = 1): Date {
  const millis = hours * TimeUnit.millisOfHour;
  return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingDays = function(days: number = 1): Date {
  const millis = days * TimeUnit.millisOfDay;
  return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingWeeks = function(weeks: number = 1): Date {
  const millis = weeks * TimeUnit.millisOfWeek;
  return this.dateByAddingMillis(millis);
};

Date.prototype.getMonthDayString = function() {
  return this.toISODateString().substr(5, 5);
};

Date.prototype.getHourMinuteString = function() {
  return this.toISOTimeString().substr(0, 5);
};

Date.prototype.isSameDate = function(other: Date): boolean {
  return (
    this.getFullYear() == other.getFullYear() &&
    this.getMonth() == other.getMonth() &&
    this.getDate() == other.getDate()
  );
};

Date.prototype.isSameYear = function(other: Date): boolean {
  return this.getFullYear() == other.getFullYear();
};

Date.prototype.getISOWeekday = function(): number {
  const day = this.getDay();
  return day === 0 ? 7 : day;
};

Date.prototype.getDayOfYear = function(): number {
  const commonYearMonthIndexDayOfYearMap = [
    0,
    31,
    59,
    90,
    120,
    151,
    181,
    212,
    243,
    273,
    274,
    304,
    334
  ];
  // const leapYearMonthDayOfYearMap =[0,31,60,91,121,152,182,213,244,274,274,305,335]
  const monthIndex = this.getMonth();
  const date = this.getDate();
  const ordinalDay = commonYearMonthIndexDayOfYearMap[monthIndex];
  if (this.isLeapYear() && monthIndex > 0) {
    return ordinalDay + 1 + date;
  } else {
    return ordinalDay + date;
  }
};

declare var console: any;

Date.prototype.getWeekOfYear = function(): number {
  const ordinalDay = this.getDayOfYear();
  const weekday = this.getISOWeekday();
  const adjustDay = ordinalDay - weekday + 10;
  const week = adjustDay / 7;
  // if week < 1; it's last year
  // if week > 53; maybe it's next year
  return Math.floor(week);
};

Date.prototype.toZeroTimeDate = function() {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

Date.prototype.isSameWeek = function(other: Date): boolean {
  let d1 = this.toZeroTimeDate();
  let weekday = this.getISOWeekday();
  let monday = d1.dateByAddingDays(1 - weekday);
  let nextMonday = d1.dateByAddingDays(7 - weekday + 1);
  let time = other.getTime();
  return time > monday.getTime() && time < nextMonday.getTime();
};

Date.prototype.isToday = function(): boolean {
  return new Date().isSameDate(this);
};

Date.prototype.isYesterday = function(): boolean {
  const yesterday = new Date().dateByAddingDays(-1);
  return this.isSameDate(yesterday);
};

Date.prototype.isLeapYear = function(): boolean {
  return isLeapYear(this.getFullYear());
};

/**
 * 一月返回1， 8 月返回 8
 */
Date.prototype.getRealMonth = function() {
  // JS 中的 month 是 从 0 开始的。
  return this.getMonth() + 1;
};

Date.prototype.toISODateString = function(
  dateStyle: DateStyle = DateStyle.ymd
): string {
  const year = this.getFullYear();
  const month = padNumber(this.getMonth() + 1);
  const day = padNumber(this.getDate());
  switch (dateStyle) {
    case DateStyle.md:
      return month + "/" + day;
    case DateStyle.ymd:
      return year + "-" + month + "-" + day;
    case DateStyle.ymd2:
      return year + "/" + month + "/" + day;
  }
};

Date.prototype.toISOTimeString = function(
  timeStyle: TimeStyle = TimeStyle.hms
): string {
  const hour = this.getHours();
  const minute = this.getMinutes();
  const second = this.getSeconds();
  switch (timeStyle) {
    case TimeStyle.hm:
      return padNumber(hour) + ":" + padNumber(minute);
    case TimeStyle.hms:
      return (
        padNumber(hour) + ":" + padNumber(minute) + ":" + padNumber(second)
      );
  }
};

/**
 * 为个位数数字补充前缀 0,(负数除外),小数部分将舍去
 *
 * @param num 整数(小数将被 round)
 * @returns  3 -> "03",  12 -> "12", "3.4" -> "03", "-3" -> "-3"
 */
export function padNumber(num: number): string {
  num = Math.round(num);
  if (num < 10 && num >= 0) {
    return "0" + num;
  } else {
    return num + "";
  }
}

Date.prototype.toISODateTimeString = function(
  dateStyle: DateStyle = DateStyle.ymd,
  timeStyle: TimeStyle = TimeStyle.hms
): string {
  return (
    this.toISODateString(dateStyle) + " " + this.toISOTimeString(timeStyle)
  );
};

Date.prototype.toRelativeDateTimeString = function(): string {
  const date = this;
  const today = new Date();
  const currentTimeStamp = today.getTime() / 1000;
  const dataTimeStamp = date.getTime() / 1000;
  const secondsToNow = Math.floor(Math.abs(currentTimeStamp - dataTimeStamp));

  if (secondsToNow < 60) {
    return "刚刚";
  } else if (secondsToNow < 300) {
    return Math.floor(secondsToNow / 60) + "分钟前";
  } else {
    if (today.isSameDate(date)) {
      return date.getHourMinuteString();
    } else if (today.isSameDate(date.dateByAddingDays(1))) {
      return "昨天 " + date.getHourMinuteString();
    } else if (today.getFullYear() == date.getFullYear()) {
      return (
        padNumber(date.getRealMonth()) +
        "/" +
        padNumber(date.getDate()) +
        " " +
        date.getHourMinuteString()
      );
    } else {
      const str = date.toISODateTimeString();
      return str.substring(0, str.length - 3);
    }
  }
};

Date.prototype.getTimestamp = function() {
  return Math.round(this.getTime() / 1000);
};

Date.today = function() {
  return new Date();
};

Date.create = function(
  year: number,
  realMonth: number = 1,
  day: number = 1,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  milliseconds: number = 0
): Date {
  return new Date(
    year,
    realMonth - 1,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  );
};
