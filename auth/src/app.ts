import express from 'express';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { requestIdHandler } from './middlewares/request-id';
import { NotFoundError } from './errors/not-found-error';


const app = express()

app.set('trust proxy', true) // trust first proxy
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))
app.use(requestIdHandler)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler)

export { app };
