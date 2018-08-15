"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 时间风格
 */
var TimeStyle;
(function (TimeStyle) {
    /**
     * 19:08 风格
     */
    TimeStyle[TimeStyle["hm"] = 0] = "hm";
    /**
     * 19:08:02 风格
     */
    TimeStyle[TimeStyle["hms"] = 1] = "hms";
})(TimeStyle = exports.TimeStyle || (exports.TimeStyle = {}));
/**
 * 日期风格
 */
var DateStyle;
(function (DateStyle) {
    /**
     * 09/02
     */
    DateStyle[DateStyle["md"] = 0] = "md";
    /**
     * 2018-09-02 风格
     */
    DateStyle[DateStyle["ymd"] = 1] = "ymd";
    /**
     * 2018/09/09 风格
     */
    DateStyle[DateStyle["ymd2"] = 2] = "ymd2";
})(DateStyle = exports.DateStyle || (exports.DateStyle = {}));
/**
 * 判断年份是否是闰年
 * @param year 年份
 */
function isLeapYear(year) {
    year = Math.floor(year);
    if (year % 4 !== 0) {
        return false;
    }
    else if (year % 100 !== 0) {
        return true;
    }
    else if (year % 400 !== 0) {
        return false;
    }
    else if (year % 3200 === 0) {
        return false;
    }
    else {
        return true;
    }
}
exports.isLeapYear = isLeapYear;
Date.prototype.dateByAddingMillis = function (millis) {
    if (millis === void 0) { millis = 1; }
    var time = this.getTime();
    return new Date(time + millis);
};
Date.prototype.dateByAddingSeconds = function (hours) {
    if (hours === void 0) { hours = 1; }
    var millis = hours * 1000 /* millisOfSecond */;
    return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingMinutes = function (hours) {
    if (hours === void 0) { hours = 1; }
    var millis = hours * 60000 /* millisOfMinute */;
    return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingHours = function (hours) {
    if (hours === void 0) { hours = 1; }
    var millis = hours * 3600000 /* millisOfHour */;
    return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingDays = function (days) {
    if (days === void 0) { days = 1; }
    var millis = days * 86400000 /* millisOfDay */;
    return this.dateByAddingMillis(millis);
};
Date.prototype.dateByAddingWeeks = function (weeks) {
    if (weeks === void 0) { weeks = 1; }
    var millis = weeks * 604800000 /* millisOfWeek */;
    return this.dateByAddingMillis(millis);
};
Date.prototype.getMonthDayString = function () {
    return this.toISODateString().substr(5, 5);
};
Date.prototype.getHourMinuteString = function () {
    return this.toISOTimeString().substr(0, 5);
};
Date.prototype.isSameDate = function (other) {
    return (this.getFullYear() == other.getFullYear() &&
        this.getMonth() == other.getMonth() &&
        this.getDate() == other.getDate());
};
Date.prototype.isSameYear = function (other) {
    return this.getFullYear() == other.getFullYear();
};
Date.prototype.getISOWeekday = function () {
    var day = this.getDay();
    return day === 0 ? 7 : day;
};
Date.prototype.getDayOfYear = function () {
    var commonYearMonthIndexDayOfYearMap = [
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
    var monthIndex = this.getMonth();
    var date = this.getDate();
    var ordinalDay = commonYearMonthIndexDayOfYearMap[monthIndex];
    if (this.isLeapYear() && monthIndex > 0) {
        return ordinalDay + 1 + date;
    }
    else {
        return ordinalDay + date;
    }
};
Date.prototype.getWeekOfYear = function () {
    var ordinalDay = this.getDayOfYear();
    var weekday = this.getISOWeekday();
    var adjustDay = ordinalDay - weekday + 10;
    var week = adjustDay / 7;
    // if week < 1; it's last year
    // if week > 53; maybe it's next year
    return Math.floor(week);
};
Date.prototype.toZeroTimeDate = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};
Date.prototype.isSameWeek = function (other) {
    var d1 = this.toZeroTimeDate();
    var weekday = this.getISOWeekday();
    var monday = d1.dateByAddingDays(1 - weekday);
    var nextMonday = d1.dateByAddingDays(7 - weekday + 1);
    var time = other.getTime();
    return time > monday.getTime() && time < nextMonday.getTime();
};
Date.prototype.isToday = function () {
    return new Date().isSameDate(this);
};
Date.prototype.isYesterday = function () {
    var yesterday = new Date().dateByAddingDays(-1);
    return this.isSameDate(yesterday);
};
Date.prototype.isLeapYear = function () {
    return isLeapYear(this.getFullYear());
};
/**
 * 一月返回1， 8 月返回 8
 */
Date.prototype.getRealMonth = function () {
    // JS 中的 month 是 从 0 开始的。
    return this.getMonth() + 1;
};
Date.prototype.toISODateString = function (dateStyle) {
    if (dateStyle === void 0) { dateStyle = DateStyle.ymd; }
    var year = this.getFullYear();
    var month = padNumber(this.getMonth() + 1);
    var day = padNumber(this.getDate());
    switch (dateStyle) {
        case DateStyle.md:
            return month + "/" + day;
        case DateStyle.ymd:
            return year + "-" + month + "-" + day;
        case DateStyle.ymd2:
            return year + "/" + month + "/" + day;
    }
};
Date.prototype.toISOTimeString = function (timeStyle) {
    if (timeStyle === void 0) { timeStyle = TimeStyle.hms; }
    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();
    switch (timeStyle) {
        case TimeStyle.hm:
            return padNumber(hour) + ":" + padNumber(minute);
        case TimeStyle.hms:
            return (padNumber(hour) + ":" + padNumber(minute) + ":" + padNumber(second));
    }
};
/**
 * 为个位数数字补充前缀 0,(负数除外),小数部分将舍去
 *
 * @param num 整数(小数将被 round)
 * @returns  3 -> "03",  12 -> "12", "3.4" -> "03", "-3" -> "-3"
 */
function padNumber(num) {
    num = Math.round(num);
    if (num < 10 && num >= 0) {
        return "0" + num;
    }
    else {
        return num + "";
    }
}
exports.padNumber = padNumber;
Date.prototype.toISODateTimeString = function (dateStyle, timeStyle) {
    if (dateStyle === void 0) { dateStyle = DateStyle.ymd; }
    if (timeStyle === void 0) { timeStyle = TimeStyle.hms; }
    return (this.toISODateString(dateStyle) + " " + this.toISOTimeString(timeStyle));
};
Date.prototype.toRelativeDateTimeString = function () {
    var date = this;
    var today = new Date();
    var currentTimeStamp = today.getTime() / 1000;
    var dataTimeStamp = date.getTime() / 1000;
    var secondsToNow = Math.floor(Math.abs(currentTimeStamp - dataTimeStamp));
    if (secondsToNow < 60) {
        return "刚刚";
    }
    else if (secondsToNow < 300) {
        return Math.floor(secondsToNow / 60) + "分钟前";
    }
    else {
        if (today.isSameDate(date)) {
            return date.getHourMinuteString();
        }
        else if (today.isSameDate(date.dateByAddingDays(1))) {
            return "昨天 " + date.getHourMinuteString();
        }
        else if (today.getFullYear() == date.getFullYear()) {
            return (padNumber(date.getRealMonth()) +
                "/" +
                padNumber(date.getDate()) +
                " " +
                date.getHourMinuteString());
        }
        else {
            var str = date.toISODateTimeString(DateStyle.ymd, TimeStyle.hm);
            return str;
        }
    }
};
Date.prototype.getTimestamp = function () {
    return Math.round(this.getTime() / 1000);
};
Date.today = function () {
    return new Date();
};
Date.create = function (year, realMonth, day, hours, minutes, seconds, milliseconds) {
    if (realMonth === void 0) { realMonth = 1; }
    if (day === void 0) { day = 1; }
    if (hours === void 0) { hours = 0; }
    if (minutes === void 0) { minutes = 0; }
    if (seconds === void 0) { seconds = 0; }
    if (milliseconds === void 0) { milliseconds = 0; }
    return new Date(year, realMonth - 1, day, hours, minutes, seconds, milliseconds);
};
