import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';
import prisma from '../../../prisma';

const deletePost: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res
) => {
  const postId = req.query.postId;
  if (typeof postId !== 'string') {
    throw new Error('invalid query type');
  }
  await prisma.post.delete({ where: { id: postId } });
  res.status(201).end();
};

export default nc().delete(deletePost);
