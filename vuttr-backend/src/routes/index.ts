import { Router } from 'express';

import FavoritesController from '../app/controllers/FavoritesController';
import SessionController from '../app/controllers/SessionController';
import ToolsController from '../app/controllers/ToolsController';
import UsersController from '../app/controllers/UsersController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';
import { SessionValidatorPost } from '../app/validators/Sessions';
import {
  ToolsValidatorGet,
  ToolsValidatorPost,
  ToolsValidatorDelete,
} from '../app/validators/Tool';
import { UsersValidatorPost } from '../app/validators/Users';

const routes = Router();

const sessionRoutes = new SessionController();
const usersRoutes = new UsersController();
const toolsRoutes = new ToolsController();
const favoritesRoutes = new FavoritesController();

/**
 * @swagger
 * /sessions:
 *    post:
 *      tags:
 *      - Session
 *      description: Create a session
 *      parameters:
 *        - name: body
 *          in: body
 *          description: Creata a session
 *          schema:
 *            type: object
 *            required:
 *            - email
 *            - password
 *            properties:
 *              email:
 *                type: string
 *                example: johndoe@email.com
 *              password:
 *                type: string
 *                example: 123456
 *      responses:
 *        "201":
 *          description: Successfully created a session
 *          schema:
 *            properties:
 *              user:
 *                $ref: "#/definitions/User"
 *              token:
 *                type: string
 *                example: saf53dg1t34h35f4hg351sdvdsvdh
 *        "400":
 *          description: Parameters validation error
 */
routes.post('/sessions', SessionValidatorPost, sessionRoutes.create);

/**
 * @swagger
 * /users:
 *    post:
 *      tags:
 *      - User
 *      description: Creata a new user
 *      parameters:
 *        - name: body
 *          in: body
 *          description: Creata a new user
 *          schema:
 *            type: object
 *            required:
 *            - name
 *            - email
 *            - password
 *            properties:
 *              name:
 *                type: string
 *                example: John Doe
 *              email:
 *                type: string
 *                example: johndoe@email.com
 *              password:
 *                type: string
 *                example: 123456
 *      responses:
 *        "201":
 *          description: Successfully created user
 *          schema:
 *            $ref: "#/definitions/User"
 *        "400":
 *          description: Parameters validation error
 */
routes.post('/users', UsersValidatorPost, usersRoutes.create);

routes.use(ensureAuthenticated);

/**
 * @swagger
 * /tools:
 *    get:
 *      tags:
 *      - Tool
 *      security:
 *        - Bearer: []
 *      description: All tools in database
 *      parameters:
 *        - name: authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *        - name: tag
 *          in: query
 *          description: Tool filterd by tag
 *          type: string
 *      responses:
 *        "201":
 *          description: Return all in database
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/Tool"
 *    post:
 *      tags:
 *      - Tool
 *      security:
 *        - Bearer: []
 *      description: Create a new tool
 *      parameters:
 *        - name: authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *        - name: body
 *          in: body
 *          description: Create a new tool
 *          schema:
 *            type: object
 *            required:
 *            - title
 *            - link
 *            - description
 *            - tags
 *            properties:
 *              title:
 *                type: string
 *                example: Tool 1
 *              link:
 *                type: string
 *                example: Link 1
 *              description:
 *                type: string
 *                example: Description 1
 *              tags:
 *                type: array
 *                items:
 *                  type: string
 *                  example: tag1, tag2
 *      responses:
 *        "201":
 *          description: Successfully created tool
 *          schema:
 *            $ref: "#/definitions/Tool"
 *        "400":
 *          description: Parameters validation error
 * /tools/{toolId}:
 *    delete:
 *      tags:
 *      - Tool
 *      security:
 *        - Bearer: []
 *      description: Delete one tool
 *      parameters:
 *        - name: authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *        - name: toolId
 *          required: true
 *          in: path
 *          description: Delete one tool
 *          type: number
 *      responses:
 *        "204":
 *          description: Successfully delete tool
 */
routes.get('/tools', ToolsValidatorGet, toolsRoutes.index);
routes.post('/tools', ToolsValidatorPost, toolsRoutes.create);
routes.delete('/tools/:id', ToolsValidatorDelete, toolsRoutes.delete);

/**
 * @swagger
 * /favorites:
 *    get:
 *      tags:
 *      - Favorite
 *      security:
 *        - Bearer: []
 *      description: All favorites relations
 *      parameters:
 *        - name: authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *      responses:
 *        "201":
 *          description: Return all favorites ralations of user
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/Favorite"
 * /favorites/{toolId}:
 *    post:
 *      tags:
 *      - Favorite
 *      security:
 *        - Bearer: []
 *      description: Add tool in favorites
 *      parameters:
 *        - name: authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *        - name: toolId
 *          required: true
 *          in: path
 *          description: Add tool in favorites
 *          type: number
 *      responses:
 *        "201":
 *          description: Successfully add tool in favorites
 *          schema:
 *            $ref: "#/definitions/Favorite"
 *        "400":
 *          description: Favorite relation already exists
 *    delete:
 *      tags:
 *      - Favorite
 *      security:
 *        - Bearer: []
 *      description: Delete one favorite
 *      parameters:
 *        - name: authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *        - name: toolId
 *          required: true
 *          in: path
 *          description: Delete one favorite
 *          type: number
 *      responses:
 *        "204":
 *          description: Successfully delete favorite
 */
routes.get('/favorites', favoritesRoutes.index);
routes.post('/favorites/:id', favoritesRoutes.create);
routes.delete('/favorites/:id', favoritesRoutes.delete);

export default routes;
