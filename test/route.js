const assert = require('assert')
const http = require('http')
const url = require('url')

const request = {
    get: (url, callback) => {
        http.request(url, (res) => {
            callback(res)
        })
    }
}


describe('验证web 服务是否正常', () => {
    test('/api/blog 正常', (done) => {
        http.get('http://localhost:8080/api/blog', (res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
})