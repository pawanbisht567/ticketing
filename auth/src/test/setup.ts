import { MongoMemoryServer } from 'mongodb-memory-server'
import { afterAll, beforeAll, beforeEach } from '@jest/globals'
import request from "supertest"
import mongoose from 'mongoose'
import { app } from '../app'


let mongo: MongoMemoryServer;
beforeAll(async() => {
    process.env.JWT_KEY = 'asdf'
    mongo = await MongoMemoryServer.create()
    const mongoURI = await mongo.getUri()
    await mongoose.connect(mongoURI)
})

beforeEach(async()=>{
    const collections = await mongoose.connection.db?.collections()
    if(collections?.length) {
            for(let collection of collections) {
            await collection.deleteMany({})
        }
    }
})

afterAll(async()=> {
    await mongo.stop();
    await mongoose.connection.close();
})

globalThis.signin = async () => {
    const email = 'test@test.com'
    const password = 'password'

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie')
    return cookie ?? [];
};