import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

type Type = 'access' | 'refresh';
type UserInfoType = { userName: string; passWord: string };

export const generateToken = (type: Type, userInfo: UserInfoType): string => {
  let SECRET = '';
  if (type === 'access') SECRET = process.env.SECRET_ACCESS!;
  else SECRET = process.env.SECRET_REFRESH!;
  return jwt.sign({ ...userInfo }, SECRET, { expiresIn: type === 'access' ? '15m' : '1d' });
};

export const sendRefreshToken = (res: NextApiResponse, refreshToken: string) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    }),
  );
  res.status(200).json({ message: 'Done' });
};

export const isAuth = async (req: NextApiRequest): Promise<string> => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error('Authentication token must be provided');
  }
  try {
    const payload: any = jwt.verify(authorization, process.env.SECRET_ACCESS!);
    return payload.userName;
  } catch (error: any) {
    throw new Error(error);
  }
};
