import { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from '../server/index';

// Create Express server instance
const server = createServer();

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Handle the request with Express server
  server(req, res);
}
