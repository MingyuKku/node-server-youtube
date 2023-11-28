const { User } = require('../model/user');

const auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies['x-auth'];
    
    // 토큰을 복호화(디코드)한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                isAuth: false,
                error: true,
            })
        }

        req.token = token;
        req.user = user;
        next();
    })

    // 유저가 있으면 인증 성공

    // 유저가 없으면 인증 실패
}

module.exports = { auth };