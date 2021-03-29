import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';

const getHandler: RequestHandler<NextApiRequest, NextApiResponse> = (
  req,
  res
) => {
  return res.status(200).json({ name: 'John Doe' });
};

export default nc().get(getHandler);
