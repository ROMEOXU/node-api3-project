const express = require('express');
//CONNECT WITH DB
const Users  = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser,async (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json({error: err.message})
  })
  // Users.insert(req.body)
  // .then(user=>res.status(201).json(user))
  // .catch(err=>res.status(500).json({error:err.message}))

});

router.post('/:id/posts', validateUserId,(req, res) => {
  // do your magic!
  Posts.insert({...req.body,user_id:req.params.id})
  .then(post=>res.status(201).json(post))
  .catch(err=>res.status(500).json({error:err.message}))
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users=>res.status(200).json(users))
  .catch(err=>res.status(500).json({error:err.message}))
});

router.get('/:id', validateUserId,(req, res) => {
  // do your magic!
  //req.user is used in middleware validateuserid 

res.status(200).json(req.user);
    
});

router.get('/:id/posts', validateUserId,(req, res) => {
  // do your magic!
  //getUserPosts() that when passed a user's id, 
  //returns a list of all the posts for the user.
  Users.getUserPosts(req.user.id)
  .then(posts=>res.status(200).json(posts))
  .catch(err=>res.status(500).json({error:err.message}))

});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(post=>res.status(200).json(post))
  .catch(err=>res.status(500).json({err:err.message}))

});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.user.id,req.body)
  .then(count=>{
    if (count = 1){
      res.status(201).json({message:'user was successfully updated'})
    }else{res.status(500).json({error:"there is error updating"})}
  })
  .catch(err=>res.status(500).json({err:err.message}))
});

//custom middleware


function validateUserId(req, res, next) {

  Users.getById(req.params.id)
    .then(user => {
      if(user && user.id) {
        req.user = user;
        console.log(user);
        next();
      } else {
        res.status(400).json({  message: "Invalid user id." });
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
}

function validateUser(req, res, next) {
  // do your magic!
  // if(req.body) {
  //   next()
  // } else if (req.body && !req.body.name) {
  //   res.status(400).json({message: "missing required name field"})
  // } else {
  //   res.status(400).json({message: "missing user data"})
  // }
  if(!req.body || !req.body.name){
    return res.status(400).json({message:"missing user name or other"})
  }
  next()
}

function validatePost(req, res, next) {
  // do your magic!
  // if(req.body) {
  //   next()
  // } else if (req.body && !req.body.text) {
  //   res.status(400).json({message: "missing required text field"})
  // } else {
  //   res.status(400).json({message: "missing post data"})
  // }
  if (!req.body){
    return res.status(400).json({message:"missing post data"})
  }else if (!req.body.text){
    return res.status(400).json({message:"missing required text field" })
  }
  next()
}

module.exports = router;
