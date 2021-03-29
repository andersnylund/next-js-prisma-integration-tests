import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
