const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then(posts=>res.status(200).json(posts))
  .catch(err=>res.status(500).json(err))
});

router.get('/:id', validatePostId,(req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post=>res.status(200).json(post))
  .catch(err=>res.status(500).json(err))
});

router.delete('/:id', validatePostId,(req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(removePost=>res.status(200).json(removePost))
  .catch(err=>res.status(500).json(err))
});

router.put('/:id', validatePostId,(req, res) => {
  // do your magic!
  Posts.update(req.post.id,req.body)
  .then(count=>{
    if (count = 1){
      res.status(201).json({message:'post was successfully updated'})
    }else{res.status(500).json({error:"there is error updating"})}
  })
  .catch(err=>res.status(500).json({err:err.message}))
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if(post && post.id) {
      req.post = post;
      
      next();
    } else {
      res.status(400).json({  message: "Invalid post id." });
    }
  })
  .catch(err => {
    res.status(500).json({error: err.message})
  })
}

module.exports = router;
