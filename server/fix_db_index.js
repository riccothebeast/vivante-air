const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Adjust path to .env if needed, assuming run from root or server dir.
// If running from project root, .env is in server/.env? No, list_dir showed .env in server/
// So if I run from project root, I need to point to server/.env or just let it fail to default.
// But `server.js` does `dotenv.config()`. `server/server.js` assumes .env is in `server` (pwd).
// I will run this script from `vivante air` root, so I should configure dotenv path.

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vivante_air';

console.log('Connecting to:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const indexes = await mongoose.connection.collection('users').indexes();
            console.log('Current indexes:', indexes);

            if (indexes.find(idx => idx.name === 'username_1')) {
                await mongoose.connection.collection('users').dropIndex('username_1');
                console.log('Successfully dropped index: username_1');
            } else {
                console.log('Index username_1 not found.');
            }

        } catch (err) {
            console.log('Error managing indexes:', err.message);
        }
        await mongoose.connection.close();
        console.log('Connection closed');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
