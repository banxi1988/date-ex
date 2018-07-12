"use strict";
const { assert } = require("chai");
const {
  padNumber,
  isLeapYear,
  DateStyle,
  TimeStyle
} = require("../dist/index.js");

describe("测试 Date 创建类扩展函数", () => {
  it("ceate", () => {
    const d1 = Date.create(2018, 6, 11, 19, 48, 31, 640);
    assert.equal(d1.getRealMonth(), 6);
    assert.equal(d1.getFullYear(), 2018);
    assert.equal(d1.getDate(), 11);
    assert.equal(d1.getHours(), 19);
    assert.equal(d1.getMinutes(), 48);
    assert.equal(d1.getSeconds(), 31);
    assert.equal(d1.getMilliseconds(), 640);

    const d2 = Date.create(2018);
    assert.equal(d2.getFullYear(), 2018);
    assert.equal(d2.getRealMonth(), 1);
    assert.equal(d2.getDate(), 1);
    assert.equal(d2.getHours(), 0);
    assert.equal(d2.getMinutes(), 0);
    assert.equal(d2.getSeconds(), 0);
    assert.equal(d2.getMilliseconds(), 0);
  });
  it("getRealMonth", () => {
    const d1 = new Date(2018, 6, 11);
    assert.equal(d1.getRealMonth(), 7);
    const d2 = new Date(2018, 0, 11);
    assert.equal(d2.getRealMonth(), 1);
  });
  it("dateByAddingMillis", () => {
    const d1 = new Date();
    const d2 = d1.dateByAddingMillis(60);
    assert.equal(d2.getTime(), d1.getTime() + 60);
    const d3 = d1.dateByAddingMillis(-120);
    assert.equal(d3.getTime(), d1.getTime() - 120);

    const d4 = d1.dateByAddingMillis();
    assert.equal(d4.getTime(), d1.getTime() + 1);
  });
  it("dateByAddingMinutes", () => {
    const d1 = new Date(2018, 6, 11, 17, 27, 30);
    const d2 = d1.dateByAddingMinutes(2);
    assert.equal(d2.getMinutes(), d1.getMinutes() + 2);
    assert.equal(d2.getHours(), d1.getHours());
    assert.equal(d2.getSeconds(), d1.getSeconds());
    assert.equal(d2.getDate(), d1.getDate());
    const d3 = d1.dateByAddingMinutes(-2);
    assert.equal(d3.getMinutes(), d1.getMinutes() - 2);

    const d4 = d1.dateByAddingMinutes();
    assert.equal(d4.getMinutes(), d1.getMinutes() + 1);
  });

  it("dateByAddingSeconds", () => {
    const d1 = new Date(2018, 6, 11, 17, 27, 30);
    const d2 = d1.dateByAddingSeconds(2);
    assert.equal(d2.getSeconds(), d1.getSeconds() + 2);
    assert.equal(d2.getMinutes(), d1.getMinutes());
    assert.equal(d2.getHours(), d1.getHours());
    assert.equal(d2.getDate(), d1.getDate());
    const d3 = d1.dateByAddingSeconds(-2);
    assert.equal(d3.getSeconds(), d1.getSeconds() - 2);

    const d4 = d1.dateByAddingSeconds();
    assert.equal(d4.getSeconds(), d1.getSeconds() + 1);
  });

  it("dateByAddingHours", () => {
    const d1 = Date.create(2018, 6, 11, 17, 27, 30);
    const d2 = d1.dateByAddingHours(2);
    assert.equal(d2.getSeconds(), d1.getSeconds());
    assert.equal(d2.getMinutes(), d1.getMinutes());
    assert.equal(d2.getHours(), d1.getHours() + 2);
    assert.equal(d2.getDate(), d1.getDate());
    const d3 = d1.dateByAddingHours(-2);
    assert.equal(d3.getHours(), d1.getHours() - 2);
    const d4 = d1.dateByAddingHours();
    assert.equal(d4.getHours(), d1.getHours() + 1);
  });

  it("dateByAddingDays", () => {
    const d1 = new Date(2018, 6, 11, 17, 27, 30);
    const d2 = d1.dateByAddingDays(2);
    assert.equal(d2.getSeconds(), d1.getSeconds());
    assert.equal(d2.getMinutes(), d1.getMinutes());
    assert.equal(d2.getHours(), d1.getHours());
    assert.equal(d2.getDate(), d1.getDate() + 2);
    const d3 = d1.dateByAddingDays(-2);
    assert.equal(d3.getDate(), d1.getDate() - 2);

    const d4 = d1.dateByAddingDays();
    assert.equal(d4.getDate(), d1.getDate() + 1);
  });
  it("dateByAddingWeeks", () => {
    const d1 = Date.create(2018, 6, 11, 19, 27, 30);
    const d2 = d1.dateByAddingWeeks(2);
    assert.equal(d2.getSeconds(), d1.getSeconds());
    assert.equal(d2.getMinutes(), d1.getMinutes());
    assert.equal(d2.getHours(), d1.getHours());
    assert.equal(d2.getDate(), d1.getDate() + 14);
    assert.equal(d2.getMonth(), d1.getMonth());
    const d3 = d1.dateByAddingWeeks(-1);
    assert.equal(d3.getDate(), 4);
    assert.equal(d3.getMonth(), d1.getMonth());
    const d4 = d1.dateByAddingWeeks(-2);
    assert.equal(d4.getDate(), 28);
    assert.equal(d4.getRealMonth(), 5);

    const d5 = d1.dateByAddingWeeks();
    assert.equal(d5.getDate(), 18);
    assert.equal(d5.getMonth(), d1.getMonth());
  });

  it("today", () => {
    const today = Date.today();
    // 除以 1000 是为了消除调用前后轻微的差别
    assert.equal(today.getTime() / 1000, Date.now() / 1000);
  });
});

