import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/rest-graphql-example', (err) => {
  if (err) {
    console.log('[SERVER] Error starting database: ', err);
  } else {
    console.log('[SERVER] Database started successfully');
  }
});

// Fix for mongoose's mpromise warning
mongoose.Promise = global.Promise;
