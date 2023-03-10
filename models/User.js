const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 10자리인 salt를 만듦. salt를 이용해 비밀번호를 암호화한다.
const jwt = require('jsonwebtoken');

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

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 1234567 암호화해서 DB에 있는 것과 같은지 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch) // 콜백(비밀번호 같다)
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token   ->   secretToken을 보면 user._id 알 수 있게.

    user.token = this.token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

module.exports = {User} // 다른 파일에도 쓰기 위해 모듈을 export 해줌.