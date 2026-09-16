import request from "supertest"
import { app } from '../../app'
import { it, expect } from '@jest/globals'

it('fails when a email that does not exist is supplied', async() => {
    return request(app)
    .post('/api/users/signin')
    .send({
        "email": "nonexistent@gmail.com",
        "password": "password123"
    })
    .expect(400)
})

it('pass when correct credentials are supplied', async() => {
    // First, sign up a user
    await request(app)
    .post('/api/users/signup')
    .send({
        "email": "test@gmail.com",
        "age": 34,
        "password": "password123"
    })
    .expect(201)

    // Then, sign in with the same credentials
    return request(app)
    .post('/api/users/signin')
    .send({
        "email": "test@gmail.com",
        "password": "password123"
    })
    .expect(200)
})

it('fails when an incorrect password is supplied', async() => {
    await request(app)
    .post('/api/users/signup')
    .send({
        "email": "test@gmail.com",
        "password": "password123"
    })
    .expect(201)

    // Then, sign in with the same email but wrong password
    return request(app)
    .post('/api/users/signin')
    .send({
        "email": "test@gmail.com",
        "password": "password1234"
    })
    .expect(400)
})

it('sets a cookie after successful signin', async() => {
    await request(app)
    .post('/api/users/signup')
    .send({
        "email": "test@gmail.com",
        "age": 34,
        "password": "password123"
    })
    .expect(201)

    // Then, sign in with the same email but wrong password
    let signinRequest = await request(app)
    .post('/api/users/signin')
    .send({
        "email": "test@gmail.com",
        "password": "password123"
    })
    .expect(200)
    // console.log(signinRequest)
    expect(signinRequest.get('Set-Cookie')).toBeDefined()
})
