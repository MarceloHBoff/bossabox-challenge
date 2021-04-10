import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CreateToolService from '../../services/CreateToolService';
import Tool from '../models/Tool';

export default class ToolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tag } = request.query;

    const toolsRepository = getRepository(Tool);

    let tools = [];

    if (tag) {
      tools = await toolsRepository
        .createQueryBuilder('tools')
        .where(`'${tag}' = ANY(tags)`)
        .getMany();
    } else {
      tools = await toolsRepository.find();
    }

    return response.status(200).json(tools);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;

    const createTool = new CreateToolService();

    const tool = await createTool.execute({
      title,
      link,
      description,
      tags,
    });

    return response.status(201).json(tool);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const toolsRepository = getRepository(Tool);

    await toolsRepository.delete(id);

    return response.status(204).send();
  }
}
