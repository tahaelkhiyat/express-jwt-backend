import { Router } from "express";
import { validateJoiSchema } from "../helpers/validation.helper";
import AuthService from "../services/auth.service";
import { LoginVM, RegisterVM } from "../viewModels/auth.viewmodel";

const router = Router()

router.post('/register', async (req, res) => {
    let {username, password, confirmPassword} = req.body
    let errors = await validateJoiSchema(RegisterVM, {username, password, confirmPassword})
    if(errors.length > 0) return res.status(400).json({errors}).end()
    let user = await AuthService.register(username, password)
    switch(user.id) {
        case 0:
            res.status(409).json({errors:['Username already in use']}).end()
            break;
        case -1:
            res.status(500).json({errors:['Server error, try again later']}).end()
            break;
        default:
            res.status(201).json(user).end()
    }
})

router.post('/login', async (req, res) => {
    let {username, password} = req.body
    let errors = await validateJoiSchema(LoginVM, {username, password})
    if(errors.length > 0) return res.status(400).json({errors}).end()
    let token = await AuthService.login(username, password)
    if(!token) return res.status(401).json({errors:['Username/Password incorrect']}).end()
    if(token === "500") return res.status(500).json({errors:['Server error, try again later']}).end()
    res.json({token}).end()
})


module.exports = router