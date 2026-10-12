import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Load this standalone ESM utility without changing the package's module type.
const source = await readFile(new URL('../src/date_utils.js', import.meta.url), 'utf8');
const { default: date_utils } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

test('Parse: parses string date', () => {
    const date = date_utils.parse('2017-09-09');

    assert.strictEqual(date.getDate(), 9);
    assert.strictEqual(date.getMonth(), 8);
    assert.strictEqual(date.getFullYear(), 2017);
});

test('Parse: parses string datetime', () => {
    const date = date_utils.parse('2017-08-27 16:08:34');

    assert.strictEqual(date.getFullYear(), 2017);
    assert.strictEqual(date.getMonth(), 7);
    assert.strictEqual(date.getDate(), 27);
    assert.strictEqual(date.getHours(), 16);
    assert.strictEqual(date.getMinutes(), 8);
    assert.strictEqual(date.getSeconds(), 34);
});

test('Parse: parses string datetime', () => {
    const date = date_utils.parse('2016-02-29 16:08:34.3');

    assert.strictEqual(date.getFullYear(), 2016);
    assert.strictEqual(date.getMonth(), 1);
    assert.strictEqual(date.getDate(), 29);
    assert.strictEqual(date.getHours(), 16);
    assert.strictEqual(date.getMinutes(), 8);
    assert.strictEqual(date.getSeconds(), 34);
    assert.strictEqual(date.getMilliseconds(), 300);
});

test('Parse: parses string datetime', () => {
    const date = date_utils.parse('2015-07-01 00:00:59.200');

    assert.strictEqual(date.getFullYear(), 2015);
    assert.strictEqual(date.getMonth(), 6);
    assert.strictEqual(date.getDate(), 1);
    assert.strictEqual(date.getHours(), 0);
    assert.strictEqual(date.getMinutes(), 0);
    assert.strictEqual(date.getSeconds(), 59);
    assert.strictEqual(date.getMilliseconds(), 200);
});

test('Format: converts date object to string', () => {
    const date = new Date(2017, 8, 18);
    assert.strictEqual(date_utils.to_string(date), '2017-09-18');
});

test('Format: converts date object to string', () => {
    const date = new Date('2016-02-29 16:08:34.3');
    assert.strictEqual(date_utils.to_string(date, true), '2016-02-29 16:08:34.300');
});

test('Format: converts date object to string', () => {
    const date = new Date('2016-02-29 16:08:34.3');
    assert.strictEqual(date_utils.to_string(date, true), '2016-02-29 16:08:34.300');
});

test('Parse: returns Date Object as is', () => {
    const d = new Date();
    const date = date_utils.parse(d);

    assert.strictEqual(d, date);
});

test('Diff: returns diff between 2 date objects', () => {
    const a = date_utils.parse('2017-09-08');
    const b = date_utils.parse('2017-06-07');

    assert.strictEqual(date_utils.diff(a, b, 'day'), 93);
    assert.strictEqual(date_utils.diff(a, b, 'month'), 3.1);
    assert.strictEqual(date_utils.diff(a, b, 'year'), 3.1 / 12);
});

test('StartOf', () => {
    const date = date_utils.parse('2017-08-12 15:07:34.012');

    const start_of_millisecond = date_utils.start_of(date, 'millisecond');
    assert.strictEqual(date_utils.to_string(start_of_millisecond, true), 
        '2017-08-12 15:07:34.012'
    );

    const start_of_second = date_utils.start_of(date, 'second');
    assert.strictEqual(date_utils.to_string(start_of_second, true), 
        '2017-08-12 15:07:34.000'
    );

    const start_of_minute = date_utils.start_of(date, 'minute');
    assert.strictEqual(date_utils.to_string(start_of_minute, true), 
        '2017-08-12 15:07:00.000'
    );

    const start_of_hour = date_utils.start_of(date, 'hour');
    assert.strictEqual(date_utils.to_string(start_of_hour, true), 
        '2017-08-12 15:00:00.000'
    );

    const start_of_day = date_utils.start_of(date, 'day');
    assert.strictEqual(date_utils.to_string(start_of_day, true), 
        '2017-08-12 00:00:00.000'
    );

    const start_of_month = date_utils.start_of(date, 'month');
    assert.strictEqual(date_utils.to_string(start_of_month, true), 
        '2017-08-01 00:00:00.000'
    );

    const start_of_year = date_utils.start_of(date, 'year');
    assert.strictEqual(date_utils.to_string(start_of_year, true), 
        '2017-01-01 00:00:00.000'
    );
});

test('format', () => {
    const date = date_utils.parse('2017-08-12 15:07:23');
    assert.strictEqual(date_utils.format(date, 'YYYY-MM-DD'), '2017-08-12');
});

test('format', () => {
    const date = date_utils.parse('2016-02-29 16:08:34.3');
    assert.strictEqual(date_utils.format(date), '2016-02-29 16:08:34.300');
});

