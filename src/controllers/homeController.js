import pool from "../config/connectToDB"

class home {
    async getHomePage(req, res) {
        const [rows, fields] = await pool.execute('SELECT * FROM `users`')
        return res.render('index.ejs', { data: rows })
    }
    async getDetailPage(req, res) {
        // const [rows, fields] = await pool.execute(`SELECT * FROM users`)
        // if (req.params.userId <= rows.length) {
        //     await pool.execute(`SELECT * FROM users WHERE id = ${req.params.userId}`)
        //         .then(([rows, fields]) => {

        //             return res.render('detailUser.ejs', { data: rows })
        //         })
        // } else {
        //     res.redirect('/')
        // }
        const [rows, fields] = await pool.execute(`SELECT * FROM users WHERE id = ${req.params.id}`)
        // return res.render('detailUser.ejs', { data: rows })

        if (JSON.stringify(rows) === '[]') {
            res.redirect('/')

        }

        return res.render('detailUser.ejs', { data: rows })


    }

}
export default new home()