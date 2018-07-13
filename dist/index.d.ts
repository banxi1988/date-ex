/**
 * 常用时间单元，由于 JS 中 Date 的基本单位是 millis 即毫秒。
 * 所以这里也以 millis 为基本单位。
 */
export declare const enum TimeUnit {
    millisOfSecond = 1000,
    millisOfMinute = 60000,
    millisOfHour = 3600000,
    millisOfDay = 86400000,
    millisOfWeek = 604800000
}
/**
 * 时间风格
 */
export declare enum TimeStyle {
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
export declare enum DateStyle {
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
export declare function isLeapYear(year: number): boolean;
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
        create(year: number, realMonth: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number): Date;
    }
}
/**
 * 为个位数数字补充前缀 0,(负数除外),小数部分将舍去
 *
 * @param num 整数(小数将被 round)
 * @returns  3 -> "03",  12 -> "12", "3.4" -> "03", "-3" -> "-3"
 */
export declare function padNumber(num: number): string;
