const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const userRouter = require('./routes/users');
const videoRouter = require('./routes/video');

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

app.use('/api/users', userRouter);
app.use('/api/video', videoRouter);


// const port = 5000;
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`서버 연결 ${port} 포트`)
});