import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

type Type = 'access' | 'refresh';
type UserInfoType = { userName: string; passWord: string };

export const generateToken = (type: Type, userInfo: UserInfoType): string => {
  let SECRET;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (type === 'access') SECRET = process.env.SECRET_ACCESS!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else SECRET = process.env.SECRET_REFRESH!;
  return jwt.sign({ ...userInfo }, SECRET, { expiresIn: type === 'access' ? '15m' : '1d' });
};

export const isAuth = async (req: NextApiRequest): Promise<{ userName: string; token: string }> => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error('Authentication token must be provided');
  }
  try {
    const token = authorization.split('Bearer ')[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-non-null-assertion
    const payload: any = jwt.verify(token, process.env.SECRET_ACCESS!);
    return { userName: payload.userName, token };
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};
