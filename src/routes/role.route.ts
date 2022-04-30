import { Router } from "express";
import RoleService from "../services/role.service";

const router = Router()

router.get('', async (req, res) => {
    let roles = await RoleService.all()
    return res.json(roles).end()
})

router.post('', async (req, res) => {
    let { name } = req.body
    if(!name) return res.status(400).json({errors:['Role name required']}).end()
    let role = await RoleService.create(name)
    switch(role.id) {
        case 0:
            res.status(409).json({errors:[`Role ${name.toUpperCase()} already exists`]}).end()
            break
        case -1:
            res.status(500).json({errors:['Server error, try again later']}).end()
            break
        default:
            res.status(201).json(role).end()
    }
})


module.exports = router