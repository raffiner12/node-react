const mongoose = require('mongoose');

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

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

module.exports = {User} // 다른 파일에도 쓰기 위해 모듈을 export 해줌.