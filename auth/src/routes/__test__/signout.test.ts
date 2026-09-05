import request from "supertest"
import { app } from '../../app'
import { it, expect } from '@jest/globals'

it('clears the cookie after signing out', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            "email": "test@gmail.com",
            "age": 34,
            "password": "password123"
        })
        .expect(201)
    
        // Then, sign in with the same credentials
    const response = await request(app)
        .get('/api/users/signout')
        .send({})
        .expect(200)

    console.log(response.get('Set-Cookie')) // This will log the Set-Cookie header to the console
    let cookie = response.get('Set-Cookie')
    if(!cookie || cookie.length === 0 || !cookie[0].includes('session=;')) {
        throw new Error('No Set-Cookie header found in the response');}
     // Check that the cookie is cleared
     expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly') // Check that the cookie is cleared
    
})
