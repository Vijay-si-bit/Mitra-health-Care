import { RequestHandler } from "express";
import { DemoResponse } from "../../shared/api";

export const handleDemo: RequestHandler = (req, res) => {
  const method = req.method;
  const body = req.body;
  
  const response: DemoResponse = {
    message: `Hello from Express server - ${method} request`,
    ...(method === 'POST' && body && { receivedData: body }),
    timestamp: new Date().toISOString()
  };
  res.status(200).json(response);
};
