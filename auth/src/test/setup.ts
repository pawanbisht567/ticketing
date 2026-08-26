import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { afterAll, beforeAll, beforeEach } from '@jest/globals'


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