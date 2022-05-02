import mongoose from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server';
import User from '../schemas/UserSchema'
import * as bcrypt from 'bcrypt'
let mongod: MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    await mongoose.connect(uri);
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.createAdmin = async () => {
	const password = await bcrypt.hash('admin', parseInt(process.env.RESTAPI_SALT_ROUNDS || "10"))
	const user = new User({
		webId: 'admin',
		password: password,
		name: 'admin',
		role: 'ADMIN'
	})

	user.save()
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}
