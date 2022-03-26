import express from "express"
const configStaticFiles = (app) => {
    app.use(express.static('./src/public'))
}
export default configStaticFiles