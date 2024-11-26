export interface IApi<T> {
  message: T;
  error: boolean;
  status: number;
  info: string;
}
