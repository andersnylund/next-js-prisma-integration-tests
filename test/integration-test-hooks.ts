import http from 'http';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextConnect } from 'next-connect';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import prisma from '../src/prisma';
import { cleanUp } from './db-test-setup';

let server: http.Server;

export const setup = async (
  handler: NextApiHandler | NextConnect<NextApiRequest, NextApiResponse>,
  query?: unknown
): Promise<void> => {
  server = http.createServer((req, res) =>
    apiResolver(
      req,
      res,
      query,
      handler,
      {
        previewModeEncryptionKey: '',
        previewModeId: '',
        previewModeSigningKey: '',
      },
      false
    )
  );
  server.listen(3001);
};

export const teardown = async (done: () => void): Promise<void> => {
  await cleanUp();
  await prisma.$disconnect();
  server.close(done);
};
