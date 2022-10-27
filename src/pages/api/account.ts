import type { NextApiRequest, NextApiResponse } from 'next';
import { findOne, insertOne, updateOne } from 'db';
import bcrypt from 'bcrypt';
import { Token } from 'libs';
import cookie from 'cookie';
import { ApiTypes } from 'types';

interface UpdateFilterType {
  userName: string;
}

interface UpdateDataType {
  $set: {
    token: {
      refreshToken: string;
      accessToken: string;
    };
    updatedAt: Date;
  };
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === 'POST') {
    try {
      const { userName, passWord } = req.body;
      checkData(userName, passWord, method);
      const result = await findOne<ApiTypes.FindAccountType, ApiTypes.FindAccountResponseType>('account', {
        userName,
      });
      if (result) {
        const passWordEncrypted = result.passWord;
        const comparePassWord = await bcrypt.compare(passWord, passWordEncrypted);
        if (!comparePassWord) return res.status(400).json({ message: 'Wrong Credentials!' });

        const { userName } = result;
        const accessToken = Token.generateToken('access', { userName, passWord: passWordEncrypted });
        const refreshToken = Token.generateToken('refresh', { userName, passWord: passWordEncrypted });
        await updateOne<UpdateFilterType, UpdateDataType>(
          'account',
          { userName },
          { $set: { token: { refreshToken, accessToken }, updatedAt: new Date() } },
          true,
        );
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
          }),
        );
        return res.status(200).json({ message: 'OK', data: { userName, accessToken } });
      }
      return res.status(404).json({ message: 'Not Found!' });
    } catch (error) {
      return res.status(400).json({ message: 'Not Enough Field!' });
    }
  } else if (method === 'PUT') {
    try {
      const { userName, passWord, email } = req.body;
      checkData(userName, passWord, method, email);
      const checkExist = await findOne('account', { userName });
      if (checkExist) return res.status(409).json({ message: `${userName} is Already Exist!` });
      const passWordEncrypted = await bcrypt.hash(passWord, 6);
      const result = await insertOne<ApiTypes.InsertAccountType>('account', {
        userName,
        passWord: passWordEncrypted,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: 'Not Enough Field!' });
    }
  } else if (method === 'GET') {
    const { userName } = req.query;
    const result = await findOne('account', { userName });
    return res.status(200).json({ data: result });
  }
  return res.status(404).json({ message: 'Not Found' });
}

function checkData(userName: string, passWord: string, method: string, email = '') {
  if (!userName && !passWord) throw Error('Missing Data');
  if (method === 'PUT') {
    if (!email) throw Error('Missing Data');
  }
}
