const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

let lastPostId = 4;

const data = [
  {
    id: 1,
    title: "이서인 자기소개입니다.",
    content: "저는 이서인입니다."
  },
  {
    id: 2,
    title: "이서인의 어제 있었던 일",
    content: "아무 일도 없었다."
  },
  {
    id: 3,
    title: "이서인의 공부 망한 날",
    content: "사실은 안 망했다."
  },
  {
    id: 4,
    title: "이서인의 짝조 만난 날",
    content: "사실은 안 망했다."
  }
]

app.get('/iseo-in/introduce', function(req, res) {
  res.render('introduce.ejs', { data });
})

app.get('/iseo-in/posts', function(req, res) {
  res.render('posts.ejs', { data });
});

app.get('/iseo-in/posts/:id', function(req, res) {
  const postId = parseInt(req.params.id); // '1' -> 1
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === postId) {
      res.render('post.ejs', { post: data[i] });
    }
  }
});

app.get('/iseo-in/post-form', function(req, res) {
  res.render('post-form.ejs');
});

app.post('/iseo-in/add-post', function(req, res) {
  const title = req.body.title;
  const content = req.body.content;

  lastPostId = lastPostId + 1;

  const newPost = {
    id: lastPostId,
    title: title,
    content: content
  }

  data.push(newPost);

  console.log(data);
  
  res.redirect(`/iseo-in/posts/${newPost.id}`);
})

app.listen(4000, function() {
  console.log("Listening on 4000 port");
  console.log("Please go to localhost:4000");
})
