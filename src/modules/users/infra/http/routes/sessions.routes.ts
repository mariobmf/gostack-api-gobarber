import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsControllers = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsControllers.create,
);

export default sessionsRouter;