describe("测试格式化类 日期扩展函数", () => {
  it("test padNumber", () => {
    assert.equal(padNumber(3), "03");
    assert.equal(padNumber(11), "11");
    assert.equal(padNumber(10), "10");
  });

  it("should return yy-mm-dd", () => {
    const d1 = Date.create(2018, 6, 11);
    assert.equal(d1.toISODateString(), "2018-06-11");
    const d2 = new Date("2018-07-06T00:13:12.976Z");
    assert.strictEqual(d2.toISODateString(), "2018-07-06");
  });

  it("should return mm/dd", () => {
    const d1 = Date.create(2018, 6, 11);
    assert.equal(d1.toISODateString(DateStyle.md), "06/11");
  });
  it("should return yyyy/mm/dd", () => {
    const d1 = Date.create(2018, 6, 11);
    assert.equal(d1.toISODateString(DateStyle.ymd2), "2018/06/11");
  });

  it("should return hh:mm:SS", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.equal(d1.toISOTimeString(), "19:09:26");
    const d2 = new Date("2018-07-06T00:13:12.976Z");
    assert.strictEqual(d2.toISOTimeString(), "08:13:12");
  });

  it("should return hh:mm", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9);
    assert.equal(d1.toISOTimeString(TimeStyle.hm), "19:09");
  });

  it("should return yy-mm-dd hh:mm:SS", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.equal(d1.toISODateTimeString(), "2018-06-11 19:09:26");
    const d2 = new Date("2018-07-06T00:13:12.976Z");
    assert.strictEqual(d2.toISODateTimeString(), "2018-07-06 08:13:12");
  });

  it("getMonthDayString", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.strictEqual("06-11", d1.getMonthDayString());
    const d2 = new Date("2018-07-06T00:13:12.976Z");
    assert.strictEqual(d2.getMonthDayString(), "07-06");
  });

  it("getHourMinuteString", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.strictEqual("19:09", d1.getHourMinuteString());
    const d2 = new Date("2018-07-06T00:13:12.976Z");
    assert.strictEqual(d2.getHourMinuteString(), "08:13");
  });
});

