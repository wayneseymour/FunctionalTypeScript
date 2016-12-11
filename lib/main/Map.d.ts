import { Iterable } from './Iterable';
import { IList } from './List';
import { Option, IOption } from './Option';
import { ISet } from './Set';
export declare class IMap<K, V> implements Iterable<[K, V]> {
    private _mapData;
    constructor(data: Iterable<[K, V]>);
    count(p: (tuple: [K, V]) => boolean): number;
    drop(n: number): IMap<K, V>;
    dropRight(n: number): IMap<K, V>;
    dropWhile(p: (a: [K, V]) => boolean): IMap<K, V>;
    exists(p: (a: [K, V]) => boolean): boolean;
    filter(p: (a: [K, V]) => boolean): IMap<K, V>;
    filterNot(p: (a: [K, V]) => boolean): IMap<K, V>;
    find(p: (a: [K, V]) => boolean): IOption<[K, V]>;
    foldLeft<B>(z: B): (op: (b: B, a: [K, V]) => B) => B;
    foldRight<B>(z: B): (op: (a: [K, V], b: B) => B) => B;
    forEach(f: (a: [K, V]) => void): void;
    get(key: K): Option<V>;
    getOrElse(key: K, defaultValue: V): V;
    head(): [K, V];
    headOption(): Option<[K, V]>;
    isEmpty(): boolean;
    iterator(): Iterable<[K, V]>;
    set(entry: [K, V] | K, value?: V): IMap<K, V>;
    map<K1, V1>(f: (a: [K, V]) => [K1, V1]): IMap<K1, V1>;
    size(): number;
    toArray(): [K, V][];
    toList(): IList<[K, V]>;
    toSet(): ISet<[K, V]>;
    toString(): string;
}
export declare function iMap<K, V>(iterable: Iterable<[K, V]>): IMap<K, V>;
