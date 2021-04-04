import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorHandler } from 'next-connect';

export const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err: Error,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return res.status(500).json({ message: err.message });
};
