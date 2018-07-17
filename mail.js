const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'stmp.qq.com',
    port: '465',
    secureConnection: true,
    secure: true,
    auth : {
        user: 'sender@qq.com',
        pass: 'ownzfienymazbjdd' //qq邮箱的授权码
    }
})

let mailOptions = {
    from: 'Server <sender@qq.com>',
    to: '491896227@qq.com',
    subject:'',
    text: '',
    html: ''
}

exports.send = function (subject, content) {
    if(subject && content) {
        mailOptions.subject = subject
        mailOptions.text = content
        transporter.sendMail(mailOptions, (error, info) => {
            // console.log(`Message: ${info.messageId}`)
            // console.log(`sent: ${info.response}`)
            console.log('我发邮见给你了')
        })
    }
}