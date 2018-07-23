const nodemailer = require('nodemailer')

// 调用qq邮箱的smtp服务接口
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: '465',
    secureConnection: true,
    secure: true,
    auth : {
        user: '491896227@qq.com',//发件人又想地址
        pass: 'cjswsxypkkevbibg' //qq邮箱的授权码
    }
})

//邮件配置
let mailOptions = {
    from: 'Server <491896227@qq.com>',//发件人
    to: 'zhoujunjunlove@gmail.com',//收件人
    subject:'',
    text: '',
    html: ''
}

// 模块导出
exports.send = function (subject, content) {
    if(subject && content) {
        mailOptions.subject = subject
        mailOptions.text = content
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(`Message: ${info.messageId}`)
            console.log(`sent: ${info.response}`)
        })
    }
}