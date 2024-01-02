export class InFilter<T> {
  in: T[]
  constructor(values: T[]) {
    this.in = values;
  }
}