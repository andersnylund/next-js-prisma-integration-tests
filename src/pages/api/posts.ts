import { NextApiRequest, NextApiResponse } from 'next';
import nc, { RequestHandler } from 'next-connect';
import prisma from '../../prisma';

const getPost: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res
) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

const createPost: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res
) => {
  const { text } = req.body;
  const post = await prisma.post.create({ data: { text } });
  res.status(201).json(post);
};

export default nc().get(getPost).post(createPost);
