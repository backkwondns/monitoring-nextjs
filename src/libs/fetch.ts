import { Storage } from 'libs';

export type ResponseType = {
  message: string;
  statusCode: number;
};

interface PostResponseType<T> extends ResponseType {
  data?: T;
}
interface GetResponseType<T> extends ResponseType {
  data?: T;
}

export const fetchPost = async <RequestT, ResponseT>(
  path: string,
  data: RequestT,
): Promise<PostResponseType<ResponseT>> => {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${Storage.getItem('accessToken')}` },
      body,
    });
    checkStatusCode(response.status);
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};

export const fetchGet = async <ResponseT>(path: string, query?: string): Promise<GetResponseType<ResponseT>> => {
  try {
    const response = await fetch(`/api${path}?${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: { authorization: `Bearer ${Storage.getItem('accessToken')}` },
    });
    checkStatusCode(response.status);
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};

export const fetchPut = async <RequestT>(path: string, data: RequestT): Promise<ResponseType> => {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(`/api${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Storage.getItem('accessToken')}`,
      },
      body,
    });
    checkStatusCode(response.status);
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error) {
    throw new Error('Error Occurred');
  }
};

function checkStatusCode(responseStatus: number) {
  if (responseStatus === 404) throw Error('Not Found');
  if (responseStatus === 400) throw Error('Error Occurred');
}
