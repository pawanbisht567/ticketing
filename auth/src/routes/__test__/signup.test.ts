import request from "supertest"
import { app } from '../../app'
import { it, expect } from '@jest/globals'

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

it('returns 400 with an invalid email', async() => {
    return request(app)
    .post('/api/users/signup')
    .send({
        "email": "adadwe@",
        "age": 34,
        "password": "esfsewdeeeww"
    })
    .expect(400)
})

it('returns 400 with an invalid password', async() => {
    return request(app)
    .post('/api/users/signup')
    .send({
        "email": "adadwe@gmail.com",
        "age": 34,
        "password": "esfs"
    })
    .expect(400)
})

it('returns 400 with an invalid password', async() => {
    return request(app)
    .post('/api/users/signup')
    .send({
        "email": "adadwe@gmail.com",
        "age": 34,
        "password": "esfsdwaaaaaaaaaaaaaaaaaawdawdaw"
    })
    .expect(400)
})

it('returns 400 with an invalid password', async() => {
    return request(app)
    .post('/api/users/signup')
    .send({
        "email": "",
        "age": 34,
        "password": ""
    })
    .expect(400)
})

it('return 400 for duplicate email', async() => {
    await request(app)
    .post('/api/users/signup')
    .send({
        "email": "awa1a122@gmail.com",
        "age": 34,
        "password": "esfsewdeeeww"
    }).expect(201)

    return request(app)
    .post('/api/users/signup')
    .send({
        "email": "awa1a122@gmail.com",
        "age": 34,
        "password": "esfsewdeeeww"
    }).expect(400)
})

it('sets a cookie after successful signup', async() => {
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        "email": "awa1a122@gmail.com",
        "age": 34,
        "password": "esfsewdeeeww"
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})