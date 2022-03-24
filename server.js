//
//서버 만들기

const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);

const bodyParser = require('body-parser');

//리액트에서 사용시
app.use(express.json()); //json parsing 하기 위해 사용?
var cors = require('cors');
app.use(cors());

// dotenv
require('dotenv').config();

// login 기능
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//Mongodb
const MongoClient = require('mongodb').MongoClient;

let db;

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'todo/build')));

MongoClient.connect(process.env.DB_URL, (에러, client) => {
  //연결되면 할일
  if (에러) return console.log(에러);

  db = client.db('todo');

  http.listen(process.env.PORT, () => {
    console.log('listening on 8080');
  });
});

//GET

app.get('/list', (요청, 응답) => {
  db.collection('post')
    .find()
    .toArray(function (err, result) {
      console.log('리스트찾기완료');
      응답.json(result);
    });
});
// 검색기능
app.get('/search', (요청, 응답) => {
  console.log(요청.query.value); //{ value: '오늘은' }
  db.collection('post')
    .find({ title: 요청.query.value })
    .toArray((err, result) => {
      console.log(result);
      응답.json(result);
    });
});

//POST

//UPDATE

app.put('/edit', function (요청, 응답) {
  db.collection('post').updateOne({ _id: parseInt(요청.body.id) }, { $set: 요청.body }, (에러, 결과) => {
    console.log(요청.body.id);
    응답.redirect('/list');
  });
});

//DELETE

app.delete('/delete', (요청, 응답) => {
  //DB에서 글 삭제해주쇼
  요청.body._id = parseInt(요청.body._id); // 요청.body = { _id: 5 }
  db.collection('post').deleteOne({ ...요청.body, 작성자: 요청.user._id }, (에러, 결과) => {
    console.log('삭제완료');
    응답.status(200).send({ message: '성공' });
  });
});

//login

// passport.authenticate() = 인증해주세요
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  (요청, 응답) => {
    응답.redirect('/');
  }
);

//회원기능
app.get('/mypage', 로그인했니, (요청, 응답) => {
  console.log(요청.user);
  응답.json(요청.user);
});

function 로그인했니(요청, 응답, next) {
  if (요청.user) {
    next();
  } else {
    응답.redirect('/login');
  }
}

//login 기능
passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pw',
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      console.log(입력한아이디, 입력한비번);
      db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
        if (에러) return done(에러);

        if (!결과) return done(null, false, { message: '존재하지않는 아이디요' });
        if (입력한비번 == 결과.pw) {
          return done(null, 결과);
        } else {
          return done(null, false, { message: '비번틀렸어요' });
        }
      });
    }
  )
);
//세션 만들기
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  //디비에서 위에있는 user.id로 유저를 찾은 뒤에 유저 정보를 괄호에 넣음
  db.collection('login').findOne({ id: 아이디 }, (에러, 결과) => {
    done(null, 결과); //결과={id:test,pw:test}
  });
});

//회원가입
app.post('/signup', (요청, 응답) => {
  console.log(요청.body);
  db.collection('login').insertOne(요청.body, (에러, 결과) => {
    if (에러) return console.log(에러);
    console.log('회원정보저장완료');
    응답.redirect('/login');
  });
});

app.post('/add', (요청, 응답) => {
  // Auto Increment(id 설정)
  if (!요청.user._id) return 응답.redirect('/login');

  db.collection('counter').findOne({ name: '게시물갯수' }, (에러, 결과) => {
    console.log(결과.totalPost);
    let 총게시물갯수 = 결과.totalPost;
    let post = { _id: 총게시물갯수 + 1, ...요청.body, 작성자: 요청.user._id };
    //insertOne({ 넣어줄 값 },()=>{})
    db.collection('post').insertOne(post, (에러, 결과) => {
      if (에러) return console.log(에러);

      //updateOne({어떤 데이터를 수정할지},{ $set: {수정 값} },()=>{})
      db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, (에러, 결과) => {
        if (에러) return console.log(에러);
        console.log(요청.body);
        응답.send('전송완료');
      });
    });
  });
});

//페이지 불러오기
app.get('*', (요청, 응답) => {
  응답.sendFile(path.join(__dirname, '/todo/build/index.html'));
});
