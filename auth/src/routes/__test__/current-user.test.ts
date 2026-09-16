import request from 'supertest';
import { app } from '../../app';
import { it, expect } from '@jest/globals';

it('responds with details about the current user', async () => {
    // First, sign up a user
    const signupResponse = await request(app)
        .post('/api/users/signup')
        .send({
            "email": "test@example.com",
            "password": "password"
        });
    
    // Then, get the current user
    const cookie = signupResponse.get('Set-Cookie');
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    
    expect(response.body.currentUser.email).toEqual('test@example.com');
});