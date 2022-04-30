import { Router } from "express";
import { validateJoiSchema } from "../helpers/validation.helper";
import UserService, { AddUserToRoleResponse } from "../services/user.service";
import { AddUserToRoleVM, GetOneUserVM } from "../viewModels/user.viewModels";

const router = Router()

router.get('', async (req, res) => res.json(await UserService.all()).end() )

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let errors = await validateJoiSchema(GetOneUserVM, {id})
    if(errors.length > 0) return res.status(400).json({errors}).end()
    let user = await UserService.findOneById(Number(id))
    res.json(user).end()
})

router.post('/removeUserFromRole', async(req, res) => {
    let { userId, roleName } = req.body
    let errors = await validateJoiSchema(AddUserToRoleVM, {userId, roleName})
    if(errors.length > 0) return res.status(400).json({errors}).end()
    let operationStatus: AddUserToRoleResponse = await UserService.removeUserFromRole(userId, roleName)
    switch(operationStatus) {
        case AddUserToRoleResponse.UserNotFound:
            res.status(400).json({errors:['User does not exist']}).end()
            break
        case AddUserToRoleResponse.RoleNotFound:
            res.status(400).json({errors:['Role does not exist']}).end()
            break
        case AddUserToRoleResponse.Error:
            res.status(500).json({errors:['Server error, try again later']}).end()
            break
        default:
            res.end()
    }
})

router.post('/addUserToRole', async (req, res) => {
    let { userId, roleName } = req.body
    let errors = await validateJoiSchema(AddUserToRoleVM, {userId, roleName})
    if(errors.length > 0) return res.status(400).json({errors}).end()
    let operationStatus: AddUserToRoleResponse = await UserService.addUserToRole(userId, roleName)
    switch(operationStatus) {
        case AddUserToRoleResponse.UserNotFound:
            res.status(400).json({errors:['User does not exist']}).end()
            break
        case AddUserToRoleResponse.RoleNotFound:
            res.status(400).json({errors:['Role does not exist']}).end()
            break
        case AddUserToRoleResponse.Error:
            res.status(500).json({errors:['Server error, try again later']}).end()
            break
        default:
            res.end()
    }
})

module.exports = router