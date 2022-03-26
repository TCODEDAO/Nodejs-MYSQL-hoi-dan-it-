import express from "express"

import homeController from "../controllers/homeController"

const router = express.Router()

router.get('/detail/user/:id', homeController.getDetailPage)
router.get('/', homeController.getHomePage)


export default router