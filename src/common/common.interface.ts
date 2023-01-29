export interface  CommonResult<T> {
  status: number;
  message: string;
  data?: T;
}
