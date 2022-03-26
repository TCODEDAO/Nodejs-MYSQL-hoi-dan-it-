import express from 'express'
import methodOverride from 'method-override'
import configViewEngine from './config/viewEngine'
import configStaticFiles from './config/staticFiles'
import route from './route/web'
import dotenv from 'dotenv'
// import connection from './config/connectToDB'


dotenv.config()
const port = process.env.PORT || 3000
const app = express()

// Overide need to priotited 
app.use(methodOverride('_method'))

// Config ViewEngine(EJS)
configViewEngine(app)
//Config StaticFiles
configStaticFiles(app)

// Config to get the data send from client with method POST by moudle body-parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



//upload file(s) with multer
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

route(app)

app.listen(port, () => {
    console.log('Your Server Started At http://localhost:' + port)
})  