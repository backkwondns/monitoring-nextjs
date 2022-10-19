import { NextApiRequest, NextApiResponse } from 'next';
import { Token } from 'libs';
import { findOne } from 'db';
import { ApiTypes } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userName = await Token.isAuth(req);
    if (userName) {
      if (req.headers.authorization) {
        const { authorization } = req.headers;
        const userFind = await findOne<{ userName: string }, ApiTypes.FindAccountResponseType>('account', { userName });
        if (userFind) {
          if (authorization !== userFind.token.accessToken)
            return res.status(400).json({ message: 'AccessToken is Different!' });
          return res.status(200).json({ message: 'Auth Done' });
        }
      }
    }
  } catch (error) {
    return res.status(400).json({ message: 'Token Expired' });
  }
  return res.status(404).json({ message: 'Not Found!' });
}
