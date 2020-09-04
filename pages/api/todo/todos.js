const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
    const todos = await db.query(escape`SELECT * FROM todos`)
    res.status(200).json({todos})
}
