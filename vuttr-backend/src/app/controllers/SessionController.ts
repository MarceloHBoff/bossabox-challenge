import { Request, Response } from 'express';

import CreateSessionService from '../../services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.status(201).json({ user, token });
  }
}
