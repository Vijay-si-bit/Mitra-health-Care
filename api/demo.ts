import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ 
    message: "Demo API endpoint working",
    timestamp: new Date().toISOString()
  });
}
