import { getRepository } from 'typeorm';

import Tool from '../app/models/Tool';

interface Request {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export default class CreateToolService {
  public async execute({
    title,
    link,
    description,
    tags,
  }: Request): Promise<Tool> {
    const toolsRepository = getRepository(Tool);

    const tool = toolsRepository.create({
      title,
      link,
      description,
      tags,
    });

    await toolsRepository.save(tool);

    return tool;
  }
}
