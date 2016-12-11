import {option, Option, IOption} from './Option';
import {list, List, IList} from './List';
import {ISet} from './Set';

export interface Iterable<A> {

  count(p : (x : A) => boolean) : number;

  find(p: (a: A) => boolean): IOption<A>;

  forEach(f: (a : A) => void);

  drop(n : number) : Iterable<A>;

  dropRight(n : number) : Iterable<A>;

  dropWhile(p: (a: A) => boolean) : Iterable<A>;

  exists(p: (a: A) => boolean): Boolean;

  filter(p: (a: A) => boolean) : Iterable<A>;

  filterNot(p: (a: A) => boolean) : Iterable<A>;

  //flatten<B>() : Iterable<B>;

  foldLeft<B>(z: B): (op: (b : B, a : A) => B) => B;

  foldRight<B>(z: B): (op: (a : A, b : B) => B) => B;

  head(): A;

  headOption(): IOption<A>;

  isEmpty() : boolean;

  map<B>(f : (a : A) => B) : Iterable<B>;

  size(): number;

  toArray() : A[];

  toList() : IList<A>;

  toSet() : ISet<A>;
}

export abstract class IterableImpl<A> implements Iterable<A> {

  private _iterator : Iterator<A>;
  private _data : Iterable<A>;

  constructor(iterator : Iterator<A>, data ?: Iterable<A>) {
    this._iterator = iterator;
    this._data = data;
  }

  public count(p : (x : A) => Boolean) : number {
    let count = 0;
    for (let i = this._iterator.next(); !i.done; i = this._iterator.next()) {
      const result = p(i.value);
      count = result ? count + 1 : count;
    }
    return count;
  }

  public exists(p: (a: A) => boolean): Boolean {
    return !this.find(p).isEmpty();
  }

  public find(p: (a: A) => boolean): IOption<A> {
    return this._data.find(p);
  }

  public forEach(f: (a : A) => void) {
    for (let i = this._iterator.next(); !i.done; i = this._iterator.next()) {
      f(i.value);
    }
  }

  public foldLeft<B>(z: B): (op: (b : B, a : A) => B) => B {
    return this._data.foldLeft(z);
  }

  public foldRight<B>(z: B): (op: (a : A, b : B) => B) => B {
    return this._data.foldRight(z);
  }

  public head(): A {
    return this._iterator.next().value;
  }

  public headOption(): Option<A> {
    return option(this.head());
  }

  public isEmpty() : boolean {
    return this._data.size() === 0;
  }

  public iterator(): Iterable<A> {
    return this;
  }

  public drop(n : number) : Iterable<A> {
    return this._data.drop(n);
  }

  public dropRight(n : number) : Iterable<A> {
    return this._data.dropRight(n);
  }

  public dropWhile(p: (a: A) => boolean) : Iterable<A> {
    return this._data.dropWhile(p);
  }

  public filter(p: (a: A) => boolean) : Iterable<A> {
    return this._data.filter(p);
  }

  public filterNot(p: (a: A) => boolean) : Iterable<A> {
    return this._data.filterNot(p);
  }

  public map<B>(f : (a : A) => B) : Iterable<B> {
    return this._data.map(f);
  }

  public size() : number {
    return this._data.size();
  }

  public toArray() : A[] {
    return this.toList().toArray();
  }

  public toList() : IList<A> {
    return this._data.toList();
  }

  public toSet() : ISet<A> {
    return this._data.toSet();
  }
}
