const express = require('express')
const route = express.Router()


const utilApi = require('./api.js')//数据处理Api

//根据id查询单个blog对象
route.get('/api/blog', async (req, res) => {
    const queryStrObj = req.query
    const id = queryStrObj.id
    if(id) {
      let result = await utilApi.findById(id)
      res.send(JSON.stringify(result))  
    }else {
        res.send("homepage")
    }
})

//查询列表
route.get('/api/blog_list', async (req, res) => {
    const queryStrObj = req.query
    const {limit, offset} = queryStrObj
    const result = await utilApi.findBloglist({limit: limit, offset: offset})
    res.send(JSON.stringify(result))
})

//创建一条blog数据
route.post('/api/blog_create', async (req, res) => {
    const {title, content} = req.body
    const result = await utilApi.createBlog({title:title, content: content})
    res.send(JSON.stringify(result))
})

//删除一条blog数据
route.post('/api/blog_delete', async (req, res) => {
    const {id} = req.body
    const result = await utilApi.deleteBlog(id)
    res.send(JSON.stringify(result))
})

//更新一条blog数据
route.post('/api/blog_update', async (req, res) => {
    const {id, title, content} = req.body
    const result = await utilApi.updateBlog({id:id, title: title, content: content})
    res.send(JSON.stringify(result))
})

module.exports = route