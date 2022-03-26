import multer from "multer"
import pool from "../config/connectToDB"


const upload = multer().single('profile_pic')

class admin {
    async createUser(req, res) {
        await pool.execute(`
            
            INSERT INTO users (firstName, lastName, email,address)
            VALUES(?,?,?,?)
            
        `, [req.body.firstname, req.body.lastname, req.body.email, req.body.address])
        res.redirect('/')
    }
    async deleteUser(req, res) {
        await pool.execute(`
        DELETE FROM users WHERE id =${req.params.id}
        `)
        res.redirect('/')

    }
    async getUpdateUserPage(req, res) {
        const [rows, fields] = await pool.execute(`
        SELECT * FROM users WHERE id =${req.params.id}
        `)
        res.render('editUser.ejs', { rows: rows })
    }
    async UpdateUser(req, res) {
        await pool.execute(`
        UPDATE users
        SET firstName = ?, lastName = ?,email = ?,address = ?
        WHERE id = ${req.params.id}
        
        `, [req.body.firstname, req.body.lastname, req.body.email, req.body.address])
        res.redirect('/')
    }
    async getUploadFile(req, res) {
        res.render('uploadFile.ejs')
    }


    async handleUploadFile(req, res) {

        console.log(req.file)

        upload(req, res, function (err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            console.log(req.file)
            if (req.fileValidationError) {
                return res.send(req.fileValidationError)
            }
            else if (!req.file) {
                return res.send('Please select an image to upload')
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err)
            }
            else if (err) {
                return res.send(err)
            }

            // Display uploaded image for user validation
            res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/admin/upload">Upload another image</a>`)
        })
    }
}
export default new admin()