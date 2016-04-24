/**
 * Created by Jordan on 4/23/2016.
 */
export declare class Option<T> {
    protected value: T;
    isEmpty: boolean;
    constructor(value: T);
    map(f: (object: T) => any): Some<any>;
    get: T;
    getOrElse(defaultValue: T): T;
}
export declare class Some<T> extends Option<T> {
    constructor(value: T);
    isEmpty: boolean;
    get: T;
}
export declare class None<T> extends Option<T> {
    constructor(none?: T);
    isEmpty: boolean;
    get: T;
}
export declare function option<T>(x: T): Option<T>;
export declare function some<T>(x: T): Some<T>;
export declare const none: None<any>;
