import { Post } from '.prisma/client';
import fetch from 'node-fetch';
import handler from '../../../src/pages/api/posts/[postId]';
import prisma from '../../../src/prisma';
import { setup, teardown } from '../../integration-test-hooks';
import { TEST_SERVER_ADDRESS } from '../../setup';

describe('posts', () => {
  describe('DELETE', () => {
    let createdPost: Post;

    beforeAll(async () => {
      createdPost = await prisma.post.create({
        data: {
          text: 'this is going to get removed',
        },
      });

      await setup(handler, { postId: createdPost.id });
    });

    afterAll(teardown);

    it('is initialized with a post in the database', async () => {
      const posts = await prisma.post.findMany();
      expect(posts).toEqual([createdPost]);
    });

    it('removes the post from the database', async () => {
      const response = await fetch(TEST_SERVER_ADDRESS, {
        method: 'DELETE',
      });
      expect(response.status).toEqual(201);
      expect(await response.text()).toEqual('');

      const posts = await prisma.post.findMany();
      expect(posts).toEqual([]);
    });
  });
});
