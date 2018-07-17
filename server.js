const express = require('express')
const bodyParser = require('body-parser')
const route = require('./router/route.js')

const log4js = require('log4js')
const logger = log4js.getLogger()

logger.level = 'debug'

// const utilApi = require('./util/api')//数据处理Api
const app = express()

const host = '127.0.0.1'
const port = '8080'


//解析body中间件 —————— 传json 数据来
app.use(bodyParser.json())

//增加日志
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path} ${res.socket.remoteAddress}`)
    next()
})

/**
 * Api
 */
app.use(route)




app.listen(port, () => {
    console.log(`server is running`)
})
