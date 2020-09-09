const express = require('express')

const app =  express()

app.use('/api/posts', (req, res, next)=>{
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

module.exports = app
