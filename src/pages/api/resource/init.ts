import type { NextApiRequest, NextApiResponse } from 'next';
import { updateOne, createIndex, findOne } from 'db';
import { ApiTypes } from 'types';

interface UpdateFilterType {
  information: object;
}

interface UpdateDataType {
  $set: {
    information: ApiTypes.DeviceDataType;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (req.body.key && req.body.device) {
      console.log(req.headers)
      if(req.headers["x-forwarded-for"]) console.log(req.headers["x-forwarded-for"])
      const { key, client, device } = req.body;
      const address = req.socket.remoteAddress;
      if (address) {
        const collectionName = `${address}_${req.body.client}_resource`;
        const result = await updateOne<UpdateFilterType, UpdateDataType>(
          collectionName,
          { information: { $exists: true } },
          { $set: { information: { address, key, client, device } } },
          true,
        );
        await createIndex(collectionName);
        if (result) return res.status(200).json({ message: 'Init Done', address: req.socket.remoteAddress });
      }
      return res.status(500).json({ message: 'Error Occurred' });
    }
    return res.status(400).json({ message: 'Not Enough Field' });
  }
  if (req.method === 'GET') {
    const { device } = req.query;
    if (typeof device === 'string') {
      const result = await findOne(device, { information: { $exists: true } });
      return res.status(200).json({ data: result });
    }
    return res.status(400).json({ message: 'Error Occurred' });
  }
  return res.status(404).json('Not Found');
}
