import { RequestHandler } from "express";

export const handleTest: RequestHandler = (req, res) => {
  const { method, body, query, params } = req;
  
  const response = {
    success: true,
    method,
    timestamp: new Date().toISOString(),
    endpoint: "/api/test",
    ...(Object.keys(query).length > 0 && { query }),
    ...(method === 'POST' || method === 'PUT' || method === 'PATCH') && body && { body },
    message: `${method} request processed successfully`
  };
  
  res.status(200).json(response);
};
