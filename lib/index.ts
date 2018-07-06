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
     * 判断跟另外一天是否是同一天
     * @param other 另一天
     */
    isSameDate(other: Date): boolean;

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
    toISODateString(): string;
    /**
     * 返回类似 16:03:42 格式的日期字符串
     */
    toISOTimeString(): string;

    /**
     * 返回类似 2018-06-03 16:03:42 格式的时间字符串
     */
    toISODateTimeString(): string;
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

Date.prototype.isToday = function(): boolean {
  return new Date().isSameDate(this);
};

Date.prototype.isYesterday = function(): boolean {
  const yesterday = new Date().dateByAddingDays(-1);
  return this.isSameDate(yesterday);
};

/**
 * 一月返回1， 8 月返回 8
 */
Date.prototype.getRealMonth = function() {
  // JS 中的 month 是 从 0 开始的。
  return this.getMonth() + 1;
};

Date.prototype.toISODateString = function(): string {
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const day = this.getDate();
  return year + "-" + padNumber(month) + "-" + padNumber(day);
};

Date.prototype.toISOTimeString = function(): string {
  const hour = this.getHours();
  const minute = this.getMinutes();
  const second = this.getSeconds();
  return padNumber(hour) + ":" + padNumber(minute) + ":" + padNumber(second);
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

Date.prototype.toISODateTimeString = function(): string {
  return this.toISODateString() + " " + this.toISOTimeString();
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
