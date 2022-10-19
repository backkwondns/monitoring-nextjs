import { CommonTypes } from 'types';
import { getAccessToken } from 'libs/accesstoken';

const baseURL = 'http://localhost:3000';
export const fetchPost = async <RequestT, ResponseT>(
  path: string,
  data: RequestT,
): Promise<CommonTypes.PostResponseType<ResponseT>> => {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: getAccessToken() },
      body,
    });
    if (response.status === 404) throw new Error('Not Found');
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchGet = async <ResponseT>(
  path: string,
  query?: string,
): Promise<CommonTypes.GetResponseType<ResponseT>> => {
  try {
    const response = await fetch(`http://localhost:3000/api${path}?${query}`, {
      method: 'GET',
      headers: { authorization: getAccessToken() },
    });
    if (response.status === 404) throw new Error('Not Found!');
    const result = await response.json();
    result.statusCode = response.status;
    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const fetchPut = async <RequestT>(path: string, data: RequestT): Promise<CommonTypes.ResponseType> => {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(`/api${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
