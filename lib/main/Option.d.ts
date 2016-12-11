import { Iterable } from './Iterable';
import { IList } from './List';
import { ISet } from "./Set";
export interface IOption<A> extends Iterable<A> {
    get: A;
}
export declare abstract class Option<A> implements IOption<A> {
    protected value: A;
    abstract isEmpty(): boolean;
    constructor(value: A);
    count(p: (x: A) => boolean): number;
    drop(n: number): Iterable<A>;
    dropRight(n: number): Iterable<A>;
    dropWhile(p: (a: A) => boolean): Iterable<A>;
    exists(p: (a: A) => boolean): boolean;
    find(p: (a: A) => boolean): IOption<A>;
    forEach(f: (a: A) => void): void;
    filter(p: (a: A) => boolean): Option<A>;
    filterNot(p: (a: A) => boolean): Option<A>;
    foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B;
    foldRight<B>(z: B): (op: (a: A, b: B) => B) => B;
    abstract map<B>(f: (object: A) => B): Option<B>;
    readonly get: A;
    getOrElse(defaultValue: A): A;
    head(): A;
    headOption(): Option<A>;
    abstract size(): number;
    toArray(): A[];
    abstract toList(): IList<A>;
    abstract toSet(): ISet<A>;
    abstract toString(): string;
}
export declare class Some<A> extends Option<A> {
    constructor(value: A);
    isEmpty(): boolean;
    readonly get: A;
    map<B>(f: (object: A) => B): Option<B>;
    size(): number;
    toList(): IList<A>;
    toSet(): ISet<A>;
    toString(): string;
}
export declare class None<A> extends Option<A> {
    constructor();
    isEmpty(): boolean;
    readonly get: A;
    map<B>(f: (object: A) => B): Option<B>;
    size(): number;
    toList(): IList<A>;
    toSet(): ISet<A>;
    toString(): string;
}
export declare const none: None<any>;
export declare function option<T>(x: T): Option<T>;
export declare function some<T>(x: T): Some<T>;
