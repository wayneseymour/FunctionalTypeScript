"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var List_1 = require('./List');
var Option = (function () {
    function Option(value) {
        this.value = value;
    }
    Option.prototype.count = function (p) {
        return this.toList().count(p);
    };
    Option.prototype.drop = function (n) {
        return this.toList().drop(n);
    };
    Option.prototype.dropRight = function (n) {
        return this.toList().dropRight(n);
    };
    Option.prototype.dropWhile = function (p) {
        return this.toList().dropWhile(p);
    };
    Option.prototype.exists = function (p) {
        return !this.find(p).isEmpty();
    };
    Option.prototype.find = function (p) {
        return p(this.get) ? this : exports.none;
    };
    Option.prototype.forEach = function (f) {
        f(this.value);
    };
    Option.prototype.filter = function (p) {
        return p(this.value) ? this : new None();
    };
    Option.prototype.filterNot = function (p) {
        return !p(this.value) ? this : new None();
    };
    Option.prototype.foldLeft = function (z) {
        return this.toList().foldLeft(z);
    };
    Option.prototype.foldRight = function (z) {
        return this.toList().foldRight(z);
    };
    Object.defineProperty(Option.prototype, "get", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Option.prototype.getOrElse = function (defaultValue) {
        return this.value ? this.value : defaultValue;
    };
    Option.prototype.head = function () {
        return this.get;
    };
    Option.prototype.headOption = function () {
        return this;
    };
    Option.prototype.toArray = function () {
        return this.toList().toArray();
    };
    return Option;
}());
exports.Option = Option;
var Some = (function (_super) {
    __extends(Some, _super);
    function Some(value) {
        _super.call(this, value);
    }
    Some.prototype.isEmpty = function () {
        return false;
    };
    Object.defineProperty(Some.prototype, "get", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Some.prototype.map = function (f) {
        return new Some(f(this.value));
    };
    Some.prototype.size = function () {
        return 1;
    };
    Some.prototype.toList = function () {
        return new List_1.List([this.value]);
    };
    Some.prototype.toString = function () {
        return "Some(" + this.value + ")";
    };
    return Some;
}(Option));
exports.Some = Some;
var None = (function (_super) {
    __extends(None, _super);
    function None() {
        _super.call(this, null);
    }
    None.prototype.isEmpty = function () {
        return true;
    };
    Object.defineProperty(None.prototype, "get", {
        get: function () {
            throw new Error('None.get');
        },
        enumerable: true,
        configurable: true
    });
    None.prototype.map = function (f) {
        return exports.none;
    };
    None.prototype.size = function () {
        return 0;
    };
    None.prototype.toList = function () {
        return new List_1.List([]);
    };
    None.prototype.toString = function () {
        return 'None';
    };
    return None;
}(Option));
exports.None = None;
exports.none = new None();
function option(x) {
    return x ? some(x) : exports.none;
}
exports.option = option;
function some(x) {
    return new Some(x);
}
exports.some = some;
