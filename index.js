// code away!

const server = require('./server.js');
require('dotenv').config();
const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`romeo is listening on ${port} `)
});

// server.use(function(req,res,next){
//     console.log('making own middleware now ');
//     next();
//   });
