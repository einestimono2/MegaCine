export interface APIResponse {
  ec: number;
  msg?: string;
  data?: any;
  total?: number;
}

export interface CloudinaryResponse {
  public_id: string;
  url: string;
}

export interface ISuccessResponse {
  message?: string;
  data?: Record<string, any>;
  extra?: Record<string, any>;
}
