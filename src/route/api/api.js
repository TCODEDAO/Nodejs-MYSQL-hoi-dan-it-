import express from 'express'
import api from '../../controllers/api/apiController'
const router = express.Router()

const ApiRoute = (app) => {
    router.get('/get-users', api.getAllUsers)
    router.post('/create-user', api.createUser)
    router.put('/edit-user/:id', api.editUser)
    router.delete('/delete-user/:id', api.deleteUser)


    return app.use('/api/v1', router)
}

export default ApiRoute