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
        create(year: number, realMonth: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number): Date;
    }
}
export declare function padNumber(num: number): string;