describe("测试日期判断的扩展函数", () => {
  it("isSameYear", () => {
    const d1 = new Date();
    const d2 = new Date();
    assert.isTrue(d1.isSameYear(d2));

    const d3 = Date.create(2018, 6, 1);
    const d4 = Date.create(2019, 1, 1);
    assert.isFalse(d3.isSameYear(d4));
  });

  it("isSameDate", () => {
    assert.isTrue(new Date().isSameDate(new Date()));
    const d3 = Date.create(2018, 6, 1);
    const d4 = Date.create(2018, 6, 0);
    assert.isFalse(d3.isSameDate(d4));
  });

  it("isSameWeek", () => {});

  it("isToday", () => {
    const d1 = Date.create(2018, 6, 1);
    const d2 = Date.create(2018, 6, 1);
    const d3 = Date.create(2018, 6, 2);
    assert.isTrue(d1.isSameDate(d2));
    assert.isFalse(d1.isSameDate(d3));
    assert.isTrue(Date.today().isSameDate(new Date()));
    assert.isTrue(new Date().isToday());
    assert.isFalse(new Date(2018, 6, 3).isToday());
  });

  it("isYesterday", () => {
    const d1 = new Date();
    assert.isFalse(d1.isYesterday(), "now was not yesterday");
    const d2 = new Date().dateByAddingDays(-1);
    assert.isTrue(d2.isYesterday());

    const d3 = new Date().dateByAddingDays(1);
    assert.isFalse(d3.isYesterday());
  });

  it("isSameWeek", () => {
    const d1 = Date.create(2018, 7, 2);
    const d2 = Date.create(2018, 7, 7);
    const d3 = Date.create(2018, 7, 9);
    assert.isTrue(d1.isSameWeek(d2));
    assert.isFalse(d1.isSameWeek(d3));

    // 跨年
    const d5 = Date.create(2018, 12, 31); // 周一
    const d6 = Date.create(2019, 1, 1); // 周二
    const d7 = Date.create(2019, 1, 6); // 周日
    const d8 = Date.create(2019, 1, 7); //  下周一
    assert.isTrue(d5.isSameWeek(d6));
    assert.isTrue(d5.isSameWeek(d7));
    assert.isFalse(d5.isSameWeek(d8));
  });
});

describe("测试其他扩展属性", () => {
  it("getISOWeekday", () => {
    const d1 = Date.create(2018, 7, 6);
    assert.strictEqual(5, d1.getISOWeekday());
    const d2 = Date.create(2018, 7, 7);
    assert.strictEqual(6, d2.getISOWeekday());
    const d3 = Date.create(2018, 7, 8);
    assert.strictEqual(7, d3.getISOWeekday());
    const d4 = Date.create(2018, 7, 9);
    assert.strictEqual(1, d4.getISOWeekday());
  });

  it("getDayOfYear", () => {
    const d1 = Date.create(2018, 1, 1);
    assert.strictEqual(d1.getDayOfYear(), 1);
    const d2 = Date.create(2018, 1, 7);
    assert.strictEqual(d2.getDayOfYear(), 7);
    const d3 = Date.create(2018, 2, 7);
    assert.strictEqual(d3.getDayOfYear(), 38);
  });

  it("getWeekOfYear", () => {
    const d1 = Date.create(2018, 1, 1);
    assert.strictEqual(d1.getWeekOfYear(), 1);
    const d2 = Date.create(2018, 1, 8);
    assert.strictEqual(d2.getWeekOfYear(), 2);
    const d3 = Date.create(2018, 1, 13);
    assert.strictEqual(d3.getWeekOfYear(), 2);
    const d4 = Date.create(2018, 1, 14, 12);
    assert.strictEqual(d4.getWeekOfYear(), 2);
    const d5 = Date.create(2018, 1, 15);
    assert.strictEqual(d5.getWeekOfYear(), 3);
    const d6 = Date.create(2018, 1, 21);
    assert.strictEqual(d6.getWeekOfYear(), 3);
    const d7 = Date.create(2018, 1, 22);
    assert.strictEqual(d7.getWeekOfYear(), 4);
  });
});

describe("测试 padNumber 函数", () => {
  it("padNumber", () => {
    assert.strictEqual(padNumber(3), "03");
    assert.strictEqual(padNumber(23), "23");
    assert.strictEqual(padNumber(0), "00");
    assert.strictEqual(padNumber(3.4), "03");
    assert.strictEqual(padNumber(3.6), "04");
    assert.strictEqual(padNumber(-3.4), "-3");
    assert.strictEqual(padNumber(-3.6), "-4");
  });
});

