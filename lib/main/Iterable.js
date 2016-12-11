"use strict";
var Option_1 = require('./Option');
var IterableImpl = (function () {
    function IterableImpl(iterator, data) {
        this._iterator = iterator;
        this._data = data;
    }
    IterableImpl.prototype.count = function (p) {
        var count = 0;
        for (var i = this._iterator.next(); !i.done; i = this._iterator.next()) {
            var result = p(i.value);
            count = result ? count + 1 : count;
        }
        return count;
    };
    IterableImpl.prototype.exists = function (p) {
        return !this.find(p).isEmpty();
    };
    IterableImpl.prototype.find = function (p) {
        return this._data.find(p);
    };
    IterableImpl.prototype.forEach = function (f) {
        for (var i = this._iterator.next(); !i.done; i = this._iterator.next()) {
            f(i.value);
        }
    };
    IterableImpl.prototype.foldLeft = function (z) {
        return this._data.foldLeft(z);
    };
    IterableImpl.prototype.foldRight = function (z) {
        return this._data.foldRight(z);
    };
    IterableImpl.prototype.head = function () {
        return this._iterator.next().value;
    };
    IterableImpl.prototype.headOption = function () {
        return Option_1.option(this.head());
    };
    IterableImpl.prototype.isEmpty = function () {
        return this._data.size() === 0;
    };
    IterableImpl.prototype.iterator = function () {
        return this;
    };
    IterableImpl.prototype.drop = function (n) {
        return this._data.drop(n);
    };
    IterableImpl.prototype.dropRight = function (n) {
        return this._data.dropRight(n);
    };
    IterableImpl.prototype.dropWhile = function (p) {
        return this._data.dropWhile(p);
    };
    IterableImpl.prototype.filter = function (p) {
        return this._data.filter(p);
    };
    IterableImpl.prototype.filterNot = function (p) {
        return this._data.filterNot(p);
    };
    IterableImpl.prototype.map = function (f) {
        return this._data.map(f);
    };
    IterableImpl.prototype.size = function () {
        return this._data.size();
    };
    IterableImpl.prototype.toArray = function () {
        return this.toList().toArray();
    };
    IterableImpl.prototype.toList = function () {
        return this._data.toList();
    };
    IterableImpl.prototype.toSet = function () {
        return this._data.toSet();
    };
    return IterableImpl;
}());
exports.IterableImpl = IterableImpl;
