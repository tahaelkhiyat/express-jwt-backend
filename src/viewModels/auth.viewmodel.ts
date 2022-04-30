import * as joi from 'joi'

export const RegisterVM = joi.object(
    {
        username: joi.string().required().min(5).max(12),
        password: joi.string().required().min(8).max(32),
        confirmPassword: joi.valid(joi.ref('password'))
    }
)

export const LoginVM = joi.object(
    {
        username: joi.string().required(),
        password: joi.string().required()
    }
)