describe("测试 isLeapYear 判断函数", () => {
  it("isLeepYear", () => {
    assert.isFalse(isLeapYear(1977));
    assert.isFalse(isLeapYear(1978));
    assert.isFalse(isLeapYear(1982));
    assert.isFalse(isLeapYear(1994));
    assert.isTrue(isLeapYear(1980));
    assert.isTrue(isLeapYear(1984));
    assert.isTrue(isLeapYear(1988));
    assert.isTrue(isLeapYear(1992));
    assert.isTrue(isLeapYear(1996));
    assert.isTrue(isLeapYear(2000));
    assert.isTrue(isLeapYear(2004));
    assert.isTrue(isLeapYear(2008));
    assert.isTrue(isLeapYear(2012));
    assert.isTrue(isLeapYear(2016));
    assert.isTrue(isLeapYear(2020));
    assert.isTrue(isLeapYear(2024));
    assert.isFalse(isLeapYear(1700));
    assert.isFalse(isLeapYear(1800));
    assert.isFalse(isLeapYear(1900));
    assert.isFalse(isLeapYear(2100));
    assert.isFalse(isLeapYear(2200));
    assert.isFalse(isLeapYear(2300));
    assert.isTrue(isLeapYear(1600));
  });
});

describe("测试相对时间转换函数", () => {
  const now = new Date();
  it("[0s，60s） 间隔区间,刚刚 ", () => {
    assert.strictEqual(now.toRelativeDateTimeString(), "刚刚");
    const d1 = now.dateByAddingSeconds(30);
    assert.strictEqual(d1.toRelativeDateTimeString(), "刚刚");
    const d2 = now.dateByAddingSeconds(-59);
    assert.strictEqual(d2.toRelativeDateTimeString(), "刚刚");
    const d3 = now.dateByAddingSeconds(-60);
    assert.strictEqual(d3.toRelativeDateTimeString(), "1分钟前");
  });
  it("[60s,300s) 间隔区间，几分钟前", () => {
    const d1 = now.dateByAddingSeconds(-59);
    assert.strictEqual(d1.toRelativeDateTimeString(), "刚刚");
    const d2 = now.dateByAddingSeconds(-60);
    assert.strictEqual(d2.toRelativeDateTimeString(), "1分钟前");
    const d3 = now.dateByAddingSeconds(-240);
    assert.strictEqual(d3.toRelativeDateTimeString(), "4分钟前");
    const d4 = now.dateByAddingSeconds(-300);
    const d5 = now.dateByAddingMinutes(-5);
    assert.strictEqual(d4.toRelativeDateTimeString(), d5.getHourMinuteString());
    const d6 = now.dateByAddingSeconds(-301);
    const d7 = now.dateByAddingMinutes(-5);
    assert.strictEqual(d6.toRelativeDateTimeString(), d7.getHourMinuteString());
    const d8 = now.dateByAddingMinutes(-3);
    assert.strictEqual(d8.toRelativeDateTimeString(), "3分钟前");
  });
  it("[300s,24h)", () => {
    const d1 = now.dateByAddingMinutes(-6);
    if (d1.isSameDate(now)) {
      assert.strictEqual(
        d1.toRelativeDateTimeString(),
        d1.getHourMinuteString()
      );
    } else {
      assert.strictEqual(
        d1.toRelativeDateTimeString(),
        "昨天 " + d1.getHourMinuteString()
      );
    }
  });
  it("昨天", () => {
    const d1 = now.dateByAddingDays(-1);
    assert.strictEqual(
      d1.toRelativeDateTimeString(),
      "昨天 " + d1.getHourMinuteString()
    );
  });
  it("今年内", () => {
    const d1 = now.dateByAddingDays(-3);
    if (d1.getFullYear() == now.getFullYear()) {
      assert.strictEqual(
        d1.toRelativeDateTimeString().length,
        "07/02 15:20".length
      );
    }
  });
  it("很久以前", () => {
    const d3 = new Date("2017-07-22T07:20:00Z");
    assert.strictEqual(d3.toRelativeDateTimeString(), "2017-07-22 15:20");
  });
});
