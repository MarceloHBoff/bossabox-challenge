import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AuthConfig from '../../config/AuthConfig';
import AppError from '../../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  subject: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.secreteKey);

    const { subject } = decoded as TokenPayload;

    request.user = { id: subject };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
