import * as joi from 'joi'

export const GetOneUserVM = joi.object({
    id: joi.number().required()
})

export const AddUserToRoleVM = joi.object({
    userId: joi.number().required(),
    roleName: joi.string().required()
})