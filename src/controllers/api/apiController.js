import pool from "../../config/connectToDB"


class api {
    async getAllUsers(req, res) {
        const [rows, fields] = await pool.execute(`SELECT * FROM users`)
        console.log(rows[1].id)
        return res.status(200).json({
            rows

        })
    }
    async createUser(req, res) {
        const { firstName, lastName, email, address } = req.body
        if (!firstName || !lastName || !email || !address) {
            return res.status(200).json({
                message: 'missing required params'
            })
        }
        await pool.execute(`
        INSERT INTO users(firstName,lastName,email,address)
        VALUES(?,?,?,?)
        `, [firstName, lastName, email, address])

        return res.status(200).json({
            message: 'success'
        })

    }
    async editUser(req, res) {
        const { firstName, lastName, email, address } = req.body
        if (!firstName || !lastName || !email || !address) {
            return res.status(200).json({
                message: 'missing required params'
            })
        }
        await pool.execute(`
        UPDATE users
        SET firstName=?,lastName=?,email=?,address=?
        WHERE ID = ${req.params.id}
        `, [firstName, lastName, email, address])

        return res.status(200).json({
            message: 'success'
        })
    }
    async deleteUser(req, res) {
        await pool.execute(`DELETE FROM users WHERE id = ${req.params.id}`)
        return res.status(200).json({
            message: 'success'
        })
    }
}

export default new api()