const express = require('express');
const multer = require('multer');

const router = express.Router();

// storage 셋팅
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
});


const fileFilter = (req, file, callback) => {
    
    // 오직 mp4만!
    if (file.mimetype === 'video/mp4') {
        callback(null, true); // 파일 업로드 허용

    } else {
        callback(null, false); // 파일 업로드 거부
    }
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('file'); // single => 단일 파일 업로드



router.post('/uploadfiles', upload, (req, res) => {

    // 비디오를 서버에 저장
    // console.log('응답 req file', req.file)

    if (!req.file) { //업로드 에러시
        return res.json({ success: false, error: 'No file uploaded!' })
    }

    return res.json({
        success: true, 
        url: req.file.path,
        fileName: req.file.filename
    });
})


module.exports = router;

