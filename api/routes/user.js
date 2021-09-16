const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// ユーザーの一覧を取得
router.get('/all', userController.getAllUser)
// ユーザーを新規登録
router.post('/register', userController.userRegister)
// 登録済みユーザーのログイン
router.post('/login', userController.userLogin)
// token認証
router.get('/auth', userController.userAuth)

router.post('/newcart', userController.newCart)

router.post('/addcart', userController.addCart)

router.post('/deletecart', userController.deleteCart)

router.post('/orders', userController.getAllOrders)

router.post('/send-order', userController.sendOrder)

router.post('/cancel-order', userController.cancelOrder)

module.exports = router
