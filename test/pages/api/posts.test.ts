import fetch from 'node-fetch';
import handler from '../../../src/pages/api/posts';
import prisma from '../../../src/prisma';
import { setup, teardown } from '../../integration-test-hooks';
import { TEST_SERVER_ADDRESS } from '../../setup';

describe('posts', () => {
  describe('GET', () => {
    beforeAll(async () => {
      await setup(handler);
    });

    afterAll(teardown);

    it('initializes an empty database', async () => {
      const posts = await prisma.post.findMany();
      expect(posts).toEqual([]);
    });

    it('gets an empty list of posts', async () => {
      const response = await fetch(TEST_SERVER_ADDRESS);
      const json = await response.json();
      expect(json).toEqual([]);
    });
  });

  describe('POST', () => {
    beforeAll(async () => {
      await setup(handler);
    });

    afterAll(teardown);

    it('adds a new post', async () => {
      const response = await fetch(TEST_SERVER_ADDRESS, {
        body: JSON.stringify({ text: 'this is a test' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const json = await response.json();
      expect(json).toEqual({ id: expect.anything(), text: 'this is a test' });

      const posts = await prisma.post.findMany();
      expect(posts).toEqual([json]);
    });
  });
});
