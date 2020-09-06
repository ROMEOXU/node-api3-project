const express = require('express');
//CONNECT WITH DB
const Users  = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user=>res.status(201).json(user))
  .catch(err=>res.status(500).json({error:err.message}))

});

router.post('/:id/posts', (req, res) => {
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

res.status(200).json(req.bro);//why req.bro??
    
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts=>res.status(200).json(posts))
  .catch(err=>res.status(500).json({error:err.message}))

});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(bro=>{
    if(bro){
      req.bro=bro;
      console.log('user info',bro);
      next();
    }else{
      res.status(400).json({message:'not valid user ID'})
    }
  })
  .catch(err=>res.status(500).json({error:err.message}))
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
