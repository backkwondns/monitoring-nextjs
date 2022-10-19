export type ResponseType = {
  message: string;
  statusCode: number;
};

export interface PostResponseType<T> extends ResponseType {
  data?: T;
}
export interface GetResponseType<T> extends ResponseType {
  data?: T;
}

export type UserNameType = string;
