const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 10자리인 salt를 만듦. salt를 이용해 비밀번호를 암호화한다.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // space 없애주는 역할.
        uniquie: 1  // 똑같은 email 쓰지 못하도록
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, // 0: 일반 유저, 1: 관리자
        default: 0
    },
    image: String,
    token: { // 토큰으로 유효성 검사
        type: String
    },
    tokentExp: { // 토큰 유효기간
        type: Number
    }
})  

userSchema.pre('save', function(next){

    var user = this;

    if(user.isModified('password')){ // 비밀번호를 바꾼다면
    // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)

            bcrypt.hash( user.password, salt, function(err,hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

module.exports = {User} // 다른 파일에도 쓰기 위해 모듈을 export 해줌.