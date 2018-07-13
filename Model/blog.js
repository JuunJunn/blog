const Sequelize = require('sequelize')

const sequelize = new Sequelize('my_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000//空闲十秒自动释放
    }
})

const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true
})

module.exports = Blog




// const mysql = require('mysql')

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'my_db'
// })

// connection.connect((err) => {
//     if(err) {
//         console.log('err connection' + err.stack)
//         return
//     }
//     connection.query('SELECT * FROM blogs', (error, data, feilds) => {
//         if(error) throw error
//         console.log('The results is :', data)
//         connection.end()
//     })
// })