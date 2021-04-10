import request from 'supertest';
import { Connection, getConnection, getRepository } from 'typeorm';

import app from '../src/app';
import Tool from '../src/app/models/Tool';
import User from '../src/app/models/User';
import UserTools from '../src/app/models/UserTools';
import createConnection from '../src/database';

let connection: Connection;

interface LoginUser {
  user: User;
  token: string;
}

async function loginUser(): Promise<LoginUser> {
  const user = await request(app)
    .post('/users')
    .send({ name: 'Test', email: 'test@test.com', password: '123456' });

  const { body } = await request(app).post('/sessions').send({
    email: 'test@test.com',
    password: '123456',
  });

  return { token: body.token, user: user.body };
}

beforeAll(async () => {
  connection = await createConnection('test-connection');

  await connection.query('DROP TABLE IF EXISTS user_tools');
  await connection.query('DROP TABLE IF EXISTS tools');
  await connection.query('DROP TABLE IF EXISTS users');
  await connection.query('DROP TABLE IF EXISTS migrations');

  await connection.runMigrations();
});

beforeEach(async () => {
  await connection.query('DELETE FROM user_tools');
  await connection.query('DELETE FROM tools');
  await connection.query('DELETE FROM users');
});

afterAll(async () => {
  const mainConnection = getConnection();

  await connection.close();
  await mainConnection.close();
});

describe('Session', () => {
  it('should be able to create session', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@test.com', password: '123456' });

    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to create session with non existing user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('should not be able to create session without wrong password', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@test.com', password: '123456' });

    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123123',
    });

    expect(response.status).toBe(401);
  });
});

describe('Users', () => {
  it('should be able to create an user in database', async () => {
    const user = await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@test.com', password: '123456' });

    expect(user.body).toHaveProperty('id');
  });

  it('should not be able to create an user with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@test.com', password: '123456' });

    const response = await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@test.com', password: '123456' });

    expect(response.status).toEqual(400);
  });
});

describe('Tools', () => {
  it('should be able to create a tool in database', async () => {
    const { token } = await loginUser();

    const tool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        link: 'link',
        description: 'description',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    expect(tool.body).toHaveProperty('id');
    expect(tool.body).toHaveProperty('title');
    expect(tool.body).toHaveProperty('tags');
  });

  it('should be able to list all tools registered', async () => {
    const { token } = await loginUser();

    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title1',
        link: 'link1',
        description: 'description1',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title2',
        link: 'link2',
        description: 'description2',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('title1');
    expect(response.body[1].title).toBe('title2');
  });

  it('should be able to list tools by tag', async () => {
    const { token } = await loginUser();

    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title1',
        link: 'link1',
        description: 'description1',
        tags: ['tag1'],
      });

    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title2',
        link: 'link2',
        description: 'description2',
        tags: ['tag2', 'tag3'],
      });

    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title3',
        link: 'link3',
        description: 'description3',
        tags: ['tag1', 'tag3'],
      });

    const response = await request(app)
      .get('/tools?tag=tag1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('title1');
    expect(response.body[1].title).toBe('title3');
  });

  it('should be able to delete a tool', async () => {
    const { token } = await loginUser();

    const tool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        link: 'link',
        description: 'description',
        tags: ['tag1'],
      });

    const response = await request(app)
      .delete(`/tools/${tool.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const toolRepository = getRepository(Tool);

    expect(await toolRepository.findOne({ id: tool.body.id })).toBeUndefined();
  });
});

describe('Favorites', () => {
  it('should be able to list user favorites tools', async () => {
    const { token } = await loginUser();

    const tool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        link: 'link',
        description: 'description',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    await request(app)
      .post(`/favorites/${tool.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    const favorite = await request(app)
      .get('/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(favorite.body).toHaveLength(1);
    expect(favorite.body[0]).toHaveProperty('tool_id');
    expect(favorite.body[0].tool_id).toBe(tool.body.id);
    expect(favorite.body[0]).toHaveProperty('tool');
  });

  it('should be able to add a tool in favorites list', async () => {
    const { token } = await loginUser();

    const tool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        link: 'link',
        description: 'description',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    const favorite = await request(app)
      .post(`/favorites/${tool.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(favorite.body).toHaveProperty('tool_id');
    expect(favorite.body.tool_id).toBe(tool.body.id);
  });

  it('should not be able to add a tool twice to the favorites list', async () => {
    const { token } = await loginUser();

    const tool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        link: 'link',
        description: 'description',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    await request(app)
      .post(`/favorites/${tool.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    const favorite = await request(app)
      .post(`/favorites/${tool.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(favorite.status).toBe(400);
  });

  it('should not be able to add a tool in favorites list with tool does not exists', async () => {
    const { token } = await loginUser();

    const response = await request(app)
      .post('/favorites/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('should be able to delete a favorites tool', async () => {
    const { user, token } = await loginUser();

    const tool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        link: 'link',
        description: 'description',
        tags: ['tag1', 'tag2', 'tag3'],
      });

    const response = await request(app)
      .delete(`/favorites/${tool.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const userToolsRepository = getRepository(UserTools);

    expect(
      await userToolsRepository.findOne({
        user_id: user.id,
        tool_id: tool.body.id,
      }),
    ).toBeUndefined();
  });
});
