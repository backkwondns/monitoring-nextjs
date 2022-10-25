import { CommonTypes } from 'types';
import { Storage } from 'libs';

export const fetchPost = async <RequestT, ResponseT>(
  path: string,
  data: RequestT,
): Promise<CommonTypes.PostResponseType<ResponseT>> => {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${Storage.getItem('accessToken')}` },
      body,
    });
    if (response.status === 404) throw new Error('Not Found');
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};

export const fetchGet = async <ResponseT>(
  path: string,
  query?: string,
): Promise<CommonTypes.GetResponseType<ResponseT>> => {
  try {
    const response = await fetch(`http://localhost:4000/api${path}?${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: { authorization: `Bearer ${Storage.getItem('accessToken')}` },
    });
    if (response.status === 404) throw new Error('Not Found!');
    if (response.status === 400) throw new Error('Error Occurred!');
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};

export const fetchPut = async <RequestT>(path: string, data: RequestT): Promise<CommonTypes.ResponseType> => {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(`http://localhost:4000/api${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Storage.getItem('accessToken')}`,
      },
      body,
    });
    if (response.status === 404) return { message: 'Not Found!', statusCode: 404 };
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error) {
    return { message: 'Error Occurred', statusCode: 400 };
  }
};
