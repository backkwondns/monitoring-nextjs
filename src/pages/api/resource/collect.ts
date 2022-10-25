import type { NextApiRequest, NextApiResponse } from 'next';
import { findOne, findMany, insertOne } from 'db';
import { Token } from 'libs';
import { ApiTypes } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      if (req.body.cpu && req.body.mem && req.body.createdAt && req.body.client) {
        const collectionName = `${req.socket.remoteAddress}_${req.body.client}_resource`;
        const { body } = req;
        body.createdAt = new Date(req.body.createdAt);
        const result = await insertOne<ApiTypes.DataType>(collectionName, body);
        if (result) return res.status(200).json({ message: 'Done' });
        return res.status(400).json('Error Occurred');
      }
      throw new Error('Not Enough Field!');
    } catch (error) {
      return res.status(400).json({ message: 'Not Enough Field' });
    }
  } else if (req.method === 'GET') {
    const {userName , token}= await Token.isAuth(req);
    if (userName) {
        const userFind = await findOne<{ userName: string }, ApiTypes.FindAccountResponseType>('account', { userName });
        if (userFind) {
          if (token !== userFind.token.accessToken)
            return res.status(400).json({ message: 'AccessToken is Different!' });
          try {
            const { device } = req.query;
            const result = await findMany(`${device}`, { information: { $exists: false } }, -1, 'createdAt', 25);
            return res.status(200).json({ data: result });
          } catch (error) {
            return res.status(400).json({ message: 'Error Occurred' });
          }
      }
      return res.status(400).json({ message: 'Wrong Credential' });
    }
  }
  return res.status(404).json('Not Found');
}
