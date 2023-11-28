const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minLength: 5,
    },
    lastname: {
        type: String,
        maxLength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});


// save메서드를 실행하기 전(pre)에 먼저 실행됨
userSchema.pre('save', function (next) {
    const user = this; // this는 userSchema를 가리킴

    // userSchema의 password가 변경된 경우만 실행되는 로직
    if (user.isModified('password')) {

        // genSalt => salt를 만든다
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                // hash => 해시가 적용된 유저 password
                user.password = hash;
                next(); // save메서드로 이동시킴
            })
        })
    } else {
        next();
    }
});


userSchema.methods.comparePassword = function (plainPassword, callback) {
    // plainPassword => 1234567, this.password => 암호화된 비밀번호 $2b$10l482v...
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    })
};


const tokenKey = 'secretToken';

userSchema.methods.generateToken = function (callback) {

    const user = this;
    
    // jsonwebtoken 라이브러리를 이용해 jwt토큰 생성
    const token = jwt.sign(user._id.toHexString(), tokenKey); // user._id + 'secretToken' = token
    user.token = token;

    user.save()
    .then((user) => {
        callback(null, user);
    })
    .catch((err) => {
        return callback(err);
    })
};



userSchema.statics.findByToken = function (token, callback) {
    const user = this;

    // 토큰을 decode한다
    jwt.verify(token, tokenKey, (err, decoded) => {
        // 클라이언트에서 가져온 토큰과 db에 저장된 토큰이 일치하는지 확인
        user.findOne({
            _id: decoded,
            token: token
        })
        .then(user => callback(null, user))
        .catch(err => callback(err))
    })
};


const User = mongoose.model('User', userSchema);

module.exports = {
    User
}