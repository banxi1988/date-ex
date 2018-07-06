"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Date.prototype.isToday = function () {
    return new Date().isSameDate(this);
};
Date.prototype.isYesterday = function () {
    var yesterday = new Date().dateByAddingDays(-1);
    return this.isSameDate(yesterday);
};
/**
 * 一月返回1， 8 月返回 8
 */
Date.prototype.getRealMonth = function () {
    // JS 中的 month 是 从 0 开始的。
    return this.getMonth() + 1;
};
Date.prototype.toISODateString = function () {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    return year + "-" + padNumber(month) + "-" + padNumber(day);
};
Date.prototype.toISOTimeString = function () {
    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();
    return padNumber(hour) + ":" + padNumber(minute) + ":" + padNumber(second);
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
Date.prototype.toISODateTimeString = function () {
    return this.toISODateString() + " " + this.toISOTimeString();
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
