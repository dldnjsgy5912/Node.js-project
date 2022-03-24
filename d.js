const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

// react 연결
app.use(express.static(path.join(__dirname, 'carrot-clone/build')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, 'carrot-clone/build/index.html'));
});

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, 'carrot-clone/build/index.html'));
});

// mongoDB 연결
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(process.env.DB_URL, function (err, client) {
  // 연결되면 할 일
  if (err) {
    return console.log(err);
  } // MongoDB 관련된 함수들 전부 콜백함수에서 에러처리가능

  db = client.db('carrot');

  http.listen(process.env.PORT, function () {
    console.log('listening on 8080');
  });
});

let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img'); // public/img 폴더 안에 이미지가 저장됨
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + ' - ' + new Date().toISOString().replace(/:/g, '-')); // 저장한 이미지의 파일명 설정
  },
});

let upload = multer({ storage: storage }); // 이미지 업로드 시 multer를 미들웨어로 동작시키기

app.post('/image-upload', upload.single('img'), function (req, res) {
  res.redirect('/upload');
});

app.get('/img/:imageName', function (req, res) {
  res.sendFile(__dirname + '/public/img/' + req.params.imageName); // __dirname: 현재 파일경로
});

app.post('/upload', function (req, res) {
  db.collection('counter').findOne({ name: '게시물개수' }, function (err, result) {
    let 총게시물개수 = result.totalPost;
    let 저장할거 = { _id: 총게시물개수 + 1, title: req.body.title, price: req.body.price, text: req.body.text, category: req.body.category };

    db.collection('posts').insertOne(저장할거, function (err, result) {
      console.log('저장완료');
      console.log(req.body);
    });

    db.collection('counter').updateOne({ name: '게시물개수' }, { $inc: { totalPost: 1 } }, function (err, result) {
      //  { $set: { 바꿀 값 }}
      //  { $inc: { 기존 값에 더해줄 값 }}
      if (err) {
        return console.log(err);
      }
    });
    res.redirect('/products');
  });
});

app.get('/products', function (req, res) {
  db.collection('posts')
    .find()
    .toArray(function (err, result) {
      console.log(result);
      res.json({ post: result });
    });
});
