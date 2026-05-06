const mongoose = require('mongoose');

// Grab from command line arguments or use a fallback
const uri = process.argv[2];

if (!uri) {
  console.log('Please provide a URI! Example: node test-mongo.js mongodb+srv://...');
  process.exit(1);
}

console.log('Attempting to connect to:', uri.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(uri)
  .then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ FAILED TO CONNECT:');
    console.error(err);
    process.exit(1);
  });
