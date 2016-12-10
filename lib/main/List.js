"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Iterable_1 = require('./Iterable');
var Option_1 = require('./Option');
var es6_shim_1 = require('es6-shim');
var Array = es6_shim_1.Array;
/**
 * An Immutable List class in similar to a Scala List. It's important to point out that this list is not infact a real
 * Linked List in the traditional sense, instead it is backed by a AypeScript/JavaScript Array for simplicity and
 * performance reasons (i.e., arrays are heavily optimized by VMs) so unless there's a good reason to impliement a
 * traditional List this will remain this way. Externally the List Interface will ensure immutabliy by returning new
 * instances of the List and will not mutate the List or the underlying Array in any way.
 */
var List = (function () {
    function List(args) {
        var _this = this;
        if (args instanceof es6_shim_1.Array) {
            this._listData = args.concat([]);
        }
        else {
            this._listData = [];
            args.forEach(function (item) {
                _this._listData.push(item);
            });
        }
    }
    List.prototype.contains = function (elem) {
        return this._listData.indexOf(elem) > -1;
    };
    List.prototype.count = function (p) {
        return this._listData.filter(p).length;
    };
    List.prototype.drop = function (n) {
        return list(this._listData.slice(n));
    };
    List.prototype.dropRight = function (n) {
        return list(this._listData.slice(0, n));
    };
    List.prototype.dropWhile = function (p) {
        throw new Error('dropWhile');
    };
    List.prototype.exists = function (p) {
        return !this.find(p).isEmpty();
    };
    List.prototype.filter = function (p) {
        return list(this._listData.filter(p));
    };
    List.prototype.filterNot = function (p) {
        var inverse = function (a) {
            return !p(a);
        };
        return list(this._listData.filter(inverse));
    };
    List.prototype.find = function (p) {
        return Option_1.option(this._listData.find(p));
    };
    List.prototype.foldLeft = function (z) {
        var _this = this;
        var accumulator = z;
        return function (op) {
            _this.forEach(function (item) {
                accumulator = op(accumulator, item);
            });
            return accumulator;
        };
    };
    List.prototype.foldRight = function (z) {
        var reversedList = this.reverse();
        var accumulator = z;
        // Couldn't get delegate call to foldLeft here, TypeScript compiler issue? or bad syntax?
        return function (op) {
            reversedList.forEach(function (item) {
                accumulator = op(item, accumulator);
            });
            return accumulator;
        };
    };
    List.prototype.forEach = function (f) {
        [].concat(this._listData).forEach(f);
    };
    List.prototype._ = function (index) {
        return this.get(index);
    };
    List.prototype.get = function (index) {
        return this._listData[index];
    };
    List.prototype.head = function () {
        return this._listData[0];
    };
    List.prototype.headOption = function () {
        return Option_1.option(this.head());
    };
    List.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    List.prototype.iterator = function () {
        return new ListIterator(this._listData.values(), this);
    };
    List.prototype.map = function (f) {
        var newArray = this._listData.map(f);
        return list(newArray);
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            return this._listData.length;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.reduce = function (op) {
        return this._listData.reduce(op);
    };
    List.prototype.reverse = function () {
        return new List([].concat(this._listData).reverse());
    };
    List.prototype.size = function () {
        return this.length;
    };
    List.prototype.toArray = function () {
        return [].concat(this._listData);
    };
    List.prototype.toList = function () {
        return list(this._listData);
    };
    List.prototype.toString = function () {
        var rawString = this._listData.join(', ');
        return "List(" + rawString + ")";
    };
    List.prototype.union = function (that) {
        if (that instanceof List) {
            return list(this._listData.concat(that.toArray()));
        }
        else if (that instanceof Array) {
            return list((_a = this._listData).concat.apply(_a, that));
        }
        else {
            throw 'Unsupported Type ' + typeof that;
        }
        var _a;
    };
    return List;
}());
exports.List = List;
function list(args) {
    return new List(args);
}
exports.list = list;
var ListIterator = (function (_super) {
    __extends(ListIterator, _super);
    function ListIterator() {
        _super.apply(this, arguments);
    }
    return ListIterator;
}(Iterable_1.IterableImpl));
