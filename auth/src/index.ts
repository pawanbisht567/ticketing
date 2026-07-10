import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { requestIdHandler } from './middlewares/request-id';
import { NotFoundError } from './errors/not-found-error';

const app = express()

app.use(express.json())
app.use(requestIdHandler)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server running on port 3000!')
})