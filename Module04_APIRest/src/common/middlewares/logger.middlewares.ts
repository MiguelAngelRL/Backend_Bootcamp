import { RequestHandler, ErrorRequestHandler } from 'express';

export const logRequestMiddleware: RequestHandler = async (req, res, next) => {
  console.log("HTTP request received:: " + req.url);
  next();
};

export const logErrorRequestMiddleware: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  console.error("Error handling HTTP request:: " + error);
  res.sendStatus(500);
};
