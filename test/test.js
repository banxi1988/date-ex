"use strict";
const { assert } = require("chai");
const { padNumber } = require("../dist/index.js");

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
  });
  it("should return hh:mm:SS", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.equal(d1.toISOTimeString(), "19:09:26");
  });
  it("should return yy-mm-dd hh:mm:SS", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.equal(d1.toISODateTimeString(), "2018-06-11 19:09:26");
  });
  it("getMonthDayString", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.equal("06-11", d1.getMonthDayString());
  });
  it("getHourMinuteString", () => {
    const d1 = Date.create(2018, 6, 11, 19, 9, 26);
    assert.equal("19:09", d1.getHourMinuteString());
  });
});

describe("测试日期判断的扩展函数", () => {
  it("isToday", () => {
    const d1 = Date.create(2018, 6, 1);
    const d2 = Date.create(2018, 6, 1);
    const d3 = Date.create(2018, 6, 2);
    assert.isTrue(d1.isSameDate(d2));
    assert.isFalse(d1.isSameDate(d3));
    assert.isTrue(Date.today().isSameDate(new Date()));
  });
});
