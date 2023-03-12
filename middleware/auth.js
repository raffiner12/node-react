const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져옴.
    let token = req.cookies.x_auth;


    // 토큰을 복호화한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true }) // 유저가 없다면

        // request에 토큰과 user를 넣어줌으로 index에서 사용할 수 있다.
        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = {auth};