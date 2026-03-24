const todocontroller = require("../controller/to_docontroller")

const express = require('express')
var router = express.Router()

router.get("/todos",todocontroller.getall)
router.get("/todos/:id",todocontroller.getbyid)
router.post("/todos",todocontroller.create)
router.put("/todos/:id",todocontroller.update)
router.delete("/todos/:id",todocontroller.delete)

module.exports = router