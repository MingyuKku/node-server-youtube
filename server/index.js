const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { User } = require('./model/user');
const { auth } = require('./middleware/auth');  

const app = express();

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// application/json
app.use(express.json());

app.use(cookieParser());

mongoose.connect(config.mongoURI)
.then(() => console.log(`유툽 몽고db 연결...!`))
.catch((err) => console.log('err', err))

app.get('/', (req, res) => {
    return res.send('하이하이')
});

app.post('/api/users/register', async (req, res) => {

    const user = new User(req.body);

    await user.save()
    .then(() => {
        res.status(200).json({success: true})
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
})


app.post('/api/users/login', (req, res) => {

    // 요청된 이메일이 데이터베이스에 존재하는지 체크
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }

        // 요청된 이메일이 있다면 비밀번호가 일치하는지 체크
        // comparePassword 메서드는 User스키마에서 내가 만든 메서드임
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다.'
                })
                
            } else {
                // 비밀번호가 맞다면 토큰을 생성
                // generateToken 메서드는 User스키마에서 내가 만든 메서드임
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    // 생성된 토큰을 저장(쿠키)
                    res.cookie('x-auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    })
                })
            }
        })
    })
    .catch(err => {
        return res.status(400).send(err);
    })
});



app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id // _id로 데이터베이스에서 데이터를 찾음
    }, {
        token: '' // 찾았다면 해당 데이터의 token값을 업뎃
    })
    .then((res) => {
        return res.status(200).send({
            success: true
        })
    })
    .catch((err) => {
        return res.json({
            success: false,
            error: err
        });
    })
});



// role == 0 => 일반유저
// role > 0 => 관리자
app.get('/api/users/auth', auth, (req, res) => {
    // 여기 이후 로직이 실행되었다는 것은 auth 미들웨어를 통과했다는 뜻(인증 성공)
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
   })
});


// const port = 5000;
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`서버 연결 ${port} 포트`)
});