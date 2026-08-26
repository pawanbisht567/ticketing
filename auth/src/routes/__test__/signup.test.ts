import request from "supertest"
import { app } from '../../app'
import { it } from '@jest/globals'

it('return 201 for successful signup', async() => {
    return request(app)
    .post('/api/users/signup')
    .send({
        "email": "awa1a122@gmail.com",
        "age": 34,
        "password": "esfsewdeeeww"
    })
    .expect(201)
})