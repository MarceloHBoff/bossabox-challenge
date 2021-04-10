import { getRepository } from 'typeorm';

import Tool from '../app/models/Tool';
import UserTools from '../app/models/UserTools';
import AppError from '../errors/AppError';

interface Request {
  tool_id: number;
  user_id: number;
}

export default class CreateFavoritesService {
  public async execute({ tool_id, user_id }: Request): Promise<UserTools> {
    const userToolsRepository = getRepository(UserTools);
    const toolsRepository = getRepository(Tool);

    const tool = await toolsRepository.findOne(tool_id);

    if (!tool) throw new AppError('Tool does not exists', 401);

    const findFavorite = await userToolsRepository.findOne({
      tool_id: tool.id,
      user_id,
    });

    if (findFavorite) throw new AppError('Favorite relation already exists');

    const userTools = userToolsRepository.create({ tool_id: tool.id, user_id });

    await userToolsRepository.save(userTools);

    userTools.tool = tool;

    return userTools;
  }
}
