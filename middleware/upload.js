
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|webp|gif/
    const isValid = allowedTypes.test(file.mimetype)
    if(isValid) {
        cb(null, true)
    }else{
        throw new Error('Only images are allowed!!!!')
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
})

module.exports = upload