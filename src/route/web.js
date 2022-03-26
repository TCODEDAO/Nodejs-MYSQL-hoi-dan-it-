import homeRouter from './home'
import adminRouter from './admin'
import ApiRoute from './api/api'
const route = (app) => {

    // Api 
    ApiRoute(app)
    //
    app.use('/admin', adminRouter)
    app.use('/', homeRouter)

}
export default route