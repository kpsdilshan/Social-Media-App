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
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
  next()
})

app.post('/api/posts',(req, res, next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save()
  console.log(post)
  res.status(201).json({
    message: "post added successfully"
  })
})


app.get('/api/posts', (req, res, next)=>{
  const posts =[
    {
      id: "wa123bsdva",
      title: "First server side post",
      content: "This is my first server side post"
    },
    {
      id: "wa123bsdva",
      title: "Second server side post",
      content: "This is my first server side post"
    },
    {
      id: "ss31wffeesssf",
      title: "Third server side post",
      content: "This is my second server side post"
    }
  ];

  res.status(200).json({
    message: 'Posts fetching successfully',
    posts: posts
  })
})

app.get('/api', (req, res, next)=>{

  res.status(200).json({
    message: 'Posts fetching successfully',
  })
})

module.exports = app
