import express from 'express';
import { currentUserRouter } from './current-user.js';
import { signoutRouter } from './signout.js';
import { signinRouter } from './signin.js';
import { signupRouter } from './signup.js';

const app = express()

app.use(express.json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000!')
})