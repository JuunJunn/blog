const express = require('express')
const bodyParser = require('body-parser')
const route = require('./router/route.js')
const mail = require('./mail.js')

const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'debug'


const app = express()

const host = '127.0.0.1'
const port = '3000'


//解析body中间件 —————— 传json 数据来
app.use(bodyParser.json())

//增加日志输出
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path} ${res.socket.remoteAddress}`)
    next()
})

/**
 * 路由
 * Api
 */
app.use(route)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.send('404 not found')
})


app.listen(port, () => {
    console.log(`server is running`)
})

//捕获服务异常  以邮箱方式发送异常
let prev = 0
process.on('uncaughtException', (err) => {
    console.log(err)
    let timeStamp = Date.now()
    let minute = 10 //十分钟最多只能发一次
    if(timeStamp - prev > minute * 3600 * 1000) {
        mail.send('「服务器异常」'+ err.toString(), err.stack)
        prev = timeStamp
    }
    
})


//模拟一个服务器异常
// testObject.value = 0
