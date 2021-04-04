import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';
import prisma from '../../../prisma';
import { onError } from '../utils';

const deletePost: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res
) => {
  const postId = req.query.postId;
  if (!postId || typeof postId !== 'string') {
    throw new Error('invalid query');
  }
  await prisma.post.delete({ where: { id: postId } });
  res.status(201).end();
};

export default nc({ onError }).delete(deletePost);
