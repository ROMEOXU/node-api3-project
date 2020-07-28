// code away!

const server = require('./server.js');
server.listen(4000,()=>{
    console.log('romeo is listening on 4000')
});

// server.use(function(req,res,next){
//     console.log('making own middleware now ');
//     next();
//   });
