import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { Token } from 'libs';
import { findOne, updateOne } from 'db';
import { ApiTypes } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: 'no token', data: { accessToken: '' } });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      payload = jwt.verify(refreshToken, process.env.SECRET_REFRESH!);
    } catch (error) {
      return res.status(400).json({ message: 'invalid token', data: { accessToken: '' } });
    }
    const { userName, passWord } = payload;
    const result = await findOne<ApiTypes.FindAccountType, ApiTypes.FindAccountResponseType>('account', { userName });
    if (!result) {
      return res.status(404).json({ message: 'not matched user', data: { accessToken: '' } });
    }
    const accessToken = Token.generateToken('access', { userName, passWord });
    try {
      await updateOne<{ userName: string }, { $set: { 'token.accessToken': string } }>(
        'account',
        { userName },
        { $set: { 'token.accessToken': accessToken } },
      );
      return res.status(200).json({
        message: 'Done',
        data: { userName, accessToken: Token.generateToken('access', { userName, passWord }) },
      });
    } catch (error) {
      return res.status(400).json({ message: 'Update DB Failed' });
    }
  }
  return res.status(404).json({ message: 'Not Found' });
}
