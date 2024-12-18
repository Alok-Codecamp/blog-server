import app from './app';
import mongoose from 'mongoose';
import { Server } from 'http';
import config from './app/config';




let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        server = app.listen(config.port, () => {
            console.log(`project blog listening on port ${config.port}`);

        })
    } catch (err) {
        throw new Error(`Server connection error`)
    }
}

main();

process.on('unhandledRejection', () => {
    console.log(`unhandledRejection is detected,🤢 server is shutting down`);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
})

process.on('uncaughtException', () => {
    console.log(`uncaughtException is detected,🤢 server is shutting down`);
    process.exit();

})