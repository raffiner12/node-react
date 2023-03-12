const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth')
const { User } = require("./models/User");

//application/x-www-form-urlencoded <- 이렇게 된 데이터를 분석해서 가져올 수 있게 함.
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true // 몽구스 6버전 이상은 usenewparser,topology, createindex, findandmodify 삭제
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => { res.send('Hello World!~~')})

// 회원 가입을 위한 라우터
app.post('/api/users/register',(req, res) => {

    // 회원 가입할 때 필요한 정보들을 client에서 가져오면 
    // 그것들을 데이터 베이스에 넣어준다.
 
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({ // status(200): 성공했다는 뜻
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {

    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){ // 유저가 없다면 
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    })

    // 2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀 번호인지 확인

    user.comparePassword(req.body.password , (err, isMatch )=>{ // 메소드를 user 모델에서 만들면 된다.
        if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

        // 3. 비밀 번호까지 맞다면 토큰을 생성하기.
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);

            // 토큰을 저장한다. 어디에 ? 쿠키, 로컬 스토리지 등에
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 True라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role 0 -> 일반 유저, 아니면 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.listen(port, () => { console.log(`Example app listening on port ${port}!`)})