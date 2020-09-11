const express = require('express');
const userRouter = require('./users/userRouter');//import user router
const postRouter = require('./posts/postRouter');//import post router
const server = express();
server.use(express.json());
//need put ahead ,otherwise will not show
server.use(logger);
server.use('/api/users',userRouter);
server.use('/api/post', postRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log('logged!',req.method);
  next();
}


module.exports = server;
