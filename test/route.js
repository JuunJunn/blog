const assert = require('assert')
const http = require('http')
const querystring = require('querystring')
const { Url } = require('url')


//设定测试数据
let postData = querystring.stringify({
    "id": 2,
    "title": "how to learn nodejs",
    "content": "balalallalalalaaallalalallalalal"
})

//请求配置
let opts = {
    hostname: 'localhost',
    port: 8080,
    path: '',
    method: 'get',
    header: {
        "Content-type": "application/json",
        'Content-Length': Buffer.byteLength(postData)
    }
}

//测试接口
describe('验证web 服务是否正常', () => {
    test('/api/blog 正常', (done) => {
        opts.path = '/api/blog'
        const req = http.request(opts, (res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
        req.end()
    })


    test('/api/blog/id=xxx', (done) => {
        opts.path = '/api/blog?id=2'
        let body = ''
        const req = http.request(opts, (res) => {
            res.on('data', (data) => {
                body += data
            })
            res.on('end', () => {
                body = JSON.parse(body)
                expect(body.code).toEqual(0)
            })
            expect(res.statusCode).toEqual(200)
            done()
        })
        req.end()
    })
    
    test('/api/blog_list', (done) => {
        opts.path = '/api/blog_list?limit=3&offset=0'

        let body = ''
        const req = http.request(opts, (res) => {
            res.on('data', (data) => {
                body += data
            })
            res.on('end', () => {
                body = JSON.parse(body)
                expect(body.code).toEqual(0)
            })
            expect(res.statusCode).toEqual(200)
            done()
        })
        req.end()
    })


    test('/api/blog_create', (done) => {
        opts.path = '/api/blog_create'
        opts.method = 'post'
        let body = ''
        const req = http.request(opts, (res) => {
            res.on('data', (data) => {
                body += data
            })
            res.on('end', () => {
                body = JSON.parse(body)
                expect(body.message).toBe('create success')
            })

            expect(res.statusCode).toEqual(200)
            done()
        })

        req.write(postData)
        req.end()
    })

    
    test('/api/blog_update', (done) => {
        console.log('')
    })
})

