import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CreateFavoritesService from '../../services/CreateFavoritesService';
import UserTools from '../models/UserTools';

export default class FavoritesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userToolsRepository = getRepository(UserTools);

    const userTools = await userToolsRepository.find({
      where: {
        user_id: request.user.id,
      },
      relations: ['tool'],
    });

    return response.status(200).json(userTools);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const createFavorite = new CreateFavoritesService();

    const favorite = await createFavorite.execute({
      user_id: request.user.id,
      tool_id: Number(id),
    });

    return response.status(201).json(favorite);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const toolsRepository = getRepository(UserTools);

    await toolsRepository.delete(id);

    return response.status(204).send();
  }
}
