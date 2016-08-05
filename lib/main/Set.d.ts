import { Iterable } from "./Iterable";
import { List } from "./List";
import { IOption } from "./Option";
export declare class ISet<A> implements Iterable<A> {
    private data;
    constructor(data: Iterable<A>);
    count(p: (tuple: A) => boolean): number;
    drop(n: number): ISet<A>;
    dropRight(n: number): ISet<A>;
    dropWhile(p: (a: A) => boolean): ISet<A>;
    filter(p: (a: A) => boolean): ISet<A>;
    filterNot(p: (a: A) => boolean): ISet<A>;
    find(p: (a: A) => boolean): IOption<A>;
    foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B;
    foldRight<B>(z: B): (op: (a: A, b: B) => B) => B;
    forEach(f: (a: A) => void): void;
    head(): A;
    headOption(): IOption<A>;
    isEmpty(): boolean;
    iterator(): Iterable<A>;
    add(value: A): ISet<A>;
    map<B>(f: (a: A) => B): ISet<B>;
    size(): number;
    toArray(): A[];
    toList(): List<A>;
    toString(): string;
}
export declare function iSet<A>(iterable: Iterable<A>): ISet<A>;