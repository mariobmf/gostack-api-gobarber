import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileController from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileController);

export default routes;
