export interface IService<T, U> {
  get config(): T;
  get instance(): U;
}
