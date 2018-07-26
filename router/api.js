const Blog = require('../Model/blog.js')

/**
 * 根据id查询单个blog对象 返回Promise对象
 * @param {number} id
 * @returns {Promise} 
 */
const findById = (id) => {
    return Blog.findById(id)
            .then(result => {
                if(result) {
                    return {
                        code: 0,
                        data: {
                            id: result.id,
                            title: result.title,
                            content: result.content,
                            createAt: result.createdAt,
                            updateAt: result.updatedAt
                        }
                    }
                }else {
                    return {
                        code: -1,
                        message: "not found"
                    }
                }
            })
        
}

/**
 * 查询列表 返回Promise对象
 * @param {object} param
 * @returns {Promise}
 */
const findBloglist = (param) => {
    return  Blog.findAndCount({
        limit: parseInt(param.limit) || 10,
        offset: parseInt(param.offset) || 0
    }).then(result => {
        return {
            code: 0,
            data: {
                list: result.rows
            }
        }
    })
}

/**
 * 创建一条blog数据 
 * @param {Object} param
 * @returns {Promise} 
 */
const createBlog = (param) => {
    return Blog.create(param)
            .then(result => {
                if(result) {
                    return {
                        code: 0,
                        data: {
                            id: result.id
                        },
                        message: "create success"
                    }
                }else {
                    return {
                        code: -3,
                        message: "something wrong"
                    }
                }
            })
}

/**
 * 删除一条blog数据
 * @param {id} id
 * @return {Promise} 
 */
const deleteBlog = (id) => {
    return Blog.destroy({where: {id: id}})
            .then(result => {
                if(result) {
                    return {
                        code: 0,
                        message: 'delete success',
                        data: {
                            id: id
                        }
                    }
                }else {
                    return {
                        code: -4,
                        message:"not found"
                    }
                }
            })
}

/**
 * 更新一条blog数据
 * @param {Object} param 
 * @returns {Promise}
 */
const updateBlog = async (param) => {
    let result
    try {
        result = await Blog.update({
            title: param.title,
            content: param.content
        },{
            where: {
                id: param.id
            }
        }
    )
    } catch (error) {
        console.log(error)
    }
    if(result[0]) {
        return {
            code: 0,
            message: "update success",
            data: {
                 id: param.id
            }
        }
    }else {
         return {
            code: -5,
            message: "not found"
        }
    }
}

module.exports = {
    findById: findById,
    findBloglist:findBloglist, 
    createBlog: createBlog,
    deleteBlog: deleteBlog,
    updateBlog: updateBlog
}