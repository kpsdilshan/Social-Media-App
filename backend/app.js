const express = require('express')
const bodyParser =  require('body-parser')
const mongoose = require('mongoose')

const Post = require("./models/post")

const app =  express()

const url = 'mongodb://localhost:27017/mean-social-app-db'

mongoose.connect(url, { useNewUrlParser: true })
  .then(()=>{
    console.log('Connected to Database !!');
  })
  .catch(()=>{
    console.log('Connection failed !!');
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))


app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next()
})

app.post('/api/posts',(req, res, next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then((createdPost)=>{
    console.log(createdPost);
    res.status(201).json({
      message: "post added successfully",
      postId : createdPost._id
    })
  })

})


app.get('/api/posts', (req, res, next)=>{
  Post.find().then( documents=>{
    res.status(200).json({
      message: 'Posts fetching successfully',
      posts: documents
    })
  }).catch()


})

app.delete('/api/posts/:id', (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then((result)=>{
    console.log(result);
    res.status(200).json({ message : "Post deleted !"})
  })
})

app.get('/api', (req, res, next)=>{

  res.status(200).json({
    message: 'Posts fetching successfully',
  })
})

module.exports = app